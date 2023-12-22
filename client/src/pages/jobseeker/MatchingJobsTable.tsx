import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { IJobseekerProfile } from "../../types/postgres/types";
import { useQuery } from "react-query";
import { privateRequest } from "../../lib/axios";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";

interface DataType {
  id:string
  key: string;
  title: string;
  employer_name: string;
  employer_image: string;
  deadline: Date;
  job_id: string;
}

type Props = {
  profile: IJobseekerProfile | undefined;
};

const App: React.FC<Props> = ({ profile }) => {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery("matchingJobs", async () => {
    const result = await privateRequest.get("/api/v1/jobs/matching");
    return result.data;
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Job Title",
      dataIndex: "title",

      key: "title",
    },
    {
      title: "Company",
      key: "employer_name",


      render: (_, record) => (
        <div className="flex gap-2">
          <img
            src={
              record.employer_image ||
              "https://cdn-icons-png.flaticon.com/128/4300/4300059.png"
            }
            alt="img"
            className="w-8 h-8 rounded-full"
          />
          <p>{record.employer_name}</p>
        </div>
      ),
    },
    {
      title: "Deadline",
      key: "deadline",

      render: (_, record) => (
        <p>{moment(record?.deadline).format("MMM Do YY")}</p>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`/jobs/${record.title}/${record.job_id}`}
            className="text-green-dark"
          >
            View
          </Link>
        </Space>
      ),
    },
  ];

  if (!profile?.job_preference?.id)
    return (
      <div className="">
        Please update your job preference to see matching jobs!
      </div>
    );
  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center py-md">Failed to fetch!</div>;
  return (
    <div className="w-full ">
      <Table
        className="mx-auto"
        columns={columns}
        dataSource={jobs}
        key='id'
        scroll={{ x: true }}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
};

export default App;

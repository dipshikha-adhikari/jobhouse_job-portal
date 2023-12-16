import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import { IJobseekerProfile } from "../../types/postgres/types";

interface DataType {
  key: string;
  title: string;
  company: string;
  deadline: Date;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Job Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a className="text-black-default">{text}</a>,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Deadline",
    dataIndex: "deadline",
    key: "deadline",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a className="text-orange-dark">Delete</a>
      </Space>
    ),
  },
];

var momentObj = moment(new Date());
var momentString: any = momentObj.format("YYYY-MM-DD");

const data: DataType[] = [
  {
    key: "1",
    title: "John Brown",
    company: "Loginsoft",
    deadline: momentString,
  },
  {
    key: "2",
    title: "Jim Green",
    company: "Leapfrog",
    deadline: momentString,
  },
  {
    key: "3",
    title: "Joe Black",
    company: "Deerwalk",
    deadline: momentString,
  },
  {
    key: "4",
    title: "Joe Black",
    company: "Deerwalk",
    deadline: momentString,
  },
];

type Props = {
  profile: IJobseekerProfile | undefined;
};

const App: React.FC<Props> = ({ profile }) => {
  if (!profile?.job_preference)
    return (
      <div className="">
        Please update your job preference to see matching jobs!
      </div>
    );
  return (
    <Table
      className="w-full overflow-x-auto"
      columns={columns}
      dataSource={data}
      scroll={{ x: true }}
      pagination={{ pageSize: 4 }}
    />
  );
};

export default App;

import React from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import Loader from "../../components/shared/Loader";
import { Link } from "react-router-dom";
import { useAppliedJobs } from "./hooks/useAppliedJobs";

interface DataType {
id:string
job_id:string
  key: string;
  title: string;
 organization_name: string;
 image:string
  deadline: Date;
}

const App: React.FC = () => {
 const {jobs,isError,isLoading} = useAppliedJobs()

const columns: ColumnsType<DataType> = [
  {
    title: "Job Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a className="text-black-default">{text}</a>,
  },
  {
    title: "Company",
    render: (_, record) => (
      <Space size="middle">
        <img src={record.image || "https://cdn-icons-png.flaticon.com/128/4300/4300059.png"} alt="" className="w-10 h-10 rounded-full" />
       <p>{record.organization_name}</p>
      </Space>
    ),
    key: "organization_name",
  },
  {
    title: "Deadline",
    render: (_, record) => (
      <Space size="middle">
       <p>{moment(record.deadline).format('MMM Do YYYY')}</p>
      </Space>
    ),
    key: "deadline",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
       <div className="grid gap-2">
         <Link   to={`/jobs/${record.title}/${record.job_id}`} className="bg-green-dark  rounded-md text-white hover:text-white px-xs w-fit">View</Link>
        <a className="bg-orange-dark  rounded-md text-white hover:text-white px-xs w-fit" onClick={() => handleDelete(record)}>Delete</a>
          
       </div>
    ),
  },
];

const handleDelete = (record:DataType) => {

}

if(isLoading) return <Loader/>
if(isError) return <div className="text-center">Failed to fetch</div>


  return (
    <Table
      className="w-full overflow-x-auto mx-auto"
      columns={columns}
      dataSource={jobs}
      rowKey='id'
      scroll={{ x: true }}
      pagination={{ pageSize: 4 }}
    />
  );
};
export default App;

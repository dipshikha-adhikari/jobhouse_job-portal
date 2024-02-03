import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import moment from "moment";
import { privateRequest } from "../../../lib/axios";
import { useQuery } from "react-query";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 130,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    filterable: false,
  },
  {
    field: "employer_name",
    headerName: "Company",
    width: 130,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    filterable: false,
    renderCell: (params: GridCellParams) => {
      return (
        <div className="grid gap-2">
          <img
            src={
              params.row.employer_image ||
              "https://res.cloudinary.com/drionr2df/image/upload/v1703231072/nhgpyh8kjpvdfej8nr2d.png"
            }
            alt=""
            className="w-8 h-8 "
          />
          <span>{params.row.organization_name}</span>
        </div>
      );
    },
  },
  {
    field: "deadline",
    headerName: "Deadline",
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    filterable: false,
    type: "Date",
    width: 150,
    renderCell(params) {
      return <p>{moment(params.row.deadline).format("MMM Do YYYY")}</p>;
    },
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    filterable: false,
    width: 160,
    renderCell(params) {
      return (
        <div className="flex gap-xs">
          <Link
            to={`/jobs/${params.row?.title}/${params.row?.job_id}`}
            className="bg-green-light hover:text-white text-white rounded-md p-xs px-sm"
          >
            View
          </Link>
        </div>
      );
    },
  },
];

export default function AppliedJobsTable() {
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery("appliedJobs", async () => {
    const result = await privateRequest.get("/api/v1/jobs/applied");
    return result.data;
  });

  if (isLoading) return <div className="text-center">Fetching...</div>;
  if (isError) return <div className="text-center py-md">Failed to fetch!</div>;
  if (jobs.length === 0) return <div>You have not applied to any job yet!</div>;
  return (
    <div className="h-full">
      <DataGrid
        rows={jobs}
        rowHeight={80}
        autoHeight
        getRowId={(row) => row.job_id}
        columns={columns}
        hideFooterSelectedRowCount
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 4 },
          },
        }}
        pageSizeOptions={[4]}
      />
    </div>
  );
}

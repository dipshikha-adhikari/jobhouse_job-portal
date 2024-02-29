import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IJob, IJobseekerProfile } from "../../../../types/postgres/types";
import { Link } from "react-router-dom";
import moment from "moment";
import { privateRequest } from "../../../../lib/axios";
import { useQuery } from "react-query";

type Props = {
  profile: IJobseekerProfile | undefined;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    filterable: false,
    minWidth: 150,
  },
  {
    field: "employer_name",
    headerName: "Company",
    width: 130,
    sortable: false,
    hideable: false,
    disableColumnMenu: true,
    filterable: false,
    renderCell: (params) => {
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
          <span>{params.row.employer_name}</span>
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
    width: 100,
    renderCell(params) {
      return (
        <div>
          <Link to={`/jobs/${params.row?.title}-${params.row?.job_id}`}>
            view
          </Link>
        </div>
      );
    },
  },
];

type JobsProps = {
  data: IJob[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

export default function MatchingJobsTable({ profile }: Props) {
  const {
    data: jobs,
    isLoading,
    isError,
  }: JobsProps = useQuery("matchingJobs", async () => {
    const result = await privateRequest.get("/api/v1/jobseeker/jobs/matching");
    return result.data;
  });
  if (!profile?.job_preference?.id)
    return (
      <div className="">
        Please update your job preference to see matching jobs!
      </div>
    );
  if (isLoading) return <div className="text-center">Fetching...</div>;
  if (isError) return <div className="text-center py-md">Failed to fetch!</div>;
  if (jobs === undefined) return <div>No matching jobs</div>;

  return (
    <div className="h-full">
      <DataGrid
        rows={jobs}
        rowHeight={80}
        autoHeight
        hideFooterSelectedRowCount
        columns={columns}
        getRowId={(row) => row.job_id}
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

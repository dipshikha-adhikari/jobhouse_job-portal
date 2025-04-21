import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";
import { getAllCategoriesWithJobsCount } from "../api/jobs.api";

type CategoryProps = {
  setIsModalOpen?: (props: boolean) => void;
};

type CategoriesType = {
  category_name: string;
  category_id: string;
  job_count: string;
};

const Categories = ({ setIsModalOpen }: CategoryProps) => {
  const { data, isLoading, isError }: UseQueryResult<CategoriesType[]> =
    useQuery("categoriesandjjobscount", getAllCategoriesWithJobsCount);
  const handleClick = () => {
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };

  if (isLoading) return <div className="p-sm">Loading...</div>;
  if (!isLoading && isError && !data) return <div className="p-sm">Error!</div>;

  return (
    <div className="grid gap-1 md:gap-3 p-sm md:flex md:flex-wrap ">
      {data?.map((item) => {
        return (
          <Link
            to={`/jobs?category=${item.category_name}&&id=${item.category_id}`}
            onClick={handleClick}
            key={item.category_name}
            className="font-normal  flex gap-2 border-b-sm w-fit border-default text-black-light hover:text-black-dark"
          >
            {item.category_name}{" "}
            <span className="text-green-dark">({item.job_count})</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;

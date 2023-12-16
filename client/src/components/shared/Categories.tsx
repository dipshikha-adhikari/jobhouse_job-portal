import { useCategoriesAndJobsCount } from "../../hooks/useCategoriesAndJobsCount"
import { Link } from "react-router-dom";




const Categories = () => {

const{data, isLoading, isError} = useCategoriesAndJobsCount()


  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error!</div>

  return (
    <div className="grid gap-sm">
        <div className="grid gap-3 sm:flex flex-wrap  ">
              {data?.map((item) => {
                return (
                  <Link
                    to={`/jobs?category=${item.category_name}&&id=${item.category_id}`}
                    key={item.category_name}
                    className="font-normal mx-4 flex gap-2 border-b-sm w-fit border-default text-black-light hover:text-black-dark"
                  >
                    {item.category_name} <span className="text-green-dark">({item.job_count})</span>
                  </Link>
                );
              })}
            </div>
    </div>
  )
}

export default Categories
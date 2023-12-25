import { useCategoriesAndJobsCount } from "../../hooks/useCategoriesAndJobsCount"
import { Link } from "react-router-dom";


type CategoryProps = {
  setIsModalOpen?:(props:any) => void
}

const Categories = ({setIsModalOpen}:CategoryProps) => {

const{data, isLoading, isError} = useCategoriesAndJobsCount()
const handleClick = () => {
  if(setIsModalOpen){
   setIsModalOpen(false)
  }
}

  if(isLoading) return <div className="text-center">Loading...</div>
  if(isError) return <div className="text-center">Error!</div>

  return (
    <div className="grid gap-sm">
        <div className="grid gap-3 sm:flex flex-wrap  ">
              {data?.map((item) => {
                return (
                  <Link
                    to={`/jobs?category=${item.category_name}&&id=${item.category_id}` }
                    onClick={handleClick}
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
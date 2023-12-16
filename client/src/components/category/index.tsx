import { Link } from "react-router-dom"
import { jobsCategory } from "../../constants/jobsCategory"

const Category = () => {
  return (
    <div className="grid gap-xs flex-[0.3] ">
      <header className="font-semibold border-b-md border-blue-dark w-fit py-xs text-xl">Jobs By Category</header>
      <div className="grid ">
        {jobsCategory.map((cat) => {
         return <Link to='/' key={cat} className="">{cat}</Link>
        })}
      </div>
    </div>
  )
}

export default Category
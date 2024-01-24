import { MdHomeWork } from 'react-icons/md';
import { useQuery } from 'react-query';
import { publicRequest } from '../../lib/axios';
import { Link } from 'react-router-dom';

type TopComapny = {
    user_id: string;
    organization_name: string;
    image_url: string;
    industry_name: string;
    job_count: string;
  };

const TopCompanies = () => {

    const getTopCompanies = async () => {
        const result = await publicRequest.get("/api/v1/topEmployers");
        return result.data;
      };
    
      const {
        data: companies,
        isLoading: loadingComapnies,
        isError: errorComapnies,
      } = useQuery("topComapnies", getTopCompanies);

     
      
  return (
    <div className="  border-sm ">
    <header className="border-b-sm  font-bold text-green-dark xl:text-xl  p-sm  flex items-center gap-2">
      {" "}
      <MdHomeWork />
      Top Companies
    </header>

    <div className="grid gap-xs p-sm grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ">
    {loadingComapnies && <div>Loading...</div>}
      {errorComapnies && !companies && <div className="">Error</div>}
      {companies?.map((item: TopComapny) => {
        return (
          <Link
            key={item.user_id}
            to={`/employer/${item.organization_name}/${item.user_id}`}
            className="grid gap-2 shadow-sm w-full text-black-default max-w-sm hover:text-black-dark    p-sm place-content-start"
          >
            <div className="flex items-start gap-xs">
              <img
                src={item.image_url}
                alt="image"
                className="w-20 h-20"
              />
              <p className="grid gap-2">
                <span className="font-bold text-black-light">
                  {item.organization_name}{" "}
                </span>
                <span className=" font-normal">
                  {" "}
                  ({item.industry_name})
                </span>
              </p>
            </div>
            <p className="text-green-dark font-semibold">
              {" "}
              {item.job_count} jobs
            </p>
          </Link>
        );
      })}
    </div>
    <div>
      <img src="https://cdn.pixabay.com/photo/2019/01/19/19/22/recruitment-3942378_640.jpg" alt="" className="w-full  max-h-[300px] object-cover"/>
    </div>
  </div>
  )
}

export default TopCompanies
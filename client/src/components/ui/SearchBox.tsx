import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../../lib/axios";
import { debounceFn } from "../../utils/debounce";

type Suggestion = {
  title: string;
};
type Data = {
  data: Suggestion[] | undefined;
  isLoading: boolean;
};
const SearchBox = () => {
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [text, setText] = useState("");
  const optimizedFunction = debounceFn(handleChange, 500);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, isSuggestionOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if (!isSuggestionOpen) return;
    if ((e.target as Element).classList.contains("search-input")) return;
    if (ref.current) {
      if (!ref.current.contains(e.target as Element)) {
        setIsSuggestionOpen(false);
      }
    }
  };

  const { data: suggestions, isLoading }: Data = useQuery(
    ["suggestions", text],
    async () => {
      const result = await publicRequest.get(
        `/api/v1/jobs/search/suggestions?query=${text}`,
      );
      return result.data;
    },
  );

  useEffect(() => {
    if (text !== "") {
      setIsSuggestionOpen(true);
    }
  }, [suggestions]);

  function handleChange(query: string) {
    setText(query);
  }

  const handleSearchBtn = () => {
    if (text === "") return;
    navigate(`/jobs/search?q=${text}`);
  };
  return (
    <div
      className={` relative max-w-xl w-full mx-auto p-sm rounded-sm grid gap-sm place-items-center    text-white  bottom-0 ${
        location.pathname === "/" && "bg-[rgba(0,0,0,0.3)]"
      }`}
    >
      <div
        className={`${
          location.pathname !== "/" && "border-sm border-green-light"
        }  w-full   max-w-md flex search-input`}
      >
        <input
          type="text"
          className="outline-none rounded-none w-full text-black-dark border-none p-sm search-input"
          placeholder="Search by Job Title,  Skill or Organization"
          onFocus={() => setIsSuggestionOpen(true)}
          onChange={(e) => optimizedFunction(e.target.value)}
        />
        <button
          onClick={handleSearchBtn}
          className="bg-green-light  text-white px-sm "
        >
          Search
        </button>
      </div>
      <p className={`${location.pathname === "/" ? "block" : "hidden"}`}>
        Search, Apply & Get Jobs in Nepal - Free
      </p>
      {isSuggestionOpen && (
        <div
          ref={ref}
          className=" absolute grid gap-1 text-center max-w-md  bg-white w-full  py-sm top-14 border-sm  "
        >
          {isLoading && (
            <div className="text-center text-black-default ">Loading...</div>
          )}
          {suggestions?.length == 0 && (
            <div className="text-center text-black-default ">
              No results found
            </div>
          )}

          {suggestions &&
            suggestions?.map((item: Suggestion) => {
              return (
                <Link
                  key={item.title}
                  to={`/jobs/search?q=${item.title}`}
                  onClick={() => setIsSuggestionOpen(false)}
                  className="text-black-default  hover:text-green-dark "
                >
                  {item.title}
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

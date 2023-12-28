import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
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

  const { data: suggestions }: Data = useQuery(
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
  console.log(isSuggestionOpen);
  return (
    <div
      className={` relative max-w-xl w-full mx-auto p-sm rounded-sm grid gap-sm place-items-center    text-white  bottom-0 ${
        location.pathname === "/" && "bg-[rgba(0,0,0,0.3)]"
      }`}
    >
      <div className="w-full border-green-dark border-sm max-w-md flex search-input">
        <input
          type="text"
          className="outline-none  w-full text-black-dark border-none p-sm search-input"
          placeholder="Search by Job Title,  Skill or Organization"
          onFocus={() => setIsSuggestionOpen(true)}
          onChange={(e) => optimizedFunction(e.target.value)}
        />
        <button className="bg-green-light text-white px-sm">Search</button>
      </div>
      <p className={`${location.pathname === "/" ? "block" : "hidden"}`}>
        Search, Apply & Get Jobs in Nepal - Free
      </p>

      {isSuggestionOpen && (
        <div
          ref={ref}
          className=" absolute grid gap-1 text-center  bg-white w-full py-sm top-14 shadow-sm "
        >
          {/* {isLoading && <div className='text-center'> Loading... </div>} */}
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

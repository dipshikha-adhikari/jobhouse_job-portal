type Pagination = {
  limit: number;
  totalLength: number;
  offset: number;
  setOffset: (props: number) => void;
};

const Pagination = ({ limit, totalLength, offset, setOffset }: Pagination) => {
  const index = offset / limit;

  const pages = Math.ceil(totalLength / limit);
  const array = new Array(pages).fill(0).map((_, ind) => ind + "x");

  const handleNext = () => {
    if (offset < totalLength - limit) {
      setOffset(offset + limit);
    }
  };
  
  const handlePrev = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const handlePageNumber = (ind: number) => {
    setOffset(ind * limit);
  };

  return (
    <div className="flex flex-wrap justify-end gap-xs p-md">
      <button
        className="border-sm  text-green-dark cursor-pointer border-green-dark rounded-sm p-sm disabled:opacity-60 "
        disabled={offset < limit}
        onClick={handlePrev}
      >
        Prev
      </button>

      {array.map((a, ind) => {
        return (
          <span
            key={a}
            className={`${
              index === ind && "bg-green-dark text-white"
            } border-sm cursor-pointer border-gray-default rounded-sm p-sm `}
            onClick={() => handlePageNumber(ind)}
          >
            {ind + 1}
          </span>
        );
      })}
      <button
        className="border-sm text-green-dark border-green-dark rounded-sm p-sm cursor-pointer disabled:opacity-60"
        disabled={offset >= totalLength - limit}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

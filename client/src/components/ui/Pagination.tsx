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
    <div className="flex b flex-wrap justify-end items-center gap-xs pb-sm px-sm">
      <button
        className="border-sm  h-10 flex font-semibold items-center text-green-dark cursor-pointer disabled:cursor-default border-green-dark rounded-sm p-sm disabled:opacity-60 "
        disabled={offset < limit}
        onClick={handlePrev}
      >
        Prev
      </button>

      {array.map((a, ind) => {
        return (
          <button
            key={a}
            className={`${
              index === ind && "bg-green-dark text-white"
            } border-sm cursor-pointer w-10 h-10 flex items-center text-green-dark border-green-dark rounded-sm p-sm px-md `}
            onClick={() => handlePageNumber(ind)}
          >
            {ind + 1}
          </button>
        );
      })}
      <button
        className="border-sm font-semibold h-10 text-green-dark flex items-center border-green-dark rounded-sm p-sm cursor-pointer disabled:cursor-default disabled:opacity-60"
        disabled={offset >= totalLength - limit}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

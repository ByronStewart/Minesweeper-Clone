import { IconContext } from "react-icons";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface Props {
  goForward: VoidFunction;
  goBack: VoidFunction;
  page: number;
}

export const Pagination: React.FC<Props> = ({ goBack, goForward, page }) => {
  return (
    <div className="flex justify-between items-center">
      <IconContext.Provider
        value={{
          size: "2.5em",
        }}
      >
        {page > 0 ? (
          <div onClick={goBack} className="p-5">
            <GoChevronLeft color={"#000"} />
          </div>
        ) : (
          <div className="p-5">
            <GoChevronLeft color="#999" />
          </div>
        )}

        <div className="flex justify-start gap-3 items-center p-5 pl-8">
          <div
            className={`${
              page === 0
                ? "bg-blue-500 border-blue-900"
                : "bg-gray-500 border-gray-900"
            } w-5 h-5 rounded-full border `}
          ></div>
          <div
            className={`${
              page === 1
                ? "bg-blue-500 border-blue-900"
                : "bg-gray-500 border-gray-900"
            } w-5 h-5 rounded-full border `}
          ></div>
          <div
            className={`${
              page === 2
                ? "bg-blue-500 border-blue-900"
                : "bg-gray-500 border-gray-900"
            } w-5 h-5 rounded-full border `}
          ></div>
        </div>

        {page < 2 ? (
          <div onClick={goForward} className="p-5">
            <GoChevronRight />
          </div>
        ) : (
          <div className="p-5">
            <GoChevronRight color="#999" />
          </div>
        )}
      </IconContext.Provider>
    </div>
  );
};

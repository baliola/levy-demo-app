import type { Dispatch, ReactElement, SetStateAction } from "react";
import { FaChevronDown } from "react-icons/fa6";
import type {
  IAccountRoleData,
  IParamsAccountList,
} from "@/src/interfaces/account.interface";
import { IBaseRequestParams } from "@/src/interfaces/levy.interface";

export interface StatusFilter {
  id: number;
  name: string;
}

interface IFilterLevyProps {
  limitLevy: number;
  levySortIsAscending: boolean;
  levySelectedSort: string;
  levySearchQuery: string;
  accountSelectedLevyFilter: StatusFilter;
  accountLevyOptions: StatusFilter[];
  showFilterModal: boolean;
  setShowFilterModal: Dispatch<SetStateAction<boolean>>;
  setAccountSelectedLevyFilter: Dispatch<SetStateAction<StatusFilter>>;
  getLevyList: (params: IBaseRequestParams) => Promise<void>;
}

export const FilterLevy = ({
  props,
}: {
  props: IFilterLevyProps;
}): ReactElement => {
  const {
    limitLevy,
    levySortIsAscending,
    levySelectedSort,
    levySearchQuery,
    accountSelectedLevyFilter,
    accountLevyOptions,
    showFilterModal,
    setAccountSelectedLevyFilter,
    setShowFilterModal,
    getLevyList,
  } = props;

  const changeFilterHandler = (value: IAccountRoleData): void => {
    setAccountSelectedLevyFilter(value);
    getLevyList({
      page: 1,
      limit: limitLevy,
      order: levySortIsAscending ? "asc" : "desc",
      sort: levySelectedSort,
      search: levySearchQuery,
      filter: value.name.toUpperCase(),
    });
  };

  return (
    <div className="flex flex-col gap-y-2 sm:row-start-2 sm:col-span-2 xl:row-start-1 xl:col-span-1 xl:col-start-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor="filterLevyByTag"
          className="font-semibold w-fit px-4 text-ellipsis overflow-hidden line-clamp-1"
        >
          Filter by Role
        </label>
      </div>
      <div
        className="relative w-full"
        onMouseLeave={() => {
          setShowFilterModal(false);
        }}
      >
        <div
          className={`w-full flex flex-wrap items-center gap-x-4 gap-y-3 min-h-12 max-h-28 overflow-y-auto overflow-x-auto scrollable-content border px-2 py-3 rounded-xl cursor-pointer border-gray-300 ${
            showFilterModal ? "bg-slate-100" : "bg-white"
          }`}
        >
          <button
            className="flex justify-between items-center w-full px-2"
            onClick={() => {
              setShowFilterModal(true);
            }}
            type="button"
            tabIndex={0}
          >
            <span className="capitalize">
              {accountSelectedLevyFilter.name === ""
                ? "All"
                : accountSelectedLevyFilter.name}
            </span>
            <FaChevronDown
              className={`w-4 h-4 font-bold ${
                showFilterModal ? "-rotate-180" : ""
              } transition-all`}
            />
          </button>
        </div>
        <div
          className={`absolute top-full w-full left-0 overflow-y-auto py-4 z-10 ${
            showFilterModal ? "" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-3 bg-white max-h-48 scrollable-content border-gray-300 overflow-x-hidden py-4 px-4 rounded-xl border shadow-md">
            {[{ id: 0, name: "" }, ...accountLevyOptions].map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  changeFilterHandler(item);
                }}
                className="font-bold hover:text-primary px-4 capitalize bg-gradient-active-sidebar rounded-full border-[3px] w-fit"
              >
                <span className="text-sm">
                  {item.name === "" ? "All" : item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

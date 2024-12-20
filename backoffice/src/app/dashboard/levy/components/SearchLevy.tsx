import type { Dispatch } from "react";
import { type ReactElement, type SetStateAction, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc";
import type {
  IAccountRoleData,
  IParamsAccountList,
} from "@/src/interfaces/account.interface";
import type { IBaseRequestParams } from "@/src/interfaces/levy.interface";

interface ISearchLevyProps {
  limitLevy: number;
  levySortIsAscending: boolean;
  levySelectedSort: string;
  levySearchQuery: string;
  levyInputValue: string;
  loading: boolean;
  setLevyInputValue: Dispatch<SetStateAction<string>>;
  setLevySearchQuery: Dispatch<SetStateAction<string>>;
  getLevyList: (params: IBaseRequestParams) => Promise<void>;
}

export const SearchLevy = ({
  props,
}: {
  props: ISearchLevyProps;
}): ReactElement => {
  const {
    limitLevy,
    levySortIsAscending,
    levySelectedSort,
    loading,
    levyInputValue,
    levySearchQuery,
    setLevyInputValue,
    setLevySearchQuery,
    getLevyList,
  } = props;

  const changeSearchHandler = (value: string): void => {
    getLevyList({
      page: 1,
      limit: limitLevy,
      order: levySortIsAscending ? "asc" : "desc",
      sort: "",
      search: value,
      //   filter: ,
    });
  };

  useEffect(() => {
    if (levyInputValue === "" && levySearchQuery === "") return;

    const handler = setTimeout(() => {
      setLevySearchQuery(levyInputValue);
      changeSearchHandler(levyInputValue);
    }, 700);

    return (): void => {
      clearTimeout(handler);
    };
  }, [levyInputValue]);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <label htmlFor="search" className="px-4 font-bold">
        Search
      </label>
      <div className="border border-gray-300 h-12 rounded-xl flex relative overflow-hidden">
        <input
          id="search"
          type="text"
          placeholder="Account name"
          value={levyInputValue}
          onChange={(e) => {
            setLevyInputValue(e.target.value);
          }}
          className="outline-none h-full pl-4 pr-12 w-full"
        />
        <div className="h-full w-fit flex absolute right-4">
          <button
            className="my-auto"
            onClick={() => {
              if (levyInputValue !== "") setLevyInputValue("");
            }}
          >
            {levyInputValue !== levySearchQuery || loading ? (
              <VscLoading className="w-5 h-5 my-auto animate-spin" />
            ) : levyInputValue !== "" ? (
              <CgClose className="w-5 h-5 my-auto" />
            ) : (
              <AiOutlineSearch className="w-5 h-5 my-auto" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

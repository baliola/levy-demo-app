import type { Dispatch } from "react";
import {
  type ReactElement, 
  type SetStateAction, 
  useEffect, 
} from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { CgClose } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc"
import type { IParamsProjectList } from "@/src/interfaces/project.interface"

interface ISearchProjectProps {
  limitProject: number
  projectSortIsAscending: boolean
  projectSelectedSort: string
  projectSelectedTagFilter: string
  projectInputValue: string
  projectSearchQuery: string
  setProjectInputValue: Dispatch<SetStateAction<string>>
  setProjectSearchQuery: Dispatch<SetStateAction<string>>
  getProjectList: (params: IParamsProjectList) => Promise<void>
};

export const SearchProject = ({ props }: { props: ISearchProjectProps}): ReactElement => {
  const {
    limitProject,
    projectSortIsAscending,
    projectSelectedSort,
    projectSelectedTagFilter,
    projectInputValue,
    projectSearchQuery,
    setProjectInputValue,
    setProjectSearchQuery,
    getProjectList
  } = props

  const changeSearchHandler = (value: string): void => {
    getProjectList({
      page: 1,
      limit: limitProject,
      order: projectSortIsAscending ? 'asc' : 'desc',
      sort: projectSelectedSort,
      search: value,
      filter: projectSelectedTagFilter
    })
  }

  useEffect(() => {
    if (projectInputValue === '' && projectSearchQuery === '') return

    const handler = setTimeout(() => {
      setProjectSearchQuery(projectInputValue);
      changeSearchHandler(projectInputValue)
    }, 700);

    return (): void => {
      clearTimeout(handler);
    };
  }, [projectInputValue]);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <label htmlFor="search" className="px-4 font-bold">Search</label>
      <div className="border border-gray-300 h-12 rounded-xl flex relative overflow-hidden">
        <input 
          id="search"
          type="text" 
          placeholder="Project name"
          value={projectInputValue}
          onChange={(e) => { setProjectInputValue(e.target.value) }}
          className="outline-none h-full pl-4 pr-12 w-full"
        />
        <div className="h-full w-fit flex absolute right-4">
          <button 
            className="my-auto"
            onClick={() => { 
              if (projectInputValue !== '')
                setProjectInputValue('')
            }}
          >
            {
              (projectInputValue !== projectSearchQuery)
                ? <VscLoading className="w-5 h-5 my-auto animate-spin"/>
                : projectInputValue !== ''
                  ? <CgClose className="w-5 h-5 my-auto" />
                  : <AiOutlineSearch className="w-5 h-5 my-auto" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};
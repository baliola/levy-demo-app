import type { Dispatch, ReactElement, SetStateAction } from "react"
import { FaChevronDown } from "react-icons/fa6"
import type { IParamsProjectList } from "@/src/interfaces/project.interface"

interface IFilterProjectProps {
  limitProject: number
  projectSortIsAscending: boolean
  projectSelectedSort: string
  projectSearchQuery: string
  projectSelectedTagFilter: string
  projectExistingTagOptions: string[]
  showFilterTagModal: boolean
  setShowFilterTagModal: Dispatch<SetStateAction<boolean>>
  setProjectSelectedTagFilter: Dispatch<SetStateAction<string>>
  getProjectList: (params: IParamsProjectList) => Promise<void>
};

export const FilterProject = ({ props }: { props: IFilterProjectProps}): ReactElement => {
  const {
    limitProject,
    projectSortIsAscending,
    projectSelectedSort,
    projectSearchQuery,
    projectSelectedTagFilter,
    projectExistingTagOptions,
    showFilterTagModal,
    setShowFilterTagModal,
    setProjectSelectedTagFilter,
    getProjectList
  } = props

  const changeFilterHandler = (value: string): void => {
    setProjectSelectedTagFilter(value) 
    getProjectList({
      page: 1,
      limit: limitProject,
      order: projectSortIsAscending ? 'asc' : 'desc',
      sort: projectSelectedSort,
      search: projectSearchQuery,
      filter: value
    })
  }

  return (
    <div className="flex flex-col gap-y-2 sm:row-start-2 sm:col-span-2 xl:row-start-1 xl:col-span-1 xl:col-start-2">
      <div className="flex justify-between items-center">
        <label 
          htmlFor="filterProjectByTag"
          className="font-semibold w-fit px-4 text-ellipsis overflow-hidden line-clamp-1"
        >
          Filter by Tag
        </label>
      </div>
      <div 
        className="relative w-full"
        onMouseLeave={() => { setShowFilterTagModal(false) }}
      >
        <div className={`w-full flex flex-wrap items-center gap-x-4 gap-y-3 min-h-12 max-h-28 overflow-y-auto overflow-x-auto scrollable-content border px-2 py-3 rounded-xl cursor-pointer border-gray-300 ${showFilterTagModal ? 'bg-slate-100' : 'bg-white'}`}>
          <button 
            className="flex justify-between items-center w-full px-2"
            onClick={() => { setShowFilterTagModal(true) }}
            type="button"
            tabIndex={0}
          >
            <span className="capitalize">{projectSelectedTagFilter === '' ? 'All' : projectSelectedTagFilter}</span>
            <FaChevronDown className={`w-4 h-4 font-bold ${showFilterTagModal ? '-rotate-180' : ''} transition-all`} />
          </button>
        </div>
        <div className={`absolute top-full w-full left-0 overflow-y-auto py-4 z-10 ${showFilterTagModal ? '' : 'hidden'}`}>
          <div className="flex flex-col gap-3 bg-white max-h-48 scrollable-content border-gray-300 overflow-x-hidden py-4 px-4 rounded-xl border shadow-md">
            {
              ['', ...projectExistingTagOptions].map((item, index) =>
                <button
                  key={index}
                  type="button"
                  onClick={(e) => { 
                    e.stopPropagation()
                    changeFilterHandler(item)
                  }}
                  className="font-bold hover:text-primary px-4 capitalize bg-gradient-active-sidebar rounded-full border-[3px] w-fit"
                >
                  <span className="text-sm">{item === '' ? 'All' : item}</span>
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};
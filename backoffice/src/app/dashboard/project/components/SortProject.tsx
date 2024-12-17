import { 
  type Dispatch, 
  type ReactElement, 
  type SetStateAction
} from "react"
import { BiSortAZ, BiSortZA } from "react-icons/bi"
import { IoCheckmarkOutline } from "react-icons/io5"
import type { IParamsProjectList } from "@/src/interfaces/project.interface"

interface ISortProjectProps {
  pageProject: number
  limitProject: number
  projectSortIsAscending: boolean
  projectSortOptions: string[]
  projectSelectedSort: string
  projectSearchQuery: string
  projectSelectedTagFilter: string
  showSortModal: boolean
  setProjectSortIsAscending: Dispatch<SetStateAction<boolean>>
  setProjectSelectedSort: Dispatch<SetStateAction<string>>
  setShowSortModal: Dispatch<SetStateAction<boolean>>
  getProjectList: (params: IParamsProjectList) => Promise<void>
};

export const SortProject = ({ props }: { props: ISortProjectProps}): ReactElement => {
  const {
    pageProject,
    limitProject,
    projectSortIsAscending,
    projectSortOptions,
    projectSelectedSort,
    projectSearchQuery,
    projectSelectedTagFilter,
    showSortModal,
    setProjectSortIsAscending,
    setProjectSelectedSort,
    setShowSortModal,
    getProjectList,
  } = props

  const changeSortHandler = (value: string): void => {
    setProjectSelectedSort(value)
    setShowSortModal(false)
    getProjectList({
      page: pageProject,
      limit: limitProject,
      order: projectSortIsAscending ? 'asc' : 'desc',
      sort: value,
      search: projectSearchQuery,
      filter: projectSelectedTagFilter
    })
  }

  const changeOrderHandler = (value: boolean): void => {
    setProjectSortIsAscending(value) 
    getProjectList({
      page: pageProject,
      limit: limitProject,
      order: value ? 'asc' : 'desc',
      sort: projectSelectedSort,
      search: projectSearchQuery,
      filter: projectSelectedTagFilter
    })
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <label 
          htmlFor="sortProject"
          className="font-semibold w-fit px-4"
        >
          Sort by
        </label>
      </div>
      <div 
        className={`rounded-xl border min-h-12 px-2 py-3 cursor-pointer flex gap-x-4 relative border-gray-300 ${showSortModal ? 'bg-slate-200' : 'bg-white'}`}
        onMouseLeave={() => { setShowSortModal(false) }}
      >
        <button 
          className="w-full flex flex-wrap items-center gap-x-4 overflow-x-auto scrollable-content px-2"
          onClick={() => { setShowSortModal(true) }}
          type="button"
        >
          <span className="capitalize">{projectSelectedSort === '' ? 'latest' : projectSelectedSort}</span>
        </button>
        <div className={`absolute top-full w-full left-0 py-4 z-10 mb-4" ${showSortModal ? '' : 'hidden'}`}>
          <div className="flex flex-col gap-2 bg-white max-h-48 scrollable-content overflow-y-auto border-gray-300 overflow-x-hidden py-4 px-4 rounded-xl border shadow-md">
            {
              ['', ...projectSortOptions].map((option, index) =>
                <button 
                  key={index}
                  type="button"
                  onClick={() => { changeSortHandler(option) }}
                  className="flex justify-between items-center hover:font-semibold hover:bg-gradient-active-sidebar hover:text-primary py-1 px-4 rounded-lg"
                >
                  <span className="flex items-center gap-x-2 capitalize text-sm">{option === '' ? 'latest' : option}</span>
                  {projectSelectedSort === option && <IoCheckmarkOutline className="h-full aspect-square text-green-700"/>}
                </button>
              )
            }
          </div>
        </div>     
        <div className="flex">
          <button 
            type="button"
            onClick={() => { changeOrderHandler(!projectSortIsAscending) }}
            className="flex items-center my-auto"
          >
            <span className="text-sm font-semibold">{projectSortIsAscending ? <BiSortAZ className="w-6 h-6" /> : <BiSortZA className="w-6 h-6" />}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
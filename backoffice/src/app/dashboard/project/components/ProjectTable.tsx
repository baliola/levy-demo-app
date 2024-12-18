import type { ColumnDef } from "@tanstack/react-table";
import { type Dispatch, type ReactElement, type SetStateAction, useMemo } from "react";
import { ModalDelete } from "@/src/components/modal/ModalDelete";
import type { ColumnDefTypes} from "@/src/components/table/PaginationTable";
import { PaginationTable } from "@/src/components/table/PaginationTable";
import { PermissionName } from "@/src/config/data";
import type { IParamsProjectList, IProjectData } from "@/src/interfaces/project.interface";
import { useCentralStore } from "@/src/store";
import { checkUserPermission } from "@/src/utils";
import { ModalEditProject } from "./ModalEditProject";

interface IProjectTableProps {
  projects: IProjectData[] | undefined;
  totalProject: number
  pageProject: number
  limitProject: number
  projectSortIsAscending: boolean
  projectSelectedSort: string
  projectInputValue: string
  projectSearchQuery: string
  projectSelectedTagFilter: string
  projectTagOptions: string[]
  setPageProject: Dispatch<SetStateAction<number>>;
  setProjectSearchQuery: Dispatch<SetStateAction<string>>
  setProjectInputValue: Dispatch<SetStateAction<string>>
  setProjectSelectedTagFilter: Dispatch<SetStateAction<string>>
  getProjectList: (params: IParamsProjectList) => Promise<void>
  createProject: (data: FormData) => Promise<void>
  editProject: (id: string, data: FormData) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

export const ProjectTable = ({ props }: { props: IProjectTableProps }): ReactElement => {
  const {
    projects,
    totalProject,
    pageProject,
    limitProject,
    projectSortIsAscending,
    projectSelectedSort,
    projectInputValue,
    projectSearchQuery,
    projectSelectedTagFilter,
    projectTagOptions,
    setPageProject,
    setProjectSearchQuery,
    setProjectInputValue,
    setProjectSelectedTagFilter,
    getProjectList,
    createProject,
    editProject,
    deleteProject
  } = props

  const { userLoggedIn } = useCentralStore()

  const projectColumn = useMemo<ColumnDef<IProjectData>[]>(
    () => [
      {
        header: 'No',
        cell: (info): ReactElement => <p className="text-left">{(pageProject - 1) * limitProject + info.row.index + 1}</p>
      },
      {
        header: 'Name',
        cell: (info): string => info.row.original.name
      },
      {
        header: 'Description',
        cell: (info): string => info.row.original.description
      },
      {
        header: 'Year',
        cell: (info): number => info.row.original.year
      },
      // {
      //   header: 'Users',
      //   cell: (info): number => info.row.original.users
      // },
      // {
      //   header: 'TVL',
      //   cell: (info): number => info.row.original.tvl
      // },
      {
        header: 'Tags',
        cell: (info): ReactElement => <div className="flex gap-x-2">
          {
            info.row.original.tags.map((item, index) =>
              <span key={index} className="capitalize rounded-lg border-[2px] border-gray-300 bg-[#cae7ff3d] py-[3px] px-2.5 text-black shadow-sm tracking-wider text-xs">{item}</span>
            )
          }
        </div>
      },
      // {
      //   header: 'Logo',
      //   cell: (info): ReactElement => 
      //     <Image 
      //       src={info.row.original.logo ?? Images.mandalaChainLogo}
      //       alt={info.row.original.name}
      //       title={info.row.original.name}
      //       width={40}
      //       height={40}
      //     />
      // },
      {
        header: 'Action',
        cell: (info): ReactElement => <>
          {
            (checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_UPDATE_PROJECT) || checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_DELETE_PROJECT))
              ? <div className="flex lg:grid lg:grid-cols-2 lg:min-w-60 gap-x-1 border-l ml-1 drop-shadow-action-column px-3 py-2 justify-center">
                {
                  checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_UPDATE_PROJECT) && <ModalEditProject 
                    props={{
                      projectTagOptions,
                      data: info.row.original,
                      setProjectSearchQuery,
                      setProjectInputValue,
                      setProjectSelectedTagFilter,
                      createProject,
                      editProject
                    }}
                  />
                }
                {
                  checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_DELETE_PROJECT) && <ModalDelete 
                    props={{
                      id: info.row.original.id,
                      name: info.row.original.name,
                      context: 'project',
                      submit: deleteProject
                    }}
                  />
                }
              </div>
              : <div className="text-black text-center">-</div>
              
          }
        </>
      },
    ],
    [projects, userLoggedIn],
  );

  const changePageHandler = (value: number): void => {
    getProjectList({
      page: value,
      limit: limitProject,
      order: projectSortIsAscending ? 'asc' : 'desc',
      sort: projectSelectedSort,
      search: projectSearchQuery,
      filter: projectSelectedTagFilter
    })
  }
  
  return (
    <PaginationTable 
      props={{
        data: projects ?? [],
        label: 'Project',
        columns: projectColumn as ColumnDef<ColumnDefTypes>[],
        isCommon: true,
        isLoading: projects === undefined || projectInputValue !== projectSearchQuery,
        currentPage: pageProject,
        limitPage: limitProject,
        totalPage: Math.ceil(totalProject / limitProject) ,
        setCurrentPage: setPageProject,
        changePageHandler
      }}
    />
  )
}
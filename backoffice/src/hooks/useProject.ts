import type { Dispatch, SetStateAction} from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { IParamsProjectList, IProjectData } from "../interfaces/project.interface";
import { ProjectService } from "../services/project.service";

export interface IUseProject {
  projectSortIsAscending: boolean
  projectSortOptions: string[]
  projectSelectedSort: string
  projectInputValue: string
  projectSearchQuery: string
  projectSelectedTagFilter: string
  projects: IProjectData[] | undefined
  projectTagOptions: string[]
  projectExistingTagOptions: string[]
  showFilterTagModal: boolean
  showSortModal: boolean
  showModalProject: boolean
  totalProject: number
  pageProject: number
  limitProject: number
  setProjectSortIsAscending: Dispatch<SetStateAction<boolean>>
  setProjectSelectedSort: Dispatch<SetStateAction<string>>
  setProjectInputValue: Dispatch<SetStateAction<string>>
  setProjectSearchQuery: Dispatch<SetStateAction<string>>
  setProjects: Dispatch<SetStateAction<IProjectData[] | undefined>>
  setShowFilterTagModal: Dispatch<SetStateAction<boolean>>
  setShowSortModal: Dispatch<SetStateAction<boolean>>
  toggleModalProject: () => void
  setPageProject: Dispatch<SetStateAction<number>>
  setLimitProject: Dispatch<SetStateAction<number>>
  setProjectSelectedTagFilter: Dispatch<SetStateAction<string>>
  getProjectList: (params: IParamsProjectList) => Promise<void>
  getProjectTagOptions: () => Promise<void>
  getProjectExistingTagOptions: () => Promise<void>
  createProject: (data: FormData) => Promise<void>
  editProject: (id: string, data: FormData) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

const projectService = new ProjectService()

const useProject = (): IUseProject => {
  const projectSortOptions = [
    'name',
    'year',
    // 'tvl',
    // 'users'
  ]

  const [projectSortIsAscending, setProjectSortIsAscending] = useState(true)
  const [projectInputValue, setProjectInputValue] = useState('');
  const [projectSearchQuery, setProjectSearchQuery] = useState('')
  const [projectSelectedSort, setProjectSelectedSort] = useState('')
  const [projectSelectedTagFilter, setProjectSelectedTagFilter] = useState<string>('')

  const [showFilterTagModal, setShowFilterTagModal] = useState(false)
  const [showSortModal, setShowSortModal] = useState(false)
  const [showModalProject, setShowModalProject] = useState(false)

  const [pageProject, setPageProject] = useState(1)
  const [limitProject, setLimitProject] = useState(10)
  const [totalProject, setTotalProject] = useState(0)
  const [projects, setProjects] = useState<IProjectData[] | undefined>(undefined);
  const [projectTagOptions, setProjectTagOptions] = useState<string[]>([])
  const [projectExistingTagOptions, setProjectExistingTagOptions] = useState<string[]>([])

  const toggleModalProject = (): void => {
    setShowModalProject(!showModalProject)
  }

  const getProjectList = async (params: IParamsProjectList): Promise<void> => {
    setProjects(undefined)
    params.order = params.sort === '' ? 'desc' : params.order

    try {
      const data = await projectService.getProjectList(params)
      setProjects(data.data.projects)
      setTotalProject(data.data.total)
    } catch (error) {
      setProjects([])
    }
  }

  const getProjectTagOptions = async (): Promise<void> => { 
    try {
      const data = await projectService.getAllProjectTag()
      setProjectTagOptions(data.data.tags)
    } catch (error) {}
  }

  const getProjectExistingTagOptions = async (): Promise<void> => { 
    try {
      const data = await projectService.getAllProjectTag(true)
      setProjectExistingTagOptions(data.data.tags)
    } catch (error) {}
  }

  const refreshProjectList = (): void => {
    getProjectList({
      page: pageProject,
      limit: limitProject,
      order: projectSortIsAscending ? 'asc' : 'desc',
      sort: projectSelectedSort,
      search: '',
      filter: ''
    })
  }

  const createProject = async (data: FormData): Promise<void> => {
    try {
      const response = await projectService.createProject(data)
      toast.success(response.message)
      refreshProjectList()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  const editProject = async (id: string, data: FormData): Promise<void> => {
    try {
      const response = await projectService.editProject(id, data)
      toast.success(response.message)
      refreshProjectList()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  const deleteProject = async (id: string): Promise<void> => {
    try {
      const response = await projectService.deleteProject(id)
      toast.success(response.message)
      refreshProjectList()
    } catch (error) {
      const err = error as Error;
      toast.error(err.message)
    }
  }

  return {
    projectSortIsAscending,
    projectSortOptions,
    projectSelectedSort,
    projectSearchQuery,
    projectInputValue,
    projectSelectedTagFilter,
    projects,
    projectTagOptions,
    projectExistingTagOptions,
    showFilterTagModal,
    showSortModal,
    showModalProject,
    totalProject,
    pageProject,
    limitProject,
    setProjectSortIsAscending,
    setProjectSelectedSort,
    setProjectInputValue,
    setProjectSearchQuery,
    setProjectSelectedTagFilter,
    setProjects,
    setShowFilterTagModal,
    setShowSortModal,
    toggleModalProject,
    setPageProject,
    setLimitProject,
    getProjectList,
    getProjectTagOptions,
    getProjectExistingTagOptions,
    createProject,
    editProject,
    deleteProject
  }
}

export default useProject
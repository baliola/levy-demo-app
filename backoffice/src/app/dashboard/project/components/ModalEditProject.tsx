import type { Dispatch, ReactElement, SetStateAction } from "react";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import ModalDrawer from "@/src/components/modal/ModalDrawer";
import useProject from "@/src/hooks/useProject";
import type { IProjectData } from "@/src/interfaces/project.interface";
import { ProjectForm } from "./ProjectForm";

interface IModalEditProjectProps {
  projectTagOptions: string[]
  data: IProjectData
  setProjectSearchQuery: Dispatch<SetStateAction<string>>
  setProjectInputValue: Dispatch<SetStateAction<string>>
  setProjectSelectedTagFilter: Dispatch<SetStateAction<string>>
  createProject: (data: FormData) => Promise<void>
  editProject: (id: string, data: FormData) => Promise<void>
}

export const ModalEditProject = ({ props }: { props: IModalEditProjectProps }): ReactElement => {
  const {
    projectTagOptions,
    data,
    setProjectSearchQuery,
    setProjectInputValue,
    setProjectSelectedTagFilter,
    createProject,
    editProject
  } = props

  const { toggleModalProject, showModalProject } = useProject();

  return (
    <>
      <button
        type="button"
        onClick={toggleModalProject}
        className="flex text-xs text-white font-medium rounded-full h-fit py-1.5 items-center justify-center gap-1 px-3 lg:px-4 border-[3px] bg-[#F4B331]"
      >
        <CiEdit className="w-4 h-4" />
        <span className="hidden lg:block text-left">Edit</span>
      </button>
      <ModalDrawer 
        props={{
          isOpen: showModalProject,
          toggle: toggleModalProject
        }}
      >
        <div className="flex flex-col px-2 lg:px-6 h-full">
          <div className="flex w-full justify-between">
            <h2 className="font-bold">Edit Project</h2>
            <button 
              type="button"
              onClick={toggleModalProject}
            >
              <RxCross2 className="text-red-500 w-6 h-6" />
            </button>
          </div>
          <ProjectForm
            props={{
              isEdit: true,
              data, 
              id: data.id, 
              projectTagOptions,
              toggle: toggleModalProject,
              setProjectSearchQuery,
              setProjectInputValue,
              setProjectSelectedTagFilter,
              createProject,
              editProject
            }}
          />
        </div>
      </ModalDrawer>
    </>
  )
} 
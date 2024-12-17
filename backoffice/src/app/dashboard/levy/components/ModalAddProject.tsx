import type { Dispatch, ReactElement, SetStateAction } from "react";
import { CgMathPlus } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import ModalDrawer from "@/src/components/modal/ModalDrawer";
import useProject from "@/src/hooks/useProject";
import { ProjectForm } from "./ProjectForm";

interface IModalAddProjectProps {
  projectTagOptions: string[]
  setProjectSearchQuery: Dispatch<SetStateAction<string>>
  setProjectInputValue: Dispatch<SetStateAction<string>>
  setProjectSelectedTagFilter: Dispatch<SetStateAction<string>>
  createProject: (data: FormData) => Promise<void>
  editProject: (id: string, data: FormData) => Promise<void>
}

export const ModalAddProject = ({ props }: { props: IModalAddProjectProps }): ReactElement => {
  const {
    projectTagOptions,
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
        className="flex w-full items-center justify-center bg-primary text-white font-semibold h-12 gap-x-3 rounded-xl aspect-square"
        onClick={toggleModalProject}
      >
        <CgMathPlus className="w-8 h-8 lg:w-8 lg:h-8"/>
      </button>
      <ModalDrawer 
        props={{
          isOpen: showModalProject,
          toggle: toggleModalProject
        }}
      >
        <div className="flex flex-col px-2 lg:px-6 h-full sm:w-full">
          <div className="flex w-full justify-between">
            <h2 className="font-bold">Add Project</h2>
            <button 
              type="button"
              onClick={toggleModalProject}
            >
              <RxCross2 className="text-red-500 w-6 h-6" />
            </button>
          </div>
          <ProjectForm
            props={{
              isEdit: false,
              data: null,
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
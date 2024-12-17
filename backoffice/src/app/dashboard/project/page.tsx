"use client"

import Image from "next/image";
import { type ReactElement, useEffect } from "react";
import RestrictedPage from "@/src/components/RestrictedPage";
import { PermissionName } from "@/src/config/data";
import Images from "@/src/constants/images";
import useAccount from "@/src/hooks/useAccount";
import useProject from "@/src/hooks/useProject";
import { useCentralStore } from "@/src/store";
import { checkUserPermission } from "@/src/utils";
import { FilterProject } from "./components/FilterProject";
import { ModalAddProject } from "./components/ModalAddProject";
import { ProjectTable } from "./components/ProjectTable";
import { SearchProject } from "./components/SearchProject";
import { SortProject } from "./components/SortProject";

export default function Project (): ReactElement {
  const {
    pageProject,
    limitProject,
    totalProject,
    projectSortIsAscending,
    projectSelectedSort,
    projectInputValue,
    projectSearchQuery,
    projectSelectedTagFilter,
    projects,
    projectTagOptions,
    projectExistingTagOptions,
    projectSortOptions,
    showFilterTagModal,
    showSortModal,
    setPageProject,
    setProjectInputValue,
    setProjectSearchQuery,
    setProjectSelectedTagFilter,
    setProjectSortIsAscending,
    setProjectSelectedSort,
    setShowFilterTagModal,
    setShowSortModal,
    getProjectList,
    getProjectTagOptions,
    getProjectExistingTagOptions,
    createProject,
    editProject,
    deleteProject
  } = useProject()

  const { userLoggedIn } = useCentralStore()
  const { getAccountProfile } = useAccount()

  useEffect(() => {
    if (userLoggedIn) {
      if (checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_SHOW_PROJECT)) {
        getProjectTagOptions()
        getProjectExistingTagOptions()
      
        getProjectList({
          page: pageProject,
          limit: limitProject,
          sort: projectSelectedSort,
          order: projectSortIsAscending ? 'asc' : 'desc',
          search: projectSearchQuery,
          filter: projectSelectedTagFilter
        })
      }
    } else {
      getAccountProfile()
    }
  }, [userLoggedIn])

  useEffect(() => {
    if (projectSelectedTagFilter !== '' || projectSearchQuery !== '') setPageProject(1)
  }, [projectSelectedTagFilter, projectSearchQuery])

  return (
    <main className="overflow-x-hidden min-h-[calc(100vh-6rem)]">
      <div className="p-6 sm:p-8 lg:p-12 flex flex-col gap-y-6 lg:gap-y-10 h-full">
        {
          userLoggedIn !== undefined
            ? <>
              {
                checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_SHOW_PROJECT)
                  ? <>
                    <div className="flex flex-col lg:flex-row gap-3 items-end">
                      <div className="w-full">
                        <SearchProject
                          props={{
                            limitProject,
                            projectSortIsAscending,
                            projectSelectedSort,
                            projectSelectedTagFilter,
                            projectInputValue,
                            projectSearchQuery,
                            setProjectSearchQuery,
                            setProjectInputValue,
                            getProjectList
                          }}
                        />
                      </div>
                      <div className="w-full flex gap-3 items-end">
                        <div className="grow">
                          <FilterProject 
                            props={{
                              limitProject,
                              projectSortIsAscending,
                              projectSelectedSort,
                              projectSearchQuery,
                              projectSelectedTagFilter,
                              projectExistingTagOptions,
                              showFilterTagModal,
                              setProjectSelectedTagFilter,
                              setShowFilterTagModal,
                              getProjectList
                            }}
                          />
                        </div>
                        <div className="grow">
                          <SortProject 
                            props={{
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
                            }}
                          />
                        </div>
                        {
                          checkUserPermission(userLoggedIn, PermissionName.PERMISSION_BACKOFFICE_CREATE_PROJECT) && <div className="flex w-fit">
                            <ModalAddProject 
                              props={{
                                projectTagOptions,
                                setProjectSearchQuery,
                                setProjectInputValue,
                                setProjectSelectedTagFilter,
                                createProject,
                                editProject
                              }}
                            />
                          </div>
                        }
                      </div>
                    </div>
                    <ProjectTable 
                      props={{
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
                      }}
                    />
                  </>
                  : <RestrictedPage />
              }
            </>
            : <div className="flex flex-col justify-between w-full h-full">
              <Image
                src={Images.mandalaChainLoader}
                alt="Loader"
                width={100}
                height={100}
                className="m-auto"
              />
            </div>
        }
      </div>
    </main>
  );
}

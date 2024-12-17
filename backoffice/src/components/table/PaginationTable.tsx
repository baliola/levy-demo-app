import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Dispatch, ReactElement, SetStateAction} from 'react';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { IAccountData } from '@/src/interfaces/account.interface';
import type { IProjectData } from '@/src/interfaces/project.interface';
import { Skeleton } from '../skeleton/Skeleton';

export type ColumnDefTypes = 
  IProjectData |
  IAccountData

interface IPaginationTableProps {
  data: ColumnDefTypes[];
  label: string
  columns: ColumnDef<ColumnDefTypes>[];
  isCommon: boolean;
  isLoading: boolean;
  currentPage: number;
  limitPage: number;
  totalPage: number;
  searchQuery?: string;
  selectedFilter?: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  changePageHandler: (value: number) => void
};

export const PaginationTable = ({ props }: { props: IPaginationTableProps}): ReactElement => {
  const {
    data,
    label,
    columns,
    isCommon,
    isLoading,
    currentPage,
    limitPage,
    totalPage,
    searchQuery,
    selectedFilter,
    setCurrentPage,
    changePageHandler
  } = props

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const [isClient, setIsClient] = useState(false);

  const getPaginationButtons = (currentPage: number, totalPages: number): ReactElement[] => {
    const maxButtons = 10;
    let startPage, endPage;

    if (totalPages <= maxButtons) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const halfRange = Math.floor(maxButtons / 2);

      if (currentPage <= halfRange) {
        startPage = 1;
        endPage = maxButtons;
      } else if (currentPage + halfRange >= totalPages) {
        startPage = totalPages - maxButtons + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfRange;
        endPage = currentPage + halfRange;
      }
    }

    const pages = [];

    for (let index = startPage; index <= endPage; index++) {
      pages.push(
        <button
          type="button"
          key={index}
          className={`p-2 flex justify-center items-center text-primary border shadow aspect-square h-8 ${index === currentPage ? 'bg-gradient-active-sidebar' : 'bg-white'}`}
          onClick={() => {
            setCurrentPage(index);
            table.setPageIndex(index);
            changePageHandler(index)
          }}
        >
          {index}
        </button>
      );
    }
    
    return pages;
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {
        isClient && <div className="flex flex-col justify-between w-full">
          <div className="w-full overflow-x-auto">
            {
              !isLoading 
                ? data.length <= 0
                  ? searchQuery !== '' || selectedFilter !== ''
                    ? <p className="text-center text-sm font-bold tracking-wider pt-3">{label} not found, please update search or filter</p>
                    : <p className="text-center text-sm font-bold tracking-wider pt-3">No {label} has been created yet</p>
                  : <table className="whitespace-nowrap w-full">
                    <thead className="first:sticky">
                      {
                        table.getHeaderGroups().map((headerGroup, index) => (
                          <tr key={index} className="sticky">
                            {
                              headerGroup.headers.map((header, indexHeader) => {
                                return <th
                                  className={`p-5 border-b-[3px] font-bold ${indexHeader === headerGroup.headers.length - 1 ? 'sticky' : '' } bg-white`}
                                  key={indexHeader}
                                  colSpan={header.colSpan}
                                >
                                  {
                                    header.isPlaceholder 
                                      ? null 
                                      : <div className="text-left font-bold text-xs">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                      </div>
                                  }
                                </th>
                              })
                            }
                          </tr>
                        ))
                      }
                    </thead>
                    <tbody>
                      {
                        table.getRowModel().rows.map((row) => {
                          return <tr
                            className="border-y border-zinc-300 even:bg-gray-100 odd:bg-white"
                            key={row.id}
                          >
                            {
                              row.getVisibleCells().map((cell, index) => {
                                return <td
                                  className={`text-[16px] font-medium leading-normal w-fit lg:max-w-96 overflow-x-hidden text-ellipsis text-sm ${index === row.getVisibleCells().length - 1 ? 'sticky bg-inherit' : 'px-5 py-2' }`}
                                  key={index}
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                              })
                            }
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                : <table className="whitespace-nowrap w-full">
                  <thead className="first:sticky">
                    {
                      table.getHeaderGroups().map((headerGroup, index) => (
                        <tr key={index} className="sticky">
                          {
                            headerGroup.headers.map((header, indexHeader) => {
                              return <th
                                className={`p-5 border-b-[3px] font-bold ${indexHeader === headerGroup.headers.length - 1 ? 'sticky' : '' } bg-white`}
                                key={indexHeader}
                                colSpan={header.colSpan}
                              >
                                {
                                  header.isPlaceholder 
                                    ? null 
                                    : <div className="text-left font-bold text-xs">
                                      {flexRender(header.column.columnDef.header, header.getContext())}
                                    </div>
                                }
                              </th>
                            })
                          }
                        </tr>
                      ))
                    }
                  </thead>
                  <tbody>
                    {
                      Array.from({ length: limitPage }).map((_, index) => (
                        <tr
                          key={index}
                          className="border border-1 border-zinc-300 border-x-0"
                        >
                          {
                            columns.map((_, index) =>
                              <td key={index} className="px-5 py-2 text-[16px] h-12 font-medium leading-normal">
                                <Skeleton.List />
                              </td>
                            )
                          }
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
            }
          </div>
          {
            isCommon && totalPage > 0 && <div className="flex flex-row justify-end items-center gap-2 p-5">
              <div className="flex flex-row justify-center items-center gap-5 w-full">
                {/* <span className="flex items-center justify-center gap-1">
                  <div className="text-right text-neutral-400 text-[12px] font-semibold uppercase tracking-wider">
                    {`${currentPage} of ${totalPage > 0 ? totalPage : 1}`}
                  </div>
                </span> */}
                <div className="flex gap-2">
                  <button
                    className="p-2 flex justify-center items-center bg-gradient-active-sidebar text-primary border shadow aspect-square h-8 disabled:bg-gradient-active-sidebar-grayscale disabled:text-gray-500"
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      table.previousPage();
                      changePageHandler(currentPage - 1)
                    }}
                    disabled={currentPage === 1 ? true : false}
                  >
                    <FaChevronLeft className="w-full h-full" />
                  </button>
                  {getPaginationButtons(currentPage, totalPage)}
                  <button
                    className="p-2 flex justify-center items-center bg-gradient-active-sidebar text-primary border shadow aspect-square h-8 disabled:bg-gradient-active-sidebar-grayscale disabled:text-gray-500"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      table.nextPage();
                      changePageHandler(currentPage + 1)
                    }}
                    disabled={currentPage >= totalPage ? true : false}
                  >
                    <FaChevronRight className="w-full h-full m-auto" />
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </>
  );
};
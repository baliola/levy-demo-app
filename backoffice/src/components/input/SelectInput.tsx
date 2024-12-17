import type { FormikErrors } from "formik";
import { type ReactElement, useState } from "react";
import { LuListFilter } from "react-icons/lu";
import type { IAccountValues } from "@/src/app/dashboard/account/components/AccountForm";

interface ISelectInputProps {
  value: { id: number, name: string }
  options: { id: number, name: string}[]
  field: string
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => Promise<void | FormikErrors<IAccountValues>>
}

export const SelectInput = ({ props }: { props: ISelectInputProps }): ReactElement => {
  const {
    value,
    options,
    field,
    setFieldValue
  } = props

  const [isSelectFieldFocus, setIsSelectFieldFocus] = useState(false)

  return (
    <div 
      className="relative"
      onMouseLeave={() => { 
        setIsSelectFieldFocus(false) 
      }}
    >
      <div className={`border-[1px] border-primary-border min-h-12 rounded-xl overflow-hidden relative flex items-center w-full text-sm tracking-wide bg-[#F8F8F8]`}>
        <div className="h-full flex gap-2 py-3 items-center justify-start px-3 flex-wrap w-full">
          {
            value.id === 0 && value.name === '' 
              ? <span className="text-xs">Choose one</span>
              : <span className="text-xs capitalize">{value.name.toLowerCase()}</span>
          }
        </div>
        <div className="flex gap-x-3 justify-center items-center w-fit right-3 px-3">
          <button
            type="button"
            onClick={() => { 
              setIsSelectFieldFocus(!isSelectFieldFocus) 
            }}
            className=""
          >
            <LuListFilter className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className={`absolute z-20 right-0 ${isSelectFieldFocus ? '' : 'hidden'} w-full`}>
        <div className="mt-2 rounded-xl top-full max-h-40 grid gap-3 overflow-y-auto bg-white shadow-xl p-2 border">
          {
            options.map((option, index) =>
              <button
                type="button"
                key={index}
                onClick={() => {
                  setFieldValue(field, option)
                }}
                title={option.name}
                className={`capitalize rounded-xl border px-4 py-2 text-xs ${option === value ? 'bg-gray-400 text-white' : 'bg-white hover:bg-gray-200'} disabled:bg-gray-300 disabled:text-white text-ellipsis overflow-x-hidden`}
              >
                {option.name.toLowerCase()}
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
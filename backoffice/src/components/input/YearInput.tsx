import type { FormikErrors } from "formik";
import { type ReactElement, useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import type { IProjectValues } from "@/src/app/dashboard/project/components/ProjectForm";

interface IYearInputProps {
  value: number
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => Promise<void | FormikErrors<IProjectValues>>
}

export const YearInput = ({ props }: { props: IYearInputProps }): ReactElement => {
  const { value, setFieldValue } = props

  const startYear = 2009
  const currentYear: number = new Date().getFullYear();
  
  const [isYearInputFocus, setIsYearInputFocus] = useState(false)

  const getYears = (): number[] => {
    const years: number[] = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years
  }

  return (
    <div 
      className="relative"
      onMouseLeave={() => { setIsYearInputFocus(false) }}
    >
      <div className={`border-[1px] border-primary-border h-12 rounded-xl overflow-hidden relative flex items-center w-full text-sm tracking-wide bg-[#F8F8F8]`}>
        <input
          id="year"
          name="year"
          disabled
          placeholder={new Date().getFullYear().toString()}
          value={value}
          className="outline-none bg-transparent h-full w-full px-3 text-sm tracking-wide"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setIsYearInputFocus(!isYearInputFocus)}
          className="absolute right-3"
        >
          <IoMdCalendar className="w-6 h-6" />
        </button>
      </div>
      <div className={`absolute z-20 right-0 ${isYearInputFocus ? '' : 'hidden'} w-full`}>
        <div className="mt-2 rounded-lg top-full max-h-40 grid grid-cols-4 gap-3 overflow-y-auto bg-white shadow-xl p-2 border w-full">
          {
            getYears().map((year, index) =>
              <button
                type="button"
                key={index}
                onClick={() => {
                  if (value !== year) {
                    setFieldValue('year', year)
                  }
                }}
                className={`rounded-lg border py-2 text-sm ${value === year ? 'bg-gray-400 text-white' : 'bg-white hover:bg-gray-200'}`}
              >
                {year}
              </button>
            )
          }
        </div>
      </div>
    </div>
  )
}
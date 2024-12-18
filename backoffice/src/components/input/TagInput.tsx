import type { FormikErrors } from "formik";
import { type ReactElement, useState } from "react";
import { LuListFilter, LuPlus } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import type { IProjectValues } from "@/src/app/dashboard/project/components/ProjectForm";

interface ITagInputProps {
  values: string[];
  projectTagOptions: string[];
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<IProjectValues>>;
}

export const TagInput = ({
  props,
}: {
  props: ITagInputProps;
}): ReactElement => {
  const { values, projectTagOptions, setFieldValue } = props;

  const [newTagInput, setNewTagInput] = useState("");
  const [isTagSelectFieldFocus, setIsTagSelectFieldFocus] = useState(false);
  const [isTagInputFieldFocus, setIsTagInputFieldFocus] = useState(false);

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        setIsTagSelectFieldFocus(false);
        setIsTagInputFieldFocus(false);
      }}
    >
      <div
        className={`border-[1px] border-primary-border min-h-12 rounded-xl overflow-hidden relative flex items-center w-full text-sm tracking-wide bg-[#F8F8F8]`}
      >
        <div className="h-full flex gap-2 py-3 items-center justify-start px-3 flex-wrap w-full">
          {values.map((value, index) => (
            <span
              key={index}
              className="w-fit h-fit flex gap-x-2 items-center bg-gray-500 text-white rounded-full px-3 py-[2px]"
            >
              <span className="text-xs">{value}</span>
              <button
                type="button"
                className="text-sm"
                onClick={() => {
                  setFieldValue(
                    "tags",
                    values.filter((item) => item !== value)
                  );
                }}
              >
                <RxCrossCircled className="w-3 h-3" />
              </button>
            </span>
          ))}
          {values.length <= 0 && (
            <span className="tetx-gray-200 text-xs">Choose or create tag</span>
          )}
        </div>
        <div className="flex gap-x-3 justify-center items-center w-fit right-3 px-3">
          <button
            type="button"
            onClick={() => {
              setIsTagSelectFieldFocus(!isTagSelectFieldFocus);
              setIsTagInputFieldFocus(false);
            }}
            className=""
          >
            <LuListFilter className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsTagInputFieldFocus(!isTagInputFieldFocus);
              setIsTagSelectFieldFocus(false);
            }}
            className=""
          >
            <LuPlus className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div
        className={`absolute z-20 right-0 ${
          isTagSelectFieldFocus ? "" : "hidden"
        } w-full`}
      >
        <div className="mt-2 rounded-xl top-full max-h-40 grid grid-cols-2 gap-3 overflow-y-auto bg-white shadow-xl p-2 border">
          {projectTagOptions
            .filter((tag) => tag !== "")
            .map((tag, index) => (
              <button
                type="button"
                key={index}
                onClick={() => {
                  setFieldValue("tags", [...values, tag]);
                }}
                title={tag}
                className={`rounded-xl border px-4 py-2 text-sm ${
                  values.includes(tag)
                    ? "bg-gray-400 text-white"
                    : "bg-white hover:bg-gray-200"
                } disabled:bg-gray-300 disabled:text-white text-ellipsis overflow-x-hidden`}
                disabled={values.includes(tag)}
              >
                {tag}
              </button>
            ))}
        </div>
      </div>
      <div
        className={`absolute z-20 right-0 ${
          isTagInputFieldFocus ? "" : "hidden"
        } w-full`}
      >
        <div className="mt-2 rounded-xl top-full max-h-40 flex gap-3 overflow-y-auto bg-white shadow-xl py-2 px-3 border">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => {
              setNewTagInput(e.target.value);
            }}
            className="outline-none tracking-wider text-sm grow"
            placeholder="new tag"
          />
          {!values.includes(newTagInput) ? (
            <button
              type="button"
              onClick={() => {
                setFieldValue("tags", [...values, newTagInput]);
                setNewTagInput("");
              }}
              className="text-xs tracking-wider cursor-pointer"
              disabled={newTagInput === ""}
            >
              Add
            </button>
          ) : (
            <span className="text-xs text-red-400 ml-auto w-fit grow line-clamp-1 my-auto">
              Already exist
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

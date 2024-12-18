import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction} from "react";
import { type ReactElement, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import FileInput from "@/src/components/input/FileInput";
import { TagInput } from "@/src/components/input/TagInput";
import { YearInput } from "@/src/components/input/YearInput";
import type { IProjectData } from "@/src/interfaces/project.interface";
import { projectValidationSchema } from "@/src/validation/project.validation";

interface IProjectFormProps {
  data: IProjectData | null;
  projectTagOptions: string[]
  isEdit?: boolean;
  id?: string;
  toggle: () => void;
  setProjectSearchQuery: Dispatch<SetStateAction<string>>
  setProjectInputValue: Dispatch<SetStateAction<string>>
  setProjectSelectedTagFilter: Dispatch<SetStateAction<string>>
  createProject: (data: FormData) => Promise<void>
  editProject: (id: string, data: FormData) => Promise<void>
};

export interface IProjectValues {
  name: string
  description: string
  tvl: number
  users: number
  year: number;
  tags: string[]
  logo: File | string | null
}

export const ProjectForm = ({ props }: { props: IProjectFormProps }): ReactElement => {
  const { 
    isEdit, 
    data,
    projectTagOptions, 
    id, 
    toggle,
    setProjectSearchQuery,
    setProjectInputValue,
    setProjectSelectedTagFilter,
    createProject,
    editProject
  } = props;

  const [isLoading, setIsLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const initialValue: IProjectValues = {
    name: data?.name ? data.name : '',
    description: data?.description ? data.description : '',
    tvl: data?.tvl ? data.tvl : 0,
    users: data?.users ? data.users : 0,
    year: data?.year ? data.year : new Date().getFullYear(),
    tags: data?.tags ? data.tags : [],
    logo: data ? data.logo : selectedFile,
  };

  useEffect(() => {
    if (data) {
      const logo = data.logo ?? ''
      setPreviewUrl(logo);

      fetch(logo)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], 'icon.jpg', { type: 'image/jpeg' });
          setSelectedFile(file);
        })
        .catch((error) => {
          console.error('Error Fetch Logo:', error);
        });
    }
  }, []);

  const handleSubmit = async (values: IProjectValues): Promise<void> => {
    setIsLoading(true)
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('year', values.year.toString());
    formData.append('tvl', values.tvl.toString());
    formData.append('users', values.users.toString());
    formData.append('tags', values.tags.toString());

    if (selectedFile) {
      formData.append('logo', selectedFile);
    }

    try {
      if (isEdit && id) {
        await editProject(id, formData);
      } else {
        await createProject(formData);
      }
      
      setProjectInputValue('')
      setProjectSearchQuery('')
      setProjectSelectedTagFilter('')
      toggle()
    } catch (error) {} finally {
      setIsLoading(true)
    }
  };

  const handleFileChange = (files: File): void => {
    setSelectedFile(files);
  };

  return (
    <div className="h-full">
      <Formik
        initialValues={initialValue}
        validationSchema={projectValidationSchema}
        validateOnBlur={false}
        validateOnChange={true}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          values,
          setFieldValue,
          touched
        }) => (
          <Form 
            onSubmit={handleSubmit}
            className="h-full pb-10"
          >
            <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-4 h-full bg-white">
              <div className="col-span-8 mt-4 flex flex-col gap-y-6 overflow-y-auto overflow-x-hidden pr-6">
                <div>
                  <div className="flex flex-col gap-y-[6px]">
                    <label 
                      htmlFor="name"
                      className="text-sm"
                    >
                      <span>Project name</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="name"
                      placeholder="Project name"
                      value={values.name}
                      onChange={handleChange('name')}
                      className="outline-none border-[1px] border-primary-border h-12 rounded-xl px-3 text-sm tracking-wide bg-[#F8F8F8]"
                      autoComplete="off"
                      autoCorrect="off"
                      autoSave="off"
                    />
                  </div>
                  {touched.name && errors?.name && <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.name}</span>}
                </div>
                <div>
                  <div className="flex flex-col gap-y-[6px]">
                    <label 
                      htmlFor="description"
                      className="text-sm"
                    >
                      <span>Description</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Description here"
                      value={values.description}
                      onChange={handleChange('description')}
                      autoComplete="off"
                      autoCorrect="off"
                      autoSave="off"
                      className="outline-none border-[1px] border-primary-border h-32 resize-none rounded-xl p-3 text-sm tracking-wide bg-[#F8F8F8]"
                    />
                  </div>
                  {touched.description && errors?.description && <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.description}</span>}
                </div>
                {/* <div>
                  <div>
                    <label 
                      htmlFor="tvl"
                    >
                      <span>TVL</span>
                    </label>
                    <input
                      id="tvl"
                      name="tvl"
                      type="number"
                      value={values.tvl}
                      onChange={handleChange('tvl')}
                      autoComplete="off"
                    />
                  </div>
                  {touched.tvl && errors?.tvl && <span>{errors.tvl}</span>}
                </div> */}
                {/* <div>
                  <div>
                    <label 
                      htmlFor="users"
                    >
                      <span>Total User</span>
                    </label>
                    <input
                      id="users"
                      name="users"
                      type="number"
                      value={values.users}
                      onChange={handleChange('users')}
                      autoComplete="off"
                    />
                  </div>
                  {touched.users && errors?.users && <span>{errors.users}</span>}
                </div> */}
                <div>
                  <div className="flex flex-col gap-y-[6px]">
                    <label 
                      htmlFor="year"
                      className="text-sm"
                    >
                      <span>Established in</span>
                    </label>
                    <YearInput
                      props={{
                        value: values.year,
                        setFieldValue
                      }}
                    />
                    {/* <input
                      id="year"
                      name="year"
                      type="number"
                      value={values.year}
                      onChange={handleChange('year')}
                      autoComplete="off"
                      className="outline-none border-[1px] border-primary-border h-10 rounded-xl px-3 text-sm tracking-wide bg-[#F8F8F8]"
                    /> */}
                  </div>
                  {touched.year && errors?.year && <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.year}</span>}
                </div>
                <div>
                  <div className="flex flex-col gap-y-[6px]">
                    <label 
                      htmlFor="year"
                      className="text-sm"
                    >
                      <span>Tags</span>
                    </label>
                    <div>
                      <TagInput 
                        props={{
                          values: values.tags,
                          projectTagOptions,
                          setFieldValue
                        }}
                      />
                      {
                        touched.tags && errors.tags && (
                          <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.tags}</span>
                        )
                      }
                    </div>
                  </div>
                  {/* <FieldArray name="tags">
                    {({ push, remove }) => (
                      <div>
                        {values.tags.map((tag, index) => (
                          <div key={index} style={{ marginBottom: '8px' }}>
                            <Field
                              name={`tags[${index}]`}
                              placeholder=""
                            />
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              style={{ marginLeft: '8px' }}
                              disabled={values.tags.length <= 1}
                            >
                              Remove
                            </button>
                            {
                              touched.tags && errors?.tags && errors.tags[index] && (
                                <span>{getIn(errors, `tags.${index}`)}</span>
                              )
                            }
                          </div>
                        ))}
                        <button type="button" onClick={() => push('')}>
                          Add More
                        </button>
                      </div>
                    )}
                  </FieldArray> */}
                </div>
                <div className="flex flex-col gap-y-[6px]">
                  <label 
                    htmlFor="name"
                    className="text-sm"
                  >
                    <span>Logo</span>
                  </label>
                  <FileInput
                    onChange={handleFileChange}
                    fileData={selectedFile}
                    setSelectedFile={setSelectedFile}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                  />
                </div>
              </div>
              <div className="mt-auto col-span-4 flex flex-col gap-y-4 pr-6 lg:pr-0">
                <button
                  type="button"
                  onClick={toggle}
                  className="bg-white srounded-xl w-full py-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white rounded-xl w-full py-3 hover:bg-blue-700"
                >
                  {isLoading ? <VscLoading className="text-white m-auto h-5 w-5 font-bold animate-spin" /> : <span className="m-auto">Submit Project</span>}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

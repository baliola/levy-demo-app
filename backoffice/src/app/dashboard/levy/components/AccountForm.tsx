import { Form, Formik } from "formik";
import type { Dispatch, SetStateAction} from "react";
import { type ReactElement, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { SelectInput } from "@/src/components/input/SelectInput";
import type { IAccountData, IAccountRoleData, ICreateAccountPayload, IEditAccountRolePayload } from "@/src/interfaces/account.interface";
import { accountCreateValidationSchema, accountEditRoleValidationSchema } from "@/src/validation/account.validation";

interface IAccountFormProps {
  data: IAccountData | null;
  accountRoleOptions: IAccountRoleData[]
  isEdit?: boolean;
  id?: string;
  toggle: () => void;
  setAccountSearchQuery: Dispatch<SetStateAction<string>>
  setAccountInputValue: Dispatch<SetStateAction<string>>
  setAccountSelectedRoleFilter: Dispatch<SetStateAction<IAccountRoleData>>
  createAccount: (data: ICreateAccountPayload) => Promise<void>
  editAccountRole: (id: string, data: IEditAccountRolePayload) => Promise<void>
};

export interface IAccountValues {
  email: string
  password: string
  role: {
    id: number
    name: string
  }
}

export const AccountForm = ({ props }: { props: IAccountFormProps }): ReactElement => {
  const { 
    isEdit, 
    data,
    accountRoleOptions, 
    id, 
    toggle,
    setAccountSearchQuery,
    setAccountInputValue,
    setAccountSelectedRoleFilter,
    createAccount,
    editAccountRole
  } = props;

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const initialValue: IAccountValues = {
    email: data?.email ? data.email : '',
    password: '',
    role: data?.role ? data.role : {
      id: 0,
      name: ''
    }
  };

  const handleSubmit = async (values: IAccountValues): Promise<void> => {
    setIsLoading(true)

    try {
      if (isEdit && id) {
        await editAccountRole(id, {
          role_id: values.role.id
        });
      } else {
        await createAccount({
          email: values.email,
          password: values.password,
          role_id: values.role.id
        });
      }
      
      setAccountInputValue('')
      setAccountSearchQuery('')
      setAccountSelectedRoleFilter({ id: 0, name: ''})
      toggle()
    } catch (error) {} finally {
      setIsLoading(true)
    }
  };

  return (
    <div className="h-full">
      <Formik
        initialValues={initialValue}
        validationSchema={!isEdit ? accountCreateValidationSchema : accountEditRoleValidationSchema}
        validateOnBlur={false}
        validateOnChange={true}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          values,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
          setFieldValue,
          setTouched,
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
                      <span>E-mail</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="example@gmail.com"
                      value={values.email}
                      onChange={handleChange('email')}
                      disabled={isEdit}
                      autoComplete="off"
                      autoCorrect="off"
                      autoSave="off"
                      className="outline-none border-[1px] border-primary-border h-12 rounded-xl px-3 text-sm tracking-wide bg-[#F8F8F8] disabled:text-slate-400"
                    />
                  </div>
                  {touched.email && errors?.email && <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.email}</span>}
                </div>
                {
                  !isEdit && <div>
                    <div className="flex flex-col gap-y-[6px]">
                      <label 
                        htmlFor="description"
                        className="text-sm"
                      >
                        <span>Password</span>
                      </label>
                      <div className="outline-none border-[1px] border-primary-border h-12 rounded-xl text-sm tracking-wide bg-[#F8F8F8] relative flex items-center overflow-hidden">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Example123!"
                          onChange={handleChange("password")}
                          autoComplete="off"
                          autoCorrect="off"
                          autoSave="off"
                          className="outline-none bg-transparent h-full w-full text-sm tracking-wide pr-10 px-3"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3"
                        >
                          {
                            !showPassword 
                              ? <RiEyeLine className="text-gray-500" size={20} />
                              : <RiEyeOffLine className="text-gray-500" size={20} />
                          }
                        </button>
                      </div>
                    </div>
                    {touched.password && errors?.password && <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.password}</span>}
                  </div>
                }
                <div>
                  <div className="flex flex-col gap-y-[6px]">
                    <label 
                      htmlFor="year"
                      className="text-sm"
                    >
                      <span>Role</span>
                    </label>
                    <div>
                      <SelectInput 
                        props={{
                          value: values.role,
                          options: accountRoleOptions,
                          field: 'role',
                          setFieldValue,
                        }}
                      />
                      {
                        touched.role && errors.role?.id && (
                          <span className="text-xs text-red-400 ml-auto pr-3 mt-2">{errors.role?.id}</span>
                        )
                      }
                    </div>
                  </div>
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
                  {isLoading ? <VscLoading className="text-white m-auto h-5 w-5 font-bold animate-spin" /> : <span className="m-auto">Submit Account</span>}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

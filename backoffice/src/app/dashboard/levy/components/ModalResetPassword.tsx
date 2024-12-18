import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { type ReactElement, useState } from "react";
import { RiEyeLine, RiEyeOffLine, RiLockPasswordLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import Modal from "@/src/components/modal/Modal";
import useAccount from "@/src/hooks/useAccount";
import { useAuth } from "@/src/hooks/useAuth";
import { accountResetPasswordValidationSchema } from "@/src/validation/account.validation";

interface IModalResetPasswordProps {
  id: string,
}

export const ModalResetPassword = ({ props }: { props: IModalResetPasswordProps }): ReactElement => {
  const {
    id
  } = props

  const initialValues: { password: string } = {
    password: ''
  }

  const router = useRouter()
  const [isPasswordFocus, setIsPasswordFocus] = useState(false)

  const { showModalResetPasswordAccount, toggleModalResetPasswordAccount, resetPasswordAccount } = useAccount();
  const { showPassword, setShowPassword } = useAuth(router)

  const handleResetPassword = async (values: { password: string }): Promise<void> => {
    try {
      resetPasswordAccount(id, values)
      toggleModalResetPasswordAccount()
    } catch (error) {}
  }

  return (
    <>
      <button
        type="button"
        onClick={toggleModalResetPasswordAccount}
        className="flex text-xs text-white font-medium rounded-full h-fit py-1.5 items-center justify-center gap-1 px-3 lg:px-4 border-[3px] bg-blue-600"
      >
        <RiLockPasswordLine className="w-4 h-4" />
        <span className="hidden lg:block text-left">Reset</span>
      </button>
      <Modal 
        props={{
          isOpen: showModalResetPasswordAccount,
          toggle: toggleModalResetPasswordAccount
        }}
      >
        <div className="flex flex-col gap-5 justify-center items-center rounded-2xl h-full bg-white py-6">
          <Formik
            initialValues={initialValues}
            validationSchema={accountResetPasswordValidationSchema}
            validateOnBlur={false}
            validateOnChange={true}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true)
              handleResetPassword(values)
              setSubmitting(false)
            }}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              values,
              touched,
            }) => (
              <form 
                onSubmit={handleSubmit}
                className="h-full w-full px-6"
              >
                <div className="h-full flex flex-col gap-y-4">
                  <div className="flex justify-center flex-col gap-y-1.5 items-center">
                    <RiLockPasswordLine className="w-8 h-8 text-blue-500" />
                    <span className="text-center tracking-wide">Reset Password</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-y-1">
                      <label
                        htmlFor="password"
                      >
                        <span className="text-xs tracking-wide">Password</span>
                      </label>
                      <div className={`border-[1px] bg-auth-input ${isPasswordFocus ? 'border-primary-border' : 'border-transparent'} h-12 rounded-xl overflow-hidden relative flex items-center w-full`}>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Example123!"
                          onChange={handleChange("password")}
                          autoComplete="off"
                          className="outline-none bg-transparent h-full w-full px-3 pr-10 text-sm tracking-wide"
                          onFocus={() => { setIsPasswordFocus(true )}}
                          onBlur={() => { setIsPasswordFocus(false) }}
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
                    {touched.password && errors?.password && <span className="text-xs text-red-400 w-full text-left px-1 mt-2">{errors.password}</span>}
                  </div>
                  <div className="mt-0">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 text-white w-full h-10 rounded-xl tracking-wider flex disabled:bg-primary-blur"
                    >
                    
                      {isSubmitting ? <VscLoading className="text-white m-auto h-5 w-5 font-bold animate-spin" /> : <span className="m-auto text-sm ">Submit</span>}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  )
} 
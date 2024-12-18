import { Formik } from "formik";
import Image from "next/image";
import {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  useState,
} from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import Images from "@/src/constants/images";
import { authLoginValidationSchema } from "@/src/validation/auth.validation";

interface ILoginValues {
  email: string;
  password: string;
}

interface ILoginFormProps {
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  handleLogin: (values: ILoginValues) => Promise<void>;
}

export const LoginForm = ({
  props,
}: {
  props: ILoginFormProps;
}): ReactElement => {
  const initialValues: ILoginValues = {
    email: "",
    password: "",
  };

  const { showPassword, setShowPassword, handleLogin } = props;

  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const submitFormLogin = async (values: ILoginValues): Promise<void> => {
    await handleLogin(values);
  };

  return (
    <div className="rounded-br-3xl rounded-bl-[3rem] rounded-tl-3xl rounded-tr-[3rem] backdrop-blur-0 flex flex-col h-fit lg:w-96">
      <div className="flex flex-col bg-auth-card px-8 pb-8 rounded-br-3xl rounded-bl-[3rem] rounded-tl-3xl rounded-tr-[3rem]">
        <div className="flex justify-center">
          <Image
            src={Images.authMandalaLogo}
            alt="Mandala Chain Hub CMS"
            width={100}
            height={100}
            className="aspect-video w-52 mt-2"
            draggable={false}
          />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={authLoginValidationSchema}
          validateOnBlur={false}
          validateOnChange={true}
          onSubmit={submitFormLogin}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            values,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="h-full">
              <div className="h-full flex flex-col gap-y-4">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="email">
                      <span className="text-xs tracking-wide">
                        E-mail Address
                      </span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="example@gmail.com"
                      value={values.email}
                      onChange={handleChange("email")}
                      autoComplete="off"
                      className="outline-none border-[1px] border-transparent focus:border-primary bg-auth-input h-12 rounded-xl px-3 text-sm tracking-wide"
                    />
                  </div>
                  {touched.email && errors?.email && (
                    <span className="text-xs text-red-400 ml-auto pr-3 mt-2">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="password">
                      <span className="text-xs tracking-wide">Password</span>
                    </label>
                    <div
                      className={`border-[1px] bg-auth-input ${
                        isPasswordFocus
                          ? "border-primary-border"
                          : "border-transparent"
                      } h-12 rounded-xl overflow-hidden relative flex items-center w-full`}
                    >
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Example123!"
                        onChange={handleChange("password")}
                        autoComplete="off"
                        className="outline-none bg-transparent h-full w-full px-3 pr-10 text-sm tracking-wide"
                        onFocus={() => {
                          setIsPasswordFocus(true);
                        }}
                        onBlur={() => {
                          setIsPasswordFocus(false);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3"
                      >
                        {!showPassword ? (
                          <RiEyeLine className="text-gray-500" size={20} />
                        ) : (
                          <RiEyeOffLine className="text-gray-500" size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                  {touched.password && errors?.password && (
                    <span className="text-xs text-red-400 ml-auto pr-3 mt-2">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white w-full h-12 rounded-xl tracking-wider flex disabled:bg-primary-blur"
                  >
                    {isSubmitting ? (
                      <VscLoading className="text-white m-auto h-5 w-5 font-bold animate-spin" />
                    ) : (
                      <span className="m-auto">Login</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

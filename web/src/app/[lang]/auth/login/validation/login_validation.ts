import * as Yup from "yup";

const MINIMAL_PASSWORD_LENGTH = 8;

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Email tidak valid!")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Email tidak valid!"
    )
    .required("Email harus diisi!"),
  password: Yup.string()
    .min(MINIMAL_PASSWORD_LENGTH, "Kata sandi masih kurang dari 8 karakter")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Kata sandi tidak valid!"
    )
    .required("Kata sandi harus diisi!"),
});

export default loginValidation;

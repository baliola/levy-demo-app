import * as Yup from 'yup';

const MINIMAL_PASSWORD_LENGTH = 8;

const authLoginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(MINIMAL_PASSWORD_LENGTH, 'Password minimum 8 characters')
    .required('Password is required')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/,
    //   'Password must include uppercase, lowercase, number and symbol',
    // )
});

export { authLoginValidationSchema };

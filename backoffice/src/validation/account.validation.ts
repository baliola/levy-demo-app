import * as Yup from 'yup';

const accountCreateValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(16, 'Password must be at least 16 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
  role: Yup.object().shape({
    id: Yup.number().min(1, 'Role is required').required(),
    name: Yup.string(),
  }),
});

const accountEditRoleValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid')
    .required('Email is required'),
  role: Yup.object().shape({
    id: Yup.number().min(1, 'Role is required').required(),
    name: Yup.string(),
  }),
});

const accountResetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(16, 'Password must be at least 16 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

export { accountCreateValidationSchema, accountEditRoleValidationSchema, accountResetPasswordValidationSchema };

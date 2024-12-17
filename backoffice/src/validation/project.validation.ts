import * as Yup from 'yup';

const projectValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  tvl: Yup.number().required('TVL is required'),
  users: Yup.number().required('Users is required'),
  year: Yup.number().required('Year is required'),
  tags: Yup.array().required('Tags is required')
    .of(Yup.string().required('Please insert something'))
    .min(1, 'Tags is required'),
});

export { projectValidationSchema };

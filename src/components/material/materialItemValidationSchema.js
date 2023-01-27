import { number, object } from 'yup';

export const materialItemValidationSchema = object().shape({
  x: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  y: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  z: number().typeError('Must be a number').min(0, 'Must be greater than 0').required('Required'),
  quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  min_quantity: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  price: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  diameter: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  thickeness: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required'),
  length: number()
    .typeError('Must be a number')
    .min(0, 'Must be greater than 0')
    .required('Required')
});

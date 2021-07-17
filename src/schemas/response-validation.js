import * as Yup from 'yup';

export const responseValidation = Yup.object().shape({
    link: Yup.string().url('Bro, eso no parece una URL valida')
      .required('Tienes que poner una URL men')
  });
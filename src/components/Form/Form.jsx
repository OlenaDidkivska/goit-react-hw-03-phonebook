import React from 'react';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import {
  Field,
  FormField,
  Label,
  FormButton,
  ErrorText,
  Form,
} from './Form.styled';
import * as yup from 'yup';

const nameId = nanoid();
const numberId = nanoid();

yup.addMethod(yup.string, 'numeric', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().max(12).numeric().required(),
});

export const FormEl = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form>
        <FormField>
          <Label htmlFor={nameId}>Name</Label>
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nameId}
          />
          <ErrorMessage
            name="name"
            render={message => <ErrorText>{message}</ErrorText>}
          />
        </FormField>
        <FormField>
          <Label htmlFor={numberId}>Number </Label>
          <Field
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={numberId}
          />
          <ErrorMessage
            name="number"
            render={message => <ErrorText>{message}</ErrorText>}
          />
        </FormField>
        <FormButton type="submit">Add contact</FormButton>
      </Form>
    </Formik>
  );
};

FormEl.prototype = {
  onSubmit: PropTypes.string.isRequired,
};

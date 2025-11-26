import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../common/Button';
import './SettingsForm.css';

// Схема валідації
const SettingsSchema = Yup.object().shape({
  size: Yup.number()
    .min(3, 'Мінімум 3x3')
    .max(10, 'Максимум 10x10')
    .required('Обов\'язкове поле'),
  // Можна додати інші поля, наприклад, ім'я гравця
  username: Yup.string()
    .min(2, 'Занадто коротке ім\'я')
    .max(20, 'Занадто довге ім\'я')
});

export const SettingsForm = ({ initialSettings, onSave }) => {
  return (
    <Formik
      initialValues={initialSettings}
      validationSchema={SettingsSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSave(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="settings-form">
          <div className="form-group">
            <label htmlFor="size">Розмір поля (від 3 до 10)</label>
            <Field type="number" name="size" className="form-input" />
            <ErrorMessage name="size" component="div" className="error-message" />
          </div>

          <div className="form-group">
            <label htmlFor="username">Ім'я гравця</label>
            <Field type="text" name="username" className="form-input" />
            <ErrorMessage name="username" component="div" className="error-message" />
          </div>

          <div className="form-actions">
            <Button type="submit" text="Зберегти" disabled={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  );
};
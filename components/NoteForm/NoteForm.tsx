import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import type { CreatedNote } from '../../types/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import toast from 'react-hot-toast';
import css from './NoteForm.module.css';

interface NoteFormProps {
  closeModal: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

const tagsMap: { [key: string]: string } = {
  Todo: 'Todo',
  Work: 'Work',
  Personal: 'Personal',
  Meeting: 'Meeting',
  Shopping: 'Shopping',
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, 'Title is too short')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().trim().max(500, 'Content is too long'),
  tag: Yup.string().trim().oneOf(Object.keys(tagsMap)).required('Tag is required'),
});

export default function NoteForm({ closeModal }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (note: CreatedNote) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      closeModal();
    },
    onError: () => toast.error('Something went wrong'),
  });

  const handleSubmit = (
    { title, content, tag }: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    mutate({ title, content, tag });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {Object.keys(tagsMap).map((tag) => (
                <option key={tag} value={tag}>
                  {tagsMap[tag]}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" onClick={closeModal} className={css.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={!formikProps.isValid}>
              {formikProps.isSubmitting ? 'Submitting...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

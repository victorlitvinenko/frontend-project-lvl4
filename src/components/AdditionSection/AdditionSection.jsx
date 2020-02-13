import React, { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import UserContext from '@/context/UserContext';
import * as actions from '@/store/slice';

const AdditionSection = (props) => {
  const { state: { currentChannelId }, addMessage } = props;
  const userName = useContext(UserContext);

  return (
    <Formik
      initialValues={{ message: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.message) {
          errors.message = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addMessage(currentChannelId, { ...values, userName });
        resetForm({});
        setSubmitting(false);
      }}
    >
      {({
        isSubmitting, values, errors, touched,
      }) => (
        <Form>
          <ErrorMessage name="message" className="small text-danger" component="div" />
          <div className="input-group mb-3">
            <Field
              className={cn('form-control flex-grow-1', { 'is-invalid': errors.message && touched.message })}
              type="text"
              name="message"
              disabled={isSubmitting}
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="submit"
                disabled={isSubmitting || errors.message || values.message === ''}
              >
                Send
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ state }) => ({ state });

const actionCreators = {
  addMessage: actions.addMessage,
};

export default connect(mapStateToProps, actionCreators)(AdditionSection);

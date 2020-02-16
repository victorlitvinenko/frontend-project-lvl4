import React, { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Formik, Form, Field } from 'formik';

import UserContext from '@/context';
import actions from '@/store/actions';

const AdditionSection = (props) => {
  const { state: { currentChannelId }, addMessage } = props;
  const userName = useContext(UserContext);

  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addMessage(currentChannelId, { ...values, userName });
        setSubmitting(false);
        resetForm({});
        document.getElementById('message').focus();
      }}
    >
      {({
        isSubmitting, values, errors, touched,
      }) => (
        <Form>
          <div className="input-group mb-3">
            <Field
              id="message"
              autoFocus
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

const mapStateToProps = (state) => ({ state });

const actionCreators = {
  addMessage: actions.addMessage,
};

export default connect(mapStateToProps, actionCreators)(AdditionSection);

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Formik, Form, Field } from 'formik';

import UserContext from '@/context/UserContext';
import { asyncActions } from '@/slices';

const AdditionSection = (props) => {
  const {
    state: { currentChannelId, messageSendingStatus }, addMessage, currentChannelName,
  } = props;
  const userName = useContext(UserContext);

  return (
    <Formik
      initialValues={{ text: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.text.trim()) {
          errors.text = 'Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await addMessage(currentChannelId, { ...values, userName, date: new Date() });
        setSubmitting(false);
        resetForm({});
        document.getElementById('text').focus();
      }}
    >
      {({
        isSubmitting, values, errors,
      }) => (
        <Form>
          <div className="input-group mb-3 px-3">
            <Field
              placeholder={`Message #${currentChannelName}`}
              id="text"
              autoFocus
              className="form-control flex-grow-1"
              type="text"
              name="text"
              disabled={isSubmitting || messageSendingStatus === 'sending'}
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="submit"
                disabled={isSubmitting || errors.text || values.text === ''}
              >
                <div
                  className={cn('spinner-border spinner-border-sm mr-2', { 'd-none': messageSendingStatus !== 'sending' })}
                  role="status"
                />
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
  addMessage: asyncActions.addMessage,
};

export default connect(mapStateToProps, actionCreators)(AdditionSection);

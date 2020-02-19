import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import UserContext from '@/context';
import actions from '@/store/actions';

const AdditionSection = (props) => {
  const { state: { currentChannelId }, addMessage, currentChannelName } = props;
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        addMessage(currentChannelId, { ...values, userName, date: new Date() });
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
              disabled={isSubmitting}
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="submit"
                disabled={isSubmitting || errors.text || values.text === ''}
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

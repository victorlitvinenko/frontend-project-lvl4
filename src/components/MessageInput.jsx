import React, { useEffect, useContext, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

import connect from '@/connect';
import UserContext from '@/context/UserContext';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => htmlElRef.current && htmlElRef.current.focus();
  return [htmlElRef, setFocus];
};

const MessageInput = (props) => {
  const {
    addMessage, currentChannelName,
  } = props;
  const { channels: { currentChannelId } } = useSelector((state) => state);
  const userName = useContext(UserContext);
  const [inputRef, setInputFocus] = useFocus();
  useEffect(() => { setInputFocus(); });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.text.trim()) {
        errors.text = 'Required';
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await addMessage(currentChannelId, { ...values, userName, date: new Date() });
      setSubmitting(false);
      resetForm({});
      setInputFocus();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-group mb-3 px-3">
        <input
          ref={inputRef}
          placeholder={`Message #${currentChannelName}`}
          id="text"
          className="form-control flex-grow-1"
          type="text"
          name="text"
          disabled={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.text}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="submit"
            disabled={formik.isSubmitting || formik.errors.text || formik.values.text === ''}
          >
            <Spinner show={formik.isSubmitting} />
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

const Spinner = (props) => {
  const { show } = props;
  if (!show) return null;
  return <div className="spinner-border spinner-border-sm mr-2" role="status" />;
};

export default connect()(MessageInput);

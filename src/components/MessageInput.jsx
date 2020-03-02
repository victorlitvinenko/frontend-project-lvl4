import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Spinner from 'react-bootstrap/Spinner';

import connect from '@/connect';
import UserContext from '@/context/UserContext';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) {
      htmlElRef.current.focus();
    }
  };
  return [htmlElRef, setFocus];
};

const MessageInput = (props) => {
  const {
    addMessage, currentChannelName,
  } = props;
  const { channels: { currentChannelId } } = useSelector((state) => state);
  const userName = useContext(UserContext);
  const [inputRef, setInputFocus] = useFocus();
  useEffect(setInputFocus);
  const [status, setStatus] = useState('empty');

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.text.trim()) {
        errors.text = 'Required';
        setStatus('empty');
      } else {
        setStatus('idle');
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setStatus('submitting');
      await addMessage(currentChannelId, { ...values, userName, date: new Date() });
      setSubmitting(false);
      resetForm({});
      setStatus('empty');
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
          disabled={status === 'submitting'}
          onChange={formik.handleChange}
          value={formik.values.text}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="submit"
            disabled={status !== 'idle'}
          >
            { formik.isSubmitting && <Spinner animation="border" size="sm" className="mr-2" /> }
            Send
          </button>
        </div>
      </div>
    </form>
  );
};

export default connect()(MessageInput);

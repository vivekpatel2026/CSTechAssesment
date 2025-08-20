import React, { useState } from 'react';
import api from '../../services/api';

const UploadListForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append('listFile', file);

    try {
      const res = await api.post('/lists/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.msg);
      setIsError(false);
      onUploadSuccess(); // Callback to refresh the distributed lists
    } catch (err) {
      setMessage(err.response?.data?.msg || 'File upload failed.');
      setIsError(true);
    } finally {
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="card">
      <h3>Upload and Distribute List</h3>
      {message && <p className={isError ? 'error-message' : 'success-message'}>{message}</p>}
      <form onSubmit={onSubmit}>
        <input type="file" accept=".csv,.xlsx,.xls" onChange={onFileChange} />
        <button type="submit" className="btn">Upload & Distribute</button>
      </form>
    </div>
  );
};

export default UploadListForm;
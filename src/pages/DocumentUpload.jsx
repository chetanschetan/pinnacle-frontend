import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import API from '../api/axios';

export const DocumentUpload = () => {
  const [title, setTitle] = useState('');
  const [s3FileUrl, setS3FileUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Callback receives uploaded S3 link from FileUpload component
  const handleUploadSuccess = (url) => {
    setS3FileUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!s3FileUrl) {
      alert("Please upload a file first!");
      return;
    }

    setSubmitting(true);
    try {
      // Send S3 URL along with metadata to MongoDB backend
      await API.post('/documents', {
        title,
        fileUrl: s3FileUrl
      });
      alert('Document saved to database successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save document metadata.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', padding: '20px' }}>
      <h2>Upload Document</h2>

      <div style={{ marginBottom: '15px' }}>
        <label>Document Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ width: '100%', padding: '8px', marginTop: '4px' }}
        />
      </div>

      {/* File Upload Component */}
      <FileUpload onUploadSuccess={handleUploadSuccess} />

      <button 
        type="submit" 
        disabled={!s3FileUrl || submitting}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        {submitting ? 'Saving...' : 'Save to Profile'}
      </button>
    </form>
  );
};
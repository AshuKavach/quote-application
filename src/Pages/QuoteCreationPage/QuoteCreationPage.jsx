import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage, createQuote } from '../../services/api';
import './QuoteCreationPage.css';

const QuoteCreationPage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsUploading(true);

    try {
      let mediaUrl = null;

      // Upload the media file if a file is selected
      if (file) {
        mediaUrl = await uploadImage(file);
        console.log('Uploaded Media URL:', mediaUrl);
      } else {
        console.log('No file uploaded, proceeding without mediaUrl.');
      }

      // Create the quote with the text and media URL
      if (mediaUrl) {
        const response = await createQuote(text, mediaUrl); // Ensure text and mediaUrl are passed correctly
        console.log('Quote Created Successfully:', response);
      }
      navigate('/quotes');
    } catch (err) {
      console.error('Quote Creation Error:', err);
      setError(err || 'Failed to create quote. Please try again!');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="quote-creation-container">
      <h2>Create a New Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quote Text:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Create Quote'}
        </button>
      </form>
    </div>
  );
};

export default QuoteCreationPage;

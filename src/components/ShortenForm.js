import React, { useState } from 'react';
import { shortenUrlAPI } from '../utils/api'; // Your API helper
import logger from '../middleware/logger';

function ShortenForm({ index }) {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await shortenUrlAPI({
        url: longUrl,
        validity: parseInt(validity),
        shortcode: customCode,
      });

      if (response.success) {
        setResult({
          shortUrl: `http://localhost:3000/${response.shortcode}`,
          originalUrl: response.originalUrl,
          expiresAt: response.expiresAt,
          clicks: 0,
        });
        setError('');
        logger('Shortened URL Created', response);
      } else {
        setError(response.message || 'Error occurred');
        logger('Shorten Error', response);
      }
    } catch (err) {
      setError('Network or server error');
      logger('Exception', err.toString());
    }
  };

  return (
    <div>
      <h3>Shorten URL #{index}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <input
          type="number"
          placeholder="Validity (minutes)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Custom Shortcode"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <button type="submit">SHORTEN</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div>
          <h4>Result</h4>
          <p>Shortened URL: <a href={result.shortUrl}>{result.shortUrl}</a></p>
          <p>Original URL: {result.originalUrl}</p>
          <p>Clicks: {result.clicks}</p>
          <p>Expires At: {result.expiresAt}</p>
        </div>
      )}
    </div>
  );
}

export default ShortenForm;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resolveShortUrl } from '../utils/api';
import logger from '../middleware/logger';

function RedirectPage() {
  const { shortcode } = useParams();

  useEffect(() => {
    const redirect = async () => {
      try {
        logger('Resolving shortcode', { shortcode });
        const result = await resolveShortUrl(shortcode);
        if (result.success) {
          window.location.href = result.originalUrl;
        } else {
          alert(result.message || 'Short URL not found or expired');
          logger('Resolution Error', result);
        }
      } catch (err) {
        alert('Error during redirection');
        logger('Redirection Exception', { error: err.toString() });
      }
    };

    redirect();
  }, [shortcode]);

  return <div>Redirecting...</div>;
}

export default RedirectPage;
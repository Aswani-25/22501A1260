import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import logger from '../middleware/logger';
import { isValidUrl, isAlphanumeric, isPositiveInteger } from '../utils/validators';
import { createShortUrl } from '../utils/api';

function ShortenerPage() {
  const [forms, setForms] = useState(Array(5).fill({ url: '', validity: '', shortcode: '' }));
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newForms = [...forms];
    newForms[index][field] = value;
    setForms(newForms);
  };

  const handleSubmit = async (index) => {
    const { url, validity, shortcode } = forms[index];

    if (!isValidUrl(url)) {
      alert('Invalid URL');
      logger('Validation Error: Invalid URL', { url });
      return;
    }

    if (validity && !isPositiveInteger(validity)) {
      alert('Validity must be a positive integer');
      logger('Validation Error: Invalid Validity', { validity });
      return;
    }

    if (shortcode && !isAlphanumeric(shortcode)) {
      alert('Shortcode must be alphanumeric');
      logger('Validation Error: Invalid Shortcode', { shortcode });
      return;
    }

    try {
      const payload = {
        url,
        validity: validity ? parseInt(validity) : 30,
        shortcode,
      };
      logger('Sending shorten request', payload);
      const result = await createShortUrl(payload);
      logger('Received shorten response', result);
      if (result.success) {
        setResults([...results, result]);
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('Error occurred');
      logger('API Error', { error: err.toString() });
    }
  };

  return (
    <Grid container spacing={2} padding={4}>
      {forms.map((form, idx) => (
        <Grid item xs={12} md={6} key={idx}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Shorten URL #{idx + 1}</Typography>
            <TextField fullWidth margin="normal" label="Long URL" value={form.url} onChange={e => handleChange(idx, 'url', e.target.value)} />
            <TextField fullWidth margin="normal" label="Validity (minutes)" value={form.validity} onChange={e => handleChange(idx, 'validity', e.target.value)} />
            <TextField fullWidth margin="normal" label="Custom Shortcode" value={form.shortcode} onChange={e => handleChange(idx, 'shortcode', e.target.value)} />
            <Button variant="contained" color="primary" onClick={() => handleSubmit(idx)}>Shorten</Button>
          </Paper>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Typography variant="h5">Results</Typography>
        {results.map((r, i) => (
          <Typography key={i}>
            {r.shortUrl} → {r.originalUrl}
          </Typography>
        ))}
      </Grid>
    </Grid>
  );
}

export default ShortenerPage;
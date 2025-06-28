export const createShortUrl = async (payload) => {
  const response = await fetch('http://localhost:8000/api/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const resolveShortUrl = async (shortcode) => {
  const response = await fetch(`http://localhost:8000/api/resolve/${shortcode}`);
  return response.json();
};
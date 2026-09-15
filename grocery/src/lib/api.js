export const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3200';

export async function fetchJson(path, options = {}) {
  const { headers, ...rest } = options;
  const response = await fetch(`${apiUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...rest,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

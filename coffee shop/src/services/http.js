export const API_BASE = (process.env.REACT_APP_BACKEND_URL || '').replace(/\/$/, '');

export const request = async (
    url,
    method = 'GET',
    body = null,
    headers = { 'Content-Type': 'application/json' }
) => {
    const response = await fetch(url, { method, body, headers });

    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return response.json();
};

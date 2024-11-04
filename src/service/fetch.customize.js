const BASE_URL = "http://localhost:8080/api";

const customFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  
  // Thiết lập header
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.ok) {
    const data = await response.json();
    return data;  
  } else {
    const errorData = await response.json();
    throw errorData;
  }
};

export default customFetch;

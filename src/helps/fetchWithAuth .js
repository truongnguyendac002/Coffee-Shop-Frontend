import Cookies from "js-cookie";

const fetchWithAuth = async (url, options = {}, authRequired = true) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (authRequired) {
    const token = Cookies.get("token"); // Lấy token từ cookie
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response; 
};

export default fetchWithAuth;

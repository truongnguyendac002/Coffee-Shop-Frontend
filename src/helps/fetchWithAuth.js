import Cookies from "js-cookie";

const fetchWithAuth = async (url, options = {}, authRequired = true) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (authRequired) {
    const token = Cookies.get("token"); 
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  const responseByAccessToken = await fetch(url, {
    ...options,
    headers,
  });
  if (responseByAccessToken.respCode === "103") {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      headers.Authorization = `Bearer ${refreshToken}`;
    }
    const responseByRefreshToken = await fetch(url, {
      ...options,
      headers,
    });
    return responseByRefreshToken;
  }
  return responseByAccessToken;
};

export default fetchWithAuth;

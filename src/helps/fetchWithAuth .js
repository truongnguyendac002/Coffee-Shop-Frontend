import Cookies from "js-cookie";

const fetchWithAuth = async (url, options = {}, authRequired = true) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Nếu authRequired là true, thêm token vào headers
  if (authRequired) {
    const token = Cookies.get("token"); // Lấy token từ cookie
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  // Gửi request với headers đã cấu hình sẵn
  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response; // Trả về kết quả dưới dạng JSON
};

export default fetchWithAuth;

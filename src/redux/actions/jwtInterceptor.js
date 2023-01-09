import axios from "axios";
const JwtInterceptor = () => {
  const defaultOptions = {
    baseURL: process.env.SERVER_IP,
  };

  let instance = axios.create(defaultOptions);
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken");
    config.headers = {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
    return config;
  });

  instance.interceptors.response.use(
    function (successRes) {
      return successRes;
    },
    function (error) {
      if (error.response.status === 403) {
        alert("Session is expired please login again!");
        localStorage.removeItem("accessToken");
        window.location.replace("/");
      } else {
        return error.response;
      }
    }
  );
  return instance;
};

export default JwtInterceptor();

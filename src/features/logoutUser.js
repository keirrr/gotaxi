import axios from "axios";

const logoutUser = () => {
  console.log("logout");
  const logoutUrl = "http://localhost:5000/api/logout";
  axios.post(logoutUrl, {}, { withCredentials: true });
};

export default logoutUser;

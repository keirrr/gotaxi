import axios from "axios";

const logoutUser = async () => {
  const logoutUrl = "http://localhost:5000/api/logout";
  const res = await axios
    .post(logoutUrl, {}, { withCredentials: true })
    .catch((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

  return res;
};

export default logoutUser;

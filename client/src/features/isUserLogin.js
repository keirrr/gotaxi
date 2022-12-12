import axios from "axios";

const isUserLoggedIn = async () => {
  const isLoggedIn = await axios.get(
    "http://gotaxi-server-production.up.railway.app:5000/api/isAuth",
    {
      withCredentials: true,
    }
  );

  isLoggedIn.then((res) => {
    console.log(res.data.response.status);
  });

  return isLoggedIn.data.response.status;
};

export default isUserLoggedIn;

import axios from "axios";

const loginUser = (email, password) => {
  const url = "http://localhost:5000/api/login";

  axios
    .post(
      url,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        return true;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export default loginUser;

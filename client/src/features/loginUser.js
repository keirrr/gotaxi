import axios from "axios";

const loginUser = async (email, password) => {
  const url = "http://localhost:5000/api/login";

  const res = await axios
    .post(
      url,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    })
    .catch((err) => {
      if (JSON.parse(err.request.responseText).message === "Wrong data") {
        return { msg: "Wrong data" };
      }
      return false;
    });

  return res;
};

export default loginUser;

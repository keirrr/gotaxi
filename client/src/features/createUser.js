// Axios
import axios from "axios";

const createUser = async (name, email, password) => {
  const url = "http://localhost:5000/api/users";

  const res = await axios
    .post(
      url,
      {
        name: name,
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

  return res;
};

export default createUser;

// Axios
import axios from "axios";

const createUser = () => {
  const url = "http://localhost:5000/createUser";

  axios
    .post(url, {
      name: 'John'
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createUser;

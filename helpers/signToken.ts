const jwt = require("jsonwebtoken");

type userData = {
  _id: string;
  username: string;
  email: string;
};

module.exports = (userData: userData) => {
  const payload = {
    user: {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
    },
  };
  console.log(userData, payload)
  return {token: jwt.sign(
    payload,
    process.env.SECRETKEY,
    {
      expiresIn: 31536000, // 1 Year
    }
  )};
};
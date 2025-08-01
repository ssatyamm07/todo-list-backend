const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{8,}$/; 
  return usernameRegex.test(username);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password); 
};

module.exports = {
  validateUsername,
  validatePassword
};

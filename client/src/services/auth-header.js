const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user && { Authorization: `Bearer ${user.accessToken}` };
};

export default authHeader;

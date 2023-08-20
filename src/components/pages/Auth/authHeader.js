const authheader = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return {
      authorization: `Bearer ${token}`,
    };
  } else {
    return;
  }
};

export default authheader;

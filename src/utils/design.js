import styled from "@emotion/styled";

export const cart = {
  backgroundColor: "#FF8E78",
  color: "white",
  padding: "5px 10px",
  borderRadius: 0,
  border: 0,
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#df6750",
    borderColor: "white"
  },
};
export const wishlistBtn = {
  padding: "5px 14px",
  borderRadius: 0,
  border: 1,
  borderColor: "#4b38b3",
  fontWeight: 600,
  textTransform: "capitalize",
  color: "#4b38b3",
  "&:hover": {
    backgroundColor: "#4b38b3",
    color: "white",
  },
};

export const instock = {
  backgroundColor: " #FF8E78",
  color: "white",
  padding: "5px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 0,
};

export const outstock = {
  backgroundColor: "#aca3a178",
  color: "#201f1f70",
  padding: "5px 10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 0,
};

export const ratingModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const continueButton = {
  color: "white",
  backgroundColor: "#FF8E78",
  marginRight: "20px",
  borderRadius: 0,
  "&:hover": {
    color: "white",
    backgroundColor: "#df6750",
  },
  mt: { xs: 2, md: 0 },
};

export const checkout = {
  color: "white",
  backgroundColor: "#4b38b3",
  marginRight: "20px",
  borderRadius: 0,
  "&:hover": {
    color: "white",
    backgroundColor: "#4b38b3",
  },
  mt: { xs: 2, md: 0 },
};

export const footerBtn = {
  textTransform: "capitalize",
  fontSize: "14px",
  color: "#e2e2e2",
  fontWeight: 500,
  display: "flex",
  alignItems: "center",
  paddingBottom: "10px",
  "&:hover": {
    color: "#FF8E78",
  },
};

export const successBtn = {
  color: "white",
  backgroundColor: "#45CB85",
  textTransform: "capitalize",
  fontSize: "14px",
  boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
  "&:hover": {
    backgroundColor: "#3bad71",
  },
};
export const dangerBtn = {
  color: "white",
  backgroundColor: "#f06548",
  textTransform: "capitalize",
  fontSize: "14px",
  boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
  "&:hover": {
    backgroundColor: "#f06548",
  },
};

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "80px",
  maxHeight: "80px",
  padding: "10px 0px",
});

export const smallAddBtn = {
  color: "white",
  backgroundColor: "#45CB85",
  padding: "2px",
  textTransform: "capitalize",
  boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
  "&:hover": {
    backgroundColor: "#3bad71",
  },
  fontSize: "13px",
  display: { xs: "initial", lg: "initial", md: "none" },
};

export const smallAddIcon = {
  color: "white",
  backgroundColor: "#45CB85",
  textTransform: "capitalize",
  boxShadow: "0 3px 3px rgba(56,65,74,0.1)",
  minWidth: "0px",
  "&:hover": {
    backgroundColor: "#3bad71",
  },
  display: { lg: "none", xs: "none", md: "initial" },
};

import React from "react";
import { CircleLoader } from "react-spinners";
import { Box } from "@mui/system";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <CircleLoader size={120} color={"#B51BE1"} />
    </Box>
  );
};

export default React.memo(Loading);

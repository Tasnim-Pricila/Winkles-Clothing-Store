import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CommingSoon = () => {
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5"> Comming Soon... </Typography>
    </Box>
  );
};

export default CommingSoon;

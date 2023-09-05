import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  CurrencyExchangeRounded,
  HeadsetMic,
  LocalShippingOutlined,
} from "@mui/icons-material";

const Delivery = () => {
  const delivery = [
    {
      icon: (
        <LocalShippingOutlined sx={{ fontSize: "50px", color: "#FF8E78" }} />
      ),
      title: "FREE SHIPPING, RETURN",
      smallTitle: " Free Shipping On All US Orders",
    },
    {
      icon: (
        <CurrencyExchangeRounded sx={{ fontSize: "50px", color: "#FF8E78" }} />
      ),
      title: "MONEY BACK GUARANTEE",
      smallTitle: "30 Days Money Back Guarantee",
    },
    {
      icon: <HeadsetMic sx={{ fontSize: "50px", color: "#FF8E78" }} />,
      title: "1-800-333-44-55",
      smallTitle: "24/7 Days Support",
    },
  ];
  return (
    <Box sx={{ px: { md: 16, xs: 4 } }} py={16} bgcolor="whitesmoke">
      <Grid container>
        {delivery.map((d, index) => (
          <Grid key={index}
            item
            xs={12}
            md={4}
            sx={{
              borderRight: index !== delivery.length - 1 ? 1 : 0,
              borderColor: "#00000052",
              lineHeight: "20",
            }}
          >
            <Box
              p={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {d?.icon}
              <Typography variant="h6"> {d?.title} </Typography>
              <Typography color="#00000082">{d?.smallTitle}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(Delivery) ;
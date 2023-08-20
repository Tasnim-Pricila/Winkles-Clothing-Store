import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import {
  Email,
  KeyboardArrowUp,
  LocationOn,
  NavigateNext,
  Phone,
} from "@mui/icons-material";
import { footerBtn } from "../../utils/design";

const Footer = () => {
  const style = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    paddingTop: "15px",
  };

  const [goTopBtn, setGoTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setGoTopBtn(true);
      } else {
        setGoTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Box sx={{ py: 10, backgroundColor: "#333333", color: "white" }}>
        <Grid container sx={{ px: { md: 16, xs: 4 } }}>
          <Grid item xs={12} md={6} lg={3} sx={{ mt: { lg: 0, xs: 3 } }}>
            <Typography sx={{ pb: 2 }}>CUSTOMER SERVICE</Typography>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Contact Us
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Returns
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Order History
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Site Map
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Testimonials
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> My Account
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ mt: { lg: 0, xs: 3 } }}>
            <Typography sx={{ pb: 2 }}>EXTRAS</Typography>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Brands
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Gift Certificates
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Affiliates
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Wish List
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Blog
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Specials
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ mt: { lg: 0, xs: 3 } }}>
            <Typography sx={{ pb: 2 }}>CUSTOMER SERVICE</Typography>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> About Us
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Delivery Information
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Privacy Policy
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Terms & Conditions
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Suppliers
            </Link>
            <Link href="#" underline="none" sx={footerBtn}>
              <NavigateNext /> Our Store
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ mt: { lg: 0, xs: 3 } }}>
            <Typography sx={{ pb: 2 }}>CONTACT US</Typography>
            <div style={style}>
              <LocationOn
                sx={{ borderRadius: "50%", p: 1, bgcolor: "#FF8E78" }}
              />
              <Typography>123 Main Street, Anytown, CA 12345 USA</Typography>
            </div>
            <div style={style}>
              <Phone sx={{ borderRadius: "50%", p: 1, bgcolor: "#FF8E78" }} />
              <Typography> +1 800 123 1234 </Typography>
            </div>
            <div style={style}>
              <Email sx={{ borderRadius: "50%", p: 1, bgcolor: "#FF8E78" }} />
              <Typography> abc@example.com </Typography>
            </div>
          </Grid>
        </Grid>
        {goTopBtn && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "fixed",
              right: "30px",
              bottom: "30px",
              cursor: "pointer",
              boxShadow: "0 0 5px rgb(0 0 0 / 20%)",
            }}
            onClick={goToTop}
          >
            <KeyboardArrowUp
              fontSize="large"
              sx={{ color: "#FF8E78", bgcolor: "white", py: 2, px: 2 }}
            ></KeyboardArrowUp>
          </Box>
        )}
      </Box>

      <Grid
        container
        sx={{
          py: 2,
          borderTop: 1,
          borderColor: "#444444",
          backgroundColor: "#555555",
          px: { md: 16, xs: 4 },
          color: "white",
        }}
      >
        <Grid item xs={12} lg={6}>
          <Typography sx={{ textAlign: { xs: "center", lg: "initial" } }}>
            &copy; 2023 Tasnim Pricila. All Rights Reserved.
          </Typography>
        </Grid>
        <Grid
          item
          lg={6}
          sx={{
            display: { xs: "none", lg: "flex" },
            gap: 4,
            justifyContent: "end",
          }}
        >
          <Link href="#" underline="none" sx={footerBtn}>
            OpenCart Extensions
          </Link>
          <Link href="#" underline="none" sx={footerBtn}>
            {" "}
            Responsive Themes
          </Link>
          <Link href="#" underline="none" sx={footerBtn}>
            Premium Themes
          </Link>
          <Link href="#" underline="none" sx={footerBtn}>
            OpenCart Extensions
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;

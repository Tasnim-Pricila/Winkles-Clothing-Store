import React from "react";
import { Box } from "@mui/system";
import one from "../../../images/Brand/brand1.png";
import two from "../../../images/Brand/brand2.png";
import three from "../../../images/Brand/brand3.png";
import four from "../../../images/Brand/brand4.png";
import five from "../../../images/Brand/brand5.png";
import six from "../../../images/Brand/brand6.png";
import Slider from "react-slick";
import "./brand.css";

const Brand = () => {
  const image = [one, two, three, four, five, six, one, two];

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      py={6}
      mb={8}
      sx={{
        borderTop: 1,
        borderBottom: 1,
        borderColor: "#00000052",
        mx: { md: 16, xs: 6 },
      }}
    >
      <Slider {...settings}>
        {image.map((i) => (
          <Box key={i}>
            <div
              style={{
                display: " flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                gap: "200px",
              }}
            >
              <img src={i} alt="" />
            </div>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default React.memo(Brand) ;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { useTheme } from "@mui/material/styles";

const FooterOne = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main,
        color: "white",
        py: 6,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* ... existing code ... */}
        </Grid>
      </Container>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        style={{
          position: "fixed",
          left: "20px",
          bottom: "80px",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
          zIndex: 999,
          backgroundColor: "#25D366",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.1)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <img
          src="/icons/whatsapp.svg"
          alt="WhatsApp"
          style={{
            width: "40px",
            height: "40px",
            filter: "brightness(0) invert(1)",
          }}
        />
      </a>
    </Box>
  );
};

export default FooterOne;

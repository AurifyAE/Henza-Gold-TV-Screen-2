import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Gold from "../assets/gold.png";
import Silver from "../assets/silver.png";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const getBackgroundColor = (change) => {
    if (change === "up") {
      return "#22c55e"; // Green color for increase
    } else if (change === "down") {
      return "#ef4444"; // Red color for decrease
    }
    return "";
  };

  const getBorderColor = (change) => {
    if (change === "up") {
      return "2px solid #22c55e"; // Green color for increase
    } else if (change === "down") {
      return "2px solid #ef4444"; // Red color for decrease
    }
    return "2px solid #D4AF37";
  };

  const renderMetalRow = (metal, data, imageSrc) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        padding: "2rem 2.5rem",
        position: "relative",
        width: "100%",
        minWidth: "570px",
      }}
    >
      {/* BID Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <Typography
          sx={{
            display: metal === "GOLD" ? "block" : "none",
            color: "#D4AF37",
            fontSize: "1.2vw",
            fontWeight: "700",
            letterSpacing: "0.1em",
          }}
        >
          BID
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Box
            sx={{
              backgroundColor: getBackgroundColor(data.bidChanged),
              border: getBorderColor(data.bidChanged),
              borderRadius: "20px",
              width: "19vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: "bold",
              }}
            >
              {data.bid}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "1.1vw",
              fontWeight: "500",
              marginTop: "0.3rem",
              marginLeft: "0.5rem",
            }}
          >
            LOW {data.low}
          </Typography>
        </Box>
      </Box>

      {/* Metal Bar Image */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={`${metal} bar`}
          sx={{
            width: "100px",
            height: "auto",
            filter: "drop-shadow(0 3px 6px rgba(0, 0, 0, 0.6))",
          }}
        />
      </Box>

      {/* ASK Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <Typography
          sx={{
            display: metal === "GOLD" ? "block" : "none",
            color: "#D4AF37",
            fontSize: "1.2vw",
            fontWeight: "700",
            letterSpacing: "0.1em",
          }}
        >
          ASK
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Box
            sx={{
              backgroundColor: getBackgroundColor(data.bidChanged),
              border: getBorderColor(data.bidChanged),
              borderRadius: "20px",
              width: "19vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: "2vw",
                fontWeight: "bold",
              }}
            >
              {data.ask}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: "1.1vw",
              fontWeight: "500",
              marginTop: "0.3rem",
              marginLeft: "0.5rem",
            }}
          >
            HIGH {data.high}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        // padding: "1rem",
        borderRadius: "15px",
        Width: "100%",
        marginTop: "0px",
      }}
    >
      {/* Gold Row */}
      {renderMetalRow("GOLD", goldData, Gold)}

      {/* Divider */}
      <Box
        sx={{
          height: "1px",
          backgroundColor: "#BB9049",
          margin: "0rem 0",
        }}
      />

      {/* Silver Row */}
      {renderMetalRow("SILVER", silverData, Silver)}
    </Box>
  );
};

export default SpotRate;
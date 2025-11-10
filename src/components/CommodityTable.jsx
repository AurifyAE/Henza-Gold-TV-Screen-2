import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  // Helper function to get bid and ask values based on metal type
  const getBidAskValues = (metal) => {
    if (
      metal === "gold" ||
      metal === "gold kilobar" ||
      metal === "gold ten tola"
    ) {
      return {
        bid: parseFloat(goldData.bid) || 0,
        ask: parseFloat(goldData.ask) || 0,
      };
    } else if (metal === "silver") {
      return {
        bid: parseFloat(silverData.bid) || 0,
        ask: parseFloat(silverData.ask) || 0,
      };
    }
    return { bid: 0, ask: 0 };
  };

  // Helper function to calculate purity power
  const calculatePurityPower = (purityInput) => {
    if (!purityInput || isNaN(purityInput)) return 1;
    return purityInput / Math.pow(10, purityInput.toString().length);
  };

  // Helper function to conditionally round values
  const formatValue = (value, weight) => {
    const formattedValue =
      weight === "GM"
        ? value.toFixed(2).toLocaleString()
        : Math.round(value).toLocaleString();
    return formattedValue;
  };

  // Helper function to get the correct metal name
  const getMetalName = (metal) => {
    switch (metal.toLowerCase()) {
      case "gold":
        return "GOLD";
      case "gold kilobar":
        return "GOLD";
      case "gold ten tola":
        return "GOLD";
      default:
        return metal.charAt(0).toUpperCase() + metal.slice(1);
    }
  };

  const getChangeValue = (metalType) => {
    if (metalType === "gold 9999 kg") return { value: 3.50, isPositive: true };
    if (metalType === "gold 9995 kg") return { value: 32.30, isPositive: true };
    if (metalType === "gold ten tola") return { value: 3.00, isPositive: true };
    return { value: 0, isPositive: true };
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {/* Commodity Rate Blocks */}
      {commodities.map((commodity, index) => {
        const { bid, ask } = getBidAskValues(commodity.metal.toLowerCase());
        const {
          unit,
          weight,
          buyCharge,
          sellCharge,
          buyPremium,
          sellPremium,
          purity,
        } = commodity;

        const unitMultiplier =
          {
            GM: 1,
            KG: 1000,
            TTB: 116.64,
            TOLA: 11.664,
            OZ: 31.1034768,
          }[weight] || 1;

        const purityValue = parseFloat(purity) || 0;
        const purityPower = calculatePurityPower(purityValue);
        const buyChargeValue = parseFloat(buyCharge) || 0;
        const sellChargeValue = parseFloat(sellCharge) || 0;
        const buyPremiumValue = parseFloat(buyPremium) || 0;
        const sellPremiumValue = parseFloat(sellPremium) || 0;

        const biddingValue = bid + buyPremiumValue;
        const askingValue = ask + sellPremiumValue;
        const biddingPrice = (biddingValue / 31.103) * 3.674;
        const askingPrice = (askingValue / 31.103) * 3.674;

        const buyPrice =
          biddingPrice * unitMultiplier * unit * purityPower +
          buyChargeValue;
        const sellPrice =
          askingPrice * unitMultiplier * unit * purityPower +
          sellChargeValue;

        const changeInfo = getChangeValue(
          `${commodity.metal.toLowerCase()} ${purity} ${weight}`.trim()
        ); // Pass a unique identifier for change calculation

        return (
          <Box
            key={index}
            sx={{
              backgroundColor: "#000000",
              borderRadius: "10px",
              padding: "4px 30px",
              border: "1px solid #D1A44F",
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '30px',
            }}
          >
            {/* Commodity Name and Purity/Weight */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flex: '1',
              minWidth: '150px'
            }}>
              <Typography
                sx={{
                  color: "#D1A44F",
                  fontWeight: "bold",
                  fontSize: "1vw",
                  textAlign: "left",
                  letterSpacing: "0.5px"
                }}
              >
                {getMetalName(commodity.metal)}{" "}
                {commodity.metal.toLowerCase() === "gold ten tola"
                  ? "TEN TOLA"
                  : purity}{" "}
                {weight}
              </Typography>
            </Box>

            {/* BID and ASK Container */}
            <Box sx={{
              display: 'flex',
              gap: '40px',
              alignItems: 'center',
              flex: '1',
              justifyContent: 'flex-end'
            }}>
              {/* BID Section */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '80px'
              }}>
                <Typography sx={{
                  color: "#FFFFFF",
                  fontSize: "1vw",
                  textAlign: "center",
                  marginBottom: "0px",
                  fontWeight: "500"
                }}>
                  BID (AED)
                </Typography>
                <Typography sx={{
                  color: "#D1A44F",
                  fontWeight: "bold",
                  fontSize: "1.2vw",
                  textAlign: "center",
                  letterSpacing: "0.5px"
                }}>
                  {formatValue(buyPrice, weight)}
                </Typography>
              </Box>

              {/* ASK Section */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '80px'
              }}>
                <Typography sx={{
                  color: "#FFFFFF",
                  fontSize: "1vw",
                  textAlign: "center",
                  marginBottom: "0px",
                  fontWeight: "500"
                }}>
                  ASK (AED)
                </Typography>
                <Typography sx={{
                  color: "#D1A44F",
                  fontWeight: "bold",
                  fontSize: "1.2vw",
                  textAlign: "center",
                  letterSpacing: "0.5px"
                }}>
                  {formatValue(sellPrice, weight)}
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CommodityTable;
import React, { useEffect, useRef, memo } from 'react';
import { Box } from '@mui/material';

function TradingViewWidget() {
  const container = useRef();

  useEffect(() => {
    // Clear any existing content
    if (container.current) {
      container.current.innerHTML = '';
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "allow_symbol_change": false,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": true,
        "hide_top_toolbar": false,
        "hide_legend": true,
        "hide_volume": true,
        "hotlist": false,
        "interval": "60",
        "locale": "en",
        "save_image": false,
        "style": "1",
        "symbol": "CAPITALCOM:GOLD",
        "theme": "dark",
        "timezone": "Etc/UTC",
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "gridColor": "rgba(209, 164, 79, 0.1)",
        "watchlist": [],
        "withdateranges": true,
        "compareSymbols": [],
        "studies": [],
        "autosize": true,
        "width": "100%",
        "height": "100%",
        "container_id": "tradingview_chart"
      }`;
    
    if (container.current) {
      container.current.appendChild(script);
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        marginTop: "20px",
      }}
    >
      {/* Chart Container with Custom Styling */}
      <Box
        sx={{
          padding: "16px 0px",
          overflow: "hidden",
          position: "relative",
          minHeight: "400px",
        }}
      >
        {/* Custom Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
            padding: "0 4px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                width: "4px",
                height: "20px",
                backgroundColor: "#C79324",
                borderRadius: "2px",
              }}
            />
            <Box>
              <Box
                sx={{
                  color: "#C79324",
                  fontSize: "1rem",
                  fontWeight: "700",
                  letterSpacing: "0.05em",
                }}
              >
                GOLD CHART
              </Box>
              {/* <Box
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                }}
              >
                Live Candlestick Analysis
              </Box> */}
            </Box>
          </Box>
          
          {/* Live Indicator */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              borderRadius: "20px",
              padding: "4px 10px",
            }}
          >
            <Box
              sx={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 10px rgba(34, 197, 94, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(34, 197, 94, 0)",
                  },
                },
              }}
            />
            <Box
              sx={{
                color: "#22c55e",
                fontSize: "0.6rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              LIVE
            </Box>
          </Box>
        </Box>

        {/* TradingView Chart Container */}
        <Box
          ref={container}
          sx={{
            height: "380px",
            width: "100%",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "transparent",
            position: "relative",
            "& .tradingview-widget-container": {
              height: "100% !important",
              width: "100% !important",
              backgroundColor: "transparent !important",
            },
            "& .tradingview-widget-container__widget": {
              height: "calc(100% - 20px) !important",
              width: "100% !important",
              backgroundColor: "transparent !important",
            },
            "& .tradingview-widget-copyright": {
              display: "none !important", // Hide the copyright for cleaner look
            },
            // Custom scrollbar styling
            "& ::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "& ::-webkit-scrollbar-track": {
              background: "rgba(209, 164, 79, 0.1)",
              borderRadius: "3px",
            },
            "& ::-webkit-scrollbar-thumb": {
              background: "#D1A44F",
              borderRadius: "3px",
              "&:hover": {
                background: "rgba(209, 164, 79, 0.8)",
              },
            },
          }}
        />
      </Box>

      {/* Chart Information Footer */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "12px",
          padding: "8px 4px",
        }}
      >
        <Box
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.7rem",
            fontStyle: "italic",
          }}
        >
          Chart powered by TradingView • Real-time data
        </Box>
        <Box
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "0.7rem",
            fontStyle: "italic",
          }}
        >
          Last updated: {new Date().toLocaleTimeString()}
        </Box>
      </Box> */}
    </Box>
  );
}

export default memo(TradingViewWidget);
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LimitExceededModal from "../components/LimitExceededModal";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import HenzaGold from "../assets/henza-gold.png";
import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";
import VideoPlayer from "../components/VideoPlayer";
import TradingView from "../components/TradingView";

function TvScreen() {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [serverURL, setServerURL] = useState("");
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [commodities, setCommodities] = useState([]);
  const [goldBidSpread, setGoldBidSpread] = useState("");
  const [goldAskSpread, setGoldAskSpread] = useState("");
  const [silverBidSpread, setSilverBidSpread] = useState("");
  const [silverAskSpread, setSilverAskSpread] = useState("");
  const [symbols, setSymbols] = useState(["GOLD", "SILVER"]);
  const [error, setError] = useState(null);

  const { updateMarketData } = useSpotRate();
  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  updateMarketData(
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spotRatesRes, serverURLRes, newsRes] = await Promise.all([
          fetchSpotRates(adminId),
          fetchServerURL(),
          fetchNews(adminId),
        ]);

        const {
          commodities,
          goldBidSpread,
          goldAskSpread,
          silverBidSpread,
          silverAskSpread,
        } = spotRatesRes.data.info;
        setCommodities(commodities);
        setGoldBidSpread(goldBidSpread);
        setGoldAskSpread(goldAskSpread);
        setSilverBidSpread(silverBidSpread);
        setSilverAskSpread(silverAskSpread);

        const { serverURL } = serverURLRes.data.info;
        setServerURL(serverURL);

        setNews(newsRes.data.news.news);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    fetchTVScreenData(adminId)
      .then((response) => {
        if (response.status === 200) {
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true);
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  useEffect(() => {
    if (serverURL) {
      const socket = io(serverURL, {
        query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("market-data", (data) => {
        if (data && data.symbol) {
          setMarketData((prevData) => ({
            ...prevData,
            [data.symbol]: {
              ...prevData[data.symbol],
              ...data,
              bidChanged:
                prevData[data.symbol] && data.bid !== prevData[data.symbol].bid
                  ? data.bid > prevData[data.symbol].bid
                    ? "up"
                    : "down"
                  : null,
            },
          }));
        }
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        setError("An error occurred while receiving data");
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [serverURL, symbols]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ minHeight: "100vh", color: "white", overflow: "hidden" }}>
      {/* ✅ Background Video (fixed layering) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        id="background-video"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* ✅ Foreground content */}
      <Box sx={{ position: "relative", zIndex: 2, padding: "20px" }}>
        <Box className="flex flex-row items-center justify-between">
          <Box
            className="flex flex-col items-center justify-between"
            sx={{
              background: "rgba(0, 0, 0, 2)",
              padding: "40px 40px",
              borderRadius: "20px",
            }}
          >
            <img src={HenzaGold} alt="" className="w-56 h-64" />
          </Box>

          <SpotRate />
        </Box>

        <Box className="flex flex-row justify-between items-center mt-10 gap-4" sx={{
          backgroundColor: "#000000",
          marginTop: "20px",
          padding: "15px",
          borderRadius: "20px",
        }}>
          <Box className="flex flex-row width-[30%] mt-6">
            {/* Commodity Table */}
            <CommodityTable commodities={commodities} />
          </Box>

          <VideoPlayer /> {/* Plays news video */}
        </Box>

        <Box>
          <TradingView />
        </Box>

        {/* Conditional Modal */}
        {showLimitModal && <LimitExceededModal />}
      </Box>
    </Box>
  );
}

export default TvScreen;

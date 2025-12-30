import { useEffect, useState } from "react";
import { SpotRateProvider } from "./context/SpotRateContext";
import "./App.css";
import TvScreen from "./pages/tvscreenView";

function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 468;
      const baseHeight = 625;
      const scaleWidth = window.innerWidth / baseWidth;
      const scaleHeight = window.innerHeight / baseHeight;
      const newScale = Math.min(scaleWidth, scaleHeight);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <SpotRateProvider>
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: "468px",
          height: "625px",
          overflow: "hidden",
        }}
      >
        <TvScreen />
      </div>
    </SpotRateProvider>
  );
}

export default App;

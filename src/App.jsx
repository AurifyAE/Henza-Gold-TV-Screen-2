import { useEffect, useState } from "react";
import { SpotRateProvider } from "./context/SpotRateContext";
import TvScreen from "./pages/tvscreenView";
import "./App.css";

const BASE_WIDTH = 468;
const BASE_HEIGHT = 625;

function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / BASE_WIDTH;
      const scaleY = window.innerHeight / BASE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <SpotRateProvider>
      <div className="led-wrapper">
        <div
          className="led-screen"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <TvScreen />
        </div>
      </div>
    </SpotRateProvider>
  );
}

export default App;

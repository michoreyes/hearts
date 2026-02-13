import { useEffect, useRef, useState } from "react";
import kiss from "./assets/kiss.mp4";

const App = () => {
  const canvasRef = useRef(null);
  const bannerRef = useRef(null);
  const starsRef = useRef([]);
  const intervalRef = useRef(null);

  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const banner = bannerRef.current;
    if (!canvas || !banner) return;
    const context = canvas.getContext("2d");

    function resizeCanvas() {
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize stars
    starsRef.current = [];
    for (let i = 0; i < 200; i++) {
      starsRef.current.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        change: 0.15,
      });
    }

    function update() {
      for (const star of starsRef.current) {
        // Only twinkle (change size) randomly
        if (Math.random() > 0.85) {
          // ~15% chance to twinkle per frame
          if (star.size < 0.1) {
            star.change = 0.1;
          } else if (star.size > 0.9) {
            star.change = -0.1;
          }
          star.size += star.change;
        }
      }
    }

    function render() {
      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);
      for (const star of starsRef.current) {
        context.beginPath();
        context.arc(
          star.x * width,
          star.y * height,
          star.size * 1.5, // smaller stars
          0,
          2 * Math.PI,
          false,
        );
        context.fillStyle = "white";
        context.fill();
      }
    }

    function twinkle() {
      update();
      render();
    }

    intervalRef.current = setInterval(twinkle, 20);
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      id="banner"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        background: "black",
      }}
    >
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <h1 className="sm:text-5xl text-3xl font-semibold text-val text-center mt-10 drop-shadow-lg font-koryan">
          Happy Valentines Day by!
        </h1>

        <div
          style={{
            marginTop: 32,
            background: "rgba(255,255,255,0.85)",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
            padding: "clamp(20px, 5vw, 32px)",
            maxWidth: 500,
            width: "90%",
            minHeight: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {showGif && (
            <>
              <div
                onClick={() => setShowGif(false)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9,
                  cursor: "pointer",
                }}
              />
              <video
                src={kiss}
                alt="Kiss"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "clamp(200px, 60vw, 350px)",
                  maxWidth: "90%",
                  height: "auto",
                  borderRadius: 8,
                  zIndex: 10,
                }}
                autoPlay
                muted
              />
            </>
          )}
          <p
            style={{
              width: "100%",
              minHeight: 180,
              resize: "vertical",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "Nanum Pen Script, cursive",
              fontSize: "clamp(17px, 4vw, 22px)",
              color: "#222",
              lineHeight: 1,
              padding: 5,
            }}
          >
            Hi baby ko, Happy Hearts Day! I just want to say how thankful I am
            dahil dumating ka sa buhay ko. Thank you for choosing me. For
            understanding me lalo kapag hindi ko maintindihan minsan ang mga
            bagay bagay. For loving me so much. Ramdam na ramdam ko by kung
            gaano mo ko kamahal.
            <br />
            <br />
            Kahit di tayo magkasama ngayong valentines by. I'm here para sabihin
            na lagi kitang pipiliin and sobrang naappreciate kita. <br />
            <br /> I love you by. Always and in all ways&#10084;.
          </p>
          <button
            className="bg-red-300 p-3 rounded-xl font-koryan text-2xl mt-2 hover:bg-red-500"
            onClick={() => setShowGif(true)}
          >
            Click Me &#128536;!
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

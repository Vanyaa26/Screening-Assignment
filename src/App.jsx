// App.jsx
import { useEffect, useState } from "react";
import YoutubeVideo from "./Components/YoutubeVideo";
import PDFViewer from "./Components/PDFViewer";
import MCQ from "./Components/MCQ";

function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    // Disable right-click
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);

    // Disable double-click on sensitive elements
    const disableDoubleClick = (e) => {
      if (e.target.closest(".no-select")) e.preventDefault();
    };
    document.addEventListener("dblclick", disableDoubleClick);

    // Simulate screenshot overlay
    const triggerOverlayForScreenshot = () => {
      setIsBlurred(true);
      setTimeout(() => {
        setIsBlurred(false);
      }, 8000); // Overlay stays for 4 seconds
    };

    // Detect suspicious key combinations
    const detectScreenshotKeys = (e) => {
      const key = e.key.toLowerCase();
      const isMacScreenshot = e.metaKey && e.shiftKey && ["3", "4", "5"].includes(key);
      const isPrintScreen = e.keyCode === 44;

      const isInspectShortcut =
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.metaKey && e.altKey && ["i", "j", "c"].includes(key)) ||
        (e.ctrlKey && ["u", "s", "p"].includes(key)) ||
        (e.metaKey && ["u", "s", "p"].includes(key));

      if (isMacScreenshot || isPrintScreen || isInspectShortcut) {
        e.preventDefault();
        triggerOverlayForScreenshot();
      }
    };

    // Blur again if user switches tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsBlurred(true);
      } else {
        setTimeout(() => setIsBlurred(false), 3000);
      }
    };

    // Flickering watermark
    const flickerInterval = setInterval(() => {
      setOverlayVisible((prev) => !prev);
    }, 800);

    document.addEventListener("keydown", detectScreenshotKeys);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("dblclick", disableDoubleClick);
      document.removeEventListener("keydown", detectScreenshotKeys);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <div className="relative bg-white min-h-screen overflow-hidden select-none">
      {/* 🔐 Watermark */}
      {overlayVisible && (
        <div
          className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center opacity-10 rotate-45 text-5xl font-extrabold text-red-500"
          style={{ transition: "opacity 0.3s" }}
        >
          Protected Content — IITM ⚠️
        </div>
      )}

      {/* 🚫 Screenshot Overlay */}
      {isBlurred && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/70 flex items-center justify-center">
          <p className="text-white text-2xl font-semibold text-center px-6">
            🚫 Screenshot detected. Access temporarily blocked.
          </p>
        </div>
      )}

      {/* ✅ Main Content */}
      <div className="relative z-10 p-6 max-w-5xl mx-auto space-y-10">
        <YoutubeVideo />
        <div className="no-select">
          <PDFViewer />
        </div>
        <MCQ />
      </div>
    </div>
  );
}

export default App;

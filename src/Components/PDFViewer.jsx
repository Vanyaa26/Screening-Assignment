import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import required styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    toolbarPlugin: {
        fullScreenPlugin: { enableFullScreen: false },
        openPlugin: { enableOpen: false },
        printPlugin: { enablePrint: false },
        downloadPlugin: { enableDownload: false },
        searchPlugin: { enableSearch: false }, // Optional: disables the search icon
    }
  });

  return (
    <div className="my-8 px-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">PDF Section</h2>

      <div className="shadow-lg border rounded overflow-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">

      <Viewer fileUrl="/sample.pdf" />

        </Worker>
      </div>
    </div>
  );
};

export default PDFViewer;

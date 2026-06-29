"use client";
import React, { useState, useCallback } from "react";
import jsPDF from "jspdf";

const POINTS_PER_INCH = 72;
const PIXELS_PER_INCH = 96;
const PX_TO_PT = POINTS_PER_INCH / PIXELS_PER_INCH;

export default function FileUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [imageSelected, setImageSelected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setImage((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
      setImageSelected(true);
      setError(null);
    },
    []
  );

  const handleFileNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileName(e.target.value);
    },
    []
  );

  const converToPdf = useCallback(() => {
    if (!image || isConverting) return;

    setIsConverting(true);
    setError(null);

    const img = new Image();
    img.src = image;

    img.onload = () => {
      try {
        const widthPt = img.naturalWidth * PX_TO_PT;
        const heightPt = img.naturalHeight * PX_TO_PT;

        const pdf = new jsPDF({
          orientation: widthPt > heightPt ? "landscape" : "portrait",
          unit: "pt",
          format: [widthPt, heightPt],
        });

        pdf.addImage(image, "JPEG", 0, 0, widthPt, heightPt);

        const filename =
          fileName.trim() === "" ? "mypdf.pdf" : `${fileName.trim()}.pdf`;
        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.download = filename;
        link.href = url;
        link.click();

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);

        URL.revokeObjectURL(image);
        setImage(null);
        setFileName("");
        setImageSelected(false);
      } catch (err) {
        setError("Failed to convert image to PDF. Please try a different image.");
        console.error("PDF conversion error:", err);
      } finally {
        setIsConverting(false);
      }
    };

    img.onerror = () => {
      setError("Failed to load the selected image. Please try again.");
      setIsConverting(false);
    };
  }, [image, fileName, isConverting]);

  return (
    <>
      <div className="mycontainer mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Image to PDF Converter
        </h2>
        {error && (
          <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
        )}
        <div className="input-container flex flex-col items-center gap-4">
          <div className="custom-file-input-container">
            <label htmlFor="file-input" className="custom-file-input text-white" />
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="mainInput border p-2 rounded bg-gray-700 text-white w-full"
              onChange={handleImageChange}
              disabled={isConverting}
            />
          </div>
          {imageSelected && (
            <>
              <div className="preview-container w-full">
                {/* next/image does not support blob object URLs — regular img is correct here */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="preview-image max-w-full h-auto border p-2 rounded bg-gray-700 w-full"
                  alt="Selected preview"
                  src={image ?? undefined}
                />
              </div>
              <div className="file-name-input-container w-full">
                <input
                  placeholder="Enter File Name"
                  id="file-name-input"
                  type="text"
                  className="border p-2 rounded bg-gray-700 text-white w-full disabled:opacity-50"
                  value={fileName}
                  onChange={handleFileNameChange}
                  disabled={isConverting}
                />
              </div>
              <button
                className="convert-button bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-600 disabled:hover:bg-blue-500 transition-colors"
                onClick={converToPdf}
                disabled={isConverting}
                aria-busy={isConverting}
              >
                {isConverting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Converting…
                  </>
                ) : (
                  "Download PDF File"
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

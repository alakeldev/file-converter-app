"use client";
import React, { useState, useCallback } from 'react';
import jsPDF from "jspdf";

const POINTS_PER_INCH = 72;
const PIXELS_PER_INCH = 96;
const PX_TO_PT = POINTS_PER_INCH / PIXELS_PER_INCH;

const FileUpload = () => {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [imageSelected, setImageSelected] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file);
        });
        setImageSelected(true);
        setError(null);
    }, []);

    const handleFileNameChange = useCallback((e) => {
        setFileName(e.target.value);
    }, []);

    const converToPdf = useCallback(() => {
        if (!image) return;

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

                const filename = fileName.trim() === "" ? "mypdf.pdf" : `${fileName.trim()}.pdf`;
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
            }
        };
        img.onerror = () => {
            setError("Failed to load the selected image. Please try again.");
        };
    }, [image, fileName]);

  return (
    <>
      <div className="mycontainer mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Image to PDF Converter</h2>
        {error && (
          <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
        )}
        <div className="input-container flex flex-col items-center gap-4">
          <div className="custom-file-input-container">
            <label htmlFor="file-input" className="custom-file-input text-white"></label>
            <input id="file-input" type="file" accept="image/*" className="mainInput border p-2 rounded bg-gray-700 text-white w-full" onChange={handleImageChange}/>
          </div>
          {imageSelected && (
            <>
            <div className="preview-container w-full">
                <img className="preview-image max-w-full h-auto border p-2 rounded bg-gray-700 w-full" alt="Selected preview" src={image} />
            </div>
            <div className="file-name-input-container w-full">
                <input placeholder="Enter File Name" id="file-name-input" type="text" className="border p-2 rounded bg-gray-700 text-white w-full" value={fileName} onChange={handleFileNameChange}/>
            </div>
            <button className="convert-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 w-full sm:w-auto" onClick={converToPdf}>Download PDF File</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FileUpload;

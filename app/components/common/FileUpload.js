"use client";
import React, {useState} from 'react';
import jsPDF from "jspdf";

const FileUpload = () => {
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [imageSelected, setImageSelected] = useState(false);
    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageSelected(true);
    }
    const handleFileNameChange = (e) => {
        setFileName(e.target.value)
    }
    const converToPdf = () => {
        const img = new Image()
        img.src = image;
        img.onload = () => {
            const pdf = new jsPDF("p", "mm", [img.width, img.height]);

            if (img.width > pdf.internal.pageSize.getWidth()) {
                const ratio = pdf.internal.pageSize.getWidth() / img.width;
                const height = img.height * ratio;
                pdf.addImage(image, "JPEG", 0, 0, pdf.internal.pageSize.getWidth(), height);
            } else {
                pdf.addImage(image, "JPEG", 0, 0, img.width, img.height);
            }

            const filename = fileName === "" ? "mypdf.pdf" : `${fileName}.pdf`;
            const blob = pdf.output("blob");
            const url = URL.createObjectURL(blob);
            

            const link = document.createElement("a");
            link.download = filename;
            link.href = url;
            link.click();


            setTimeout(() => {
                URL.revokeObjectURL(url);
                setImage(null);
                setFileName("");
                setImageSelected(false)
            }, 100)
        }
    }

  return (
    <>
      <div className="mycontainer mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Image to PDF Converter</h2>
        <div className="input-container flex flex-col items-center gap-4">
          <div className="custom-file-input-container">
            <label htmlFor="file-input" className="custom-file-input text-white"></label>
            <input id="file-input" type="file" accept="image/*" className="mainInput border p-2 rounded bg-gray-700 text-white w-full" onChange={handleImageChange}/>
          </div>
          {imageSelected && (
            <>
            <div className="preview-container w-full">
                <img className="preview-image max-w-full h-auto border p-2 rounded bg-gray-700 w-full" alt="Selected" src={image} />
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

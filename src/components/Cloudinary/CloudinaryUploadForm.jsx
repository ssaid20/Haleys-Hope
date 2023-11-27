import { useState } from "react";
import { useScript } from "../../hooks/useScript";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

function CloudifyUploadForm({ onImageUpload }) {
  // Accepting the callback function as a prop
  const [state, setState] = useState({
    file_url: null,
    file_type: "image",
    description: "",
  });

  const openWidget = () => {
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ["local", "url", "camera"],
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              setState({
                ...state,
                file_url: result.info.secure_url,
              });
              onImageUpload(result.info.secure_url); // Call the callback function with the image URL
            }
          }
        )
        .open();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!state.file_url) {
      alert("Please select a file for upload"); // Replace with your alert mechanism
    }
  };

  return (
    <div className="">
      <form onSubmit={onSubmit} className="">
        {useScript("https://widget.cloudinary.com/v2.0/global/all.js")}
        <div>
          <button
            type="button"
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2"
            onClick={openWidget}
          >
            <img
              src="/assets/icons/upload.svg"
              alt="Upload Icon"
              className="w-4 h-4"
            />
            <span>Pick File</span>
          </button>
        </div>

        {/* {state.file_url && (
          <div className="pt-4">
            <p className="text-sm text-gray-600">Uploaded Image URL: <a href={state.file_url} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{state.file_url}</a></p>
            <img src={state.file_url} alt="Uploaded" className="max-w-xs mt-2 rounded"/>
          </div>
        )} */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <input type="text" className="mt-1 block w-full border border-gray-300 bg-white py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={(e) => setState({ ...state, description: e.target.value })} value={state.description} />
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Submit Image</button>
        </div> */}
      </form>
    </div>
  );
}

export default CloudifyUploadForm;

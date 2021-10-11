import React from "react";
import { CameraIcon } from "@heroicons/react/solid";

const UploadImg = ({ setFile, file }) => {
  return (
    <div
      className={`absolute left-24 bg-white hover:bg-gray-200 rounded-full text-center shadow-md text-green-400 ${
        file ? "bottom-16" : "bottom-5"
      }`}
    >
      <label htmlFor="file">
        <CameraIcon className="h-8 p-1 rounded-full cursor-pointer" />
        <input
          className="hidden"
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
    </div>
  );
};

export default UploadImg;

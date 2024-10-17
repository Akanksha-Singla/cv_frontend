import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useUploadCVImageMutation } from '../../apis/cvapi';
import '../../styles/form.css';

const ImageUpload = () => {
  const [uploadCVImage] = useUploadCVImageMutation();
  const { _id } = useParams();
  const cvId = useSelector((state: any) => state.cv.cvId);
  const file = useRef(null);

  const getFile = (event: any) => {
    event.preventDefault();
    file.current = event.target.files[0];
  };

  const upload = async (event: any) => {
    event.preventDefault();
    console.log("upload called", file.current);

    if (file.current !== undefined && file.current !== null) {
      const idToUse = _id || cvId;

      try {
        const res = await uploadCVImage({ _id: idToUse, cvImage: file.current });
        console.log("response in imageUpload", res);
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
  };

  return (
    <div className="formContainer">
      <form className="form" onSubmit={upload}>
        <label htmlFor="cvImage">
          Upload Image
        </label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={getFile}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ImageUpload;

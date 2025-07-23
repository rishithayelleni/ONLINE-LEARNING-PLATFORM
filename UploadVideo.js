import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    const storageRef = ref(storage, `videos/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setUrl(downloadURL);
    alert("Uploaded!");
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      {url && (
        <video src={url} controls width="600" />
      )}
    </div>
  );
}

export default UploadVideo;

"use client"
import React , {useState} from "react";

export default function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  

  // Function to handle file selection
  const handleFileChange = (e) => {
    const files = e.target.files;
    console.log(files)
    const fileNames = [];

    // Iterate through selected files and extract their names and extensions
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i].name;
      fileNames.push(fileName);
    }

    // Update the state with the selected file names
    setSelectedFiles(fileNames);
  };

  const DelFile = (e) =>{
    console.log('clicked')
    const updatedFIles = selectedFiles.filter((file) => file.name == e.target.textContent)
    console.log(updatedFIles)
    setSelectedFiles(updatedFIles)
  }

  return (
    <div>
      <input
        name="image-submission"
        type="file"
        multiple
        accept="image/png, image/jpeg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <div>
        <p>Uploaded Files:</p>
        <ul>
          {selectedFiles.map((fileName, index) => (
            <li key={index} onClick={DelFile}>{fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useRef } from "react";
import createFileList from "create-file-list";
import FilePreview from "@/components/FilePreview";
import DropZone from "@/components/DropZone";

function HomePage() {
  const [files, setFiles] = useState([]);
  const dndRef = useRef(null);
  const [fileDragging, setFileDragging] = useState(null);
  const [fileDropping, setFileDropping] = useState(null);

  const remove = (index) => {
    let updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const dragenter = (e) => {
    let targetElem = e.target.closest("[draggable]");
    setFileDropping(targetElem.getAttribute("data-index"));
  };

  const dragstart = (e) => {
    setFileDragging(e.target.closest("[draggable]").getAttribute("data-index"));
    e.dataTransfer.effectAllowed = "move";
  };

  const loadFile = (file) => {
    const previewElements = document.querySelectorAll(".preview");
    const blobUrl = URL.createObjectURL(file);

    previewElements.forEach((elem) => {
      elem.onload = () => {
        URL.revokeObjectURL(elem.src); // free memory
      };
    });

    return blobUrl;
  };

  const addFiles = (e) => {
    const updatedFiles = createFileList([...files], [...e.target.files]);
    setFiles(updatedFiles);
  };

  const onDrop = (e) => {
    e.preventDefault();
    dndRef.current.classList.remove("border-blue-400");
    dndRef.current.classList.remove("ring-4");
    dndRef.current.classList.remove("ring-inset");

    // Extract the files from the DataTransfer object and create a custom array
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file instanceof File
    );
    const updatedFiles = createFileList([...files], droppedFiles);
    setFiles(updatedFiles);
  };

  const onDragEnter = (e) => {
    e.preventDefault();
    dndRef.current.classList.add("border-blue-400");
    dndRef.current.classList.add("ring-4");
    dndRef.current.classList.add("ring-inset");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    dndRef.current.classList.remove("border-blue-400");
    dndRef.current.classList.remove("ring-4");
    dndRef.current.classList.remove("ring-inset");
  };

  return (
    <div className="bg-white p7 rounded w-9/12 mx-auto">
      <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
        <DropZone
          dndRef={dndRef}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          addFiles={addFiles}
        />

        {files.length > 0 && (
          <div
            className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6"
            onDragOver={(e) => e.preventDefault()}
          >
            {Array.from({ length: files.length }).map((_, index) => (
              <FilePreview
                key={index}
                dragstart={dragstart}
                dragenter={dragenter}
                loadFile={loadFile}
                files={files}
                setFileDropping={setFileDropping}
                fileDropping={fileDropping}
                fileDragging={fileDragging}
                setFileDragging={setFileDragging}
                remove={remove}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

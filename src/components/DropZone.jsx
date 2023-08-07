import React from "react";

const DropZone = ({ dndRef, onDrop, onDragLeave, onDragEnter, addFiles }) => {
  return (
    <div
      ref={dndRef}
      className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer"
      onDrop={onDrop}
      onDragLeave={onDragLeave} // Use onDragLeave event directly
      onDragEnter={onDragEnter} // Use onDragEnter event directly
      onDragOver={(e) => e.preventDefault()} // Prevent default drag over behavior
    >
      <input
        accept="*"
        type="file"
        multiple
        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
        onChange={addFiles}
        title=""
      />

      <div className="flex flex-col items-center justify-center py-10 text-center">
        <svg
          className="w-6 h-6 mr-1 text-current-50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="m-0">Drag your files here or click in this area.</p>
      </div>
    </div>
  );
};

export default DropZone;

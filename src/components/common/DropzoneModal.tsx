import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./styles/dropzone.module.scss";
import { firebaseInstance } from "../../config/firebase.config";

type DropzoneProps = {
  config?: {};
  setFile: (file: any) => void;
};

function Dropzone({ config, setFile }: DropzoneProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    if (acceptedFiles.length === 1) {
      setFileName(acceptedFiles[0].name);
      setFile(acceptedFiles[0]);
    } else {
      setFileName(`Multiple files`);
      setFile(acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
    ...config,
  });

  return (
    <div {...getRootProps()} className={classes.dropzoneContainer}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>{fileName ? fileName : "Click to select file"}</p>
      )}
    </div>
  );
}

export default Dropzone;

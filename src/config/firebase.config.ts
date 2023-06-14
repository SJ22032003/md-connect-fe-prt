import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu7GDsBKZC9-U-22jGqYWM_Z8i03fDZeM",
  authDomain: "medi-connect-hackathon.firebaseapp.com",
  projectId: "medi-connect-hackathon",
  storageBucket: "medi-connect-hackathon.appspot.com",
  messagingSenderId: "713205656852",
  appId: "1:713205656852:web:9d150ba497df21c6b7a601",
};

export const firebaseInstance = {
  app: initializeApp(firebaseConfig),
  storage: getStorage(initializeApp(firebaseConfig)),
  storageRef: (path: string = "files/") =>
    ref(getStorage(initializeApp(firebaseConfig)), path),
  uploadBytes: (ref: any, file: any) => uploadBytes(ref, file),
  uploadUrl: (ref: any) => getDownloadURL(ref),
  deleteFile: (ref: any) => deleteObject(ref),
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjmeYzqv9MdEb3um5uLLtlwFBIIRE2e5E",
  authDomain: "ai-gittalk.firebaseapp.com",
  projectId: "ai-gittalk",
  storageBucket: "ai-gittalk.firebasestorage.app",
  messagingSenderId: "784862334984",
  appId: "1:784862334984:web:617c719ec8c1d0511e81bd",
  measurementId: "G-9R69E64P7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file:File, setProgress?: (progress:number)=>void) {
    return new Promise((resolve, reject)=>{
        try{
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed", (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                if(setProgress) setProgress?.(progress)
                    switch(snapshot.state){
                        case "paused":
                            console.log("Upload is paused")
                            break
                        case "running":
                            console.log("Upload is running")
                            break

                    }
            }, (error)=>{
                reject(error)
            }, ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    resolve(downloadUrl as string)
                })
            })
        }catch(error){
            console.error(error)
            reject(error)
        }
    })
}


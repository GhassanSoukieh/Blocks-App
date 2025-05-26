import { database } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const add = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const get = async (collectionName: any) => {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
};

const db = { get, add };
export default db;

import { database } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

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
const deleteData = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
const update = async (collectionName: string, id: string, data: any) => {
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, data);
    console.log("Document updated with ID: ", id);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

const db = { get, add, deleteData, update };
export default db;

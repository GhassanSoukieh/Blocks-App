import { database } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Content } from "./src/Types";
import { fetchAndFilterContentByDate } from "./src/Functions/DateFunctions";

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
  const confirmed = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (!confirmed) return;

  try {
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);

    console.log("Document deleted with ID: ", id);
  } catch (error) {
    window.alert("Error deleting document.");
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

const getDataForDate = async (date: Date): Promise<Content[]> => {
  const collectionName = "Content";
  try {
    const allData = await get(collectionName);
    console.log("Data fetched for date: ", date);
    const results = fetchAndFilterContentByDate(date);
    return results;
  } catch (error) {
    console.error("Error fetching data for date: ", error);
    return [];
  }
};

const db = { get, add, deleteData, update };
export default db;

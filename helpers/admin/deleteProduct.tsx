import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { db, storage } from "../firebase/firebaseConfig";

export const deleteItem = async (dbRef: string, id: string) => {
  const userValidation = window.confirm(
    "Are you sure you want to delete this item ?"
  );

  if (userValidation) {
    await deleteDoc(doc(db, `/${dbRef}/${id}`));
    if (dbRef === "cars") {
      await deleteObject(ref(storage, `${id}/carImage`));
      await deleteObject(ref(storage, `${id}/carBrandImage`));
    }
    if (typeof window !== "undefined") {
      window.location.href = "/admin";
    }
  }
};

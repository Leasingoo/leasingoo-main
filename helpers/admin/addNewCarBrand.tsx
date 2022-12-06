import { doc, setDoc } from "firebase/firestore";
import { additionalFieldsType } from "../../types/additionalFieldsType";
import { db } from "../firebase/firebaseConfig";
import { generateId } from "./generateId";

export const addNewCarBrand = async (
  additionalFields: additionalFieldsType[],
  productID: string,
  setBeginProcess: (something: boolean) => void,
  router: any
) => {
  const id = productID !== "new" ? productID : generateId();

  if (additionalFields.length > 0) {
    setBeginProcess(true);

    let additionalFieldsObject: any = {};

    additionalFields.forEach((field) => {
      if (field.key !== "id") {
        additionalFieldsObject[field.key] = field;

        if (field.disabled === undefined) {
          additionalFieldsObject[field.key].disabled = false;
        }
      }
    });

    await setDoc(doc(db, `/carBrands/${id}`), {
      id: {
        key: "id",
        value: id,
        order: 0,
      },
      ...additionalFieldsObject,
    });

    console.log("done");
    setBeginProcess(false);

    if (productID !== "new") {
      alert("Changes saved");
    } else {
      router.push("/admin");
    }
  }
};

import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { additionalFieldsType } from "../../types/additionalFieldsType";
import { db, storage } from "../firebase/firebaseConfig";
import { generateId } from "./generateId";

let carImageLink = "";
let carBrandImageLink = "";

const uploadImage = async (file: any, type: string, id: string) => {
  if (file) {
    await uploadBytes(ref(storage, `${id}/${type}`), file).then(
      async (snapchot) => {
        await getDownloadURL(snapchot.ref).then((downloadURL) => {
          console.log(downloadURL);
          if (type === "carImage") {
            carImageLink = downloadURL;
          } else {
            carBrandImageLink = downloadURL;
          }
        });
      }
    );
  }
};

export const addNewCar = async (
  additionalFields: additionalFieldsType[],
  productID: string,
  carImageFile: any,
  carBrandImageFile: any,
  setBeginProcess: (something: boolean) => void,
  router: any
) => {
  const id = productID !== "new" ? productID : generateId();

  if (productID !== "new") {
    if (carImageFile || carBrandImageFile) {
      setBeginProcess(true);
      if (carImageFile) {
        await uploadImage(carImageFile, "carImage", id);
      } else {
        carImageLink = additionalFields.filter(
          (item) => item.key === "carImageLink"
        )[0].value;
      }
      if (carBrandImageFile) {
        await uploadImage(carBrandImageFile, "carBrandImage", id);
      } else {
        carBrandImageLink = additionalFields.filter(
          (item) => item.key === "carBrandImageLink"
        )[0].value;
      }
    } else {
      setBeginProcess(true);
      carImageLink = additionalFields.filter(
        (item) => item.key === "carImageLink"
      )[0].value;
      carBrandImageLink = additionalFields.filter(
        (item) => item.key === "carBrandImageLink"
      )[0].value;
    }
  } else {
    if (carImageFile && carBrandImageFile) {
      setBeginProcess(true);

      await uploadImage(carImageFile, "carImage", id);
      await uploadImage(carBrandImageFile, "carBrandImage", id);
    } else {
      alert("Choose a car brand logo and a car image");
    }
  }

  if (additionalFields.length > 0 && carBrandImageLink && carImageLink) {
    let additionalFieldsObject: any = {};

    additionalFields.forEach((field) => {
      if (field.key !== "id") {
        additionalFieldsObject[field.key] = field;

        if (field.disabled === undefined) {
          additionalFieldsObject[field.key].disabled = false;
        }
      }
    });

    await setDoc(doc(db, `/cars/${id}`), {
      id: {
        key: "id",
        value: id,
        order: 0,
      },
      ...additionalFieldsObject,
      carImageLink: {
        key: "carImageLink",
        value: carImageLink,
        order: additionalFields.length + 1,
      },
      carBrandImageLink: {
        key: "carBrandImageLink",
        value: carBrandImageLink,
        order: additionalFields.length + 2,
      },
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

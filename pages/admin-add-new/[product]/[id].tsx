import { Flex, Text } from "@chakra-ui/react";
import AddNewProductComponent from "../../../components/admin/AddNewProductComponent";
import { RequestsComponent } from "../../../components/admin/RequestsComponent";
import { addNewCar } from "../../../helpers/admin/addNewCar";
import { addNewRetailer } from "../../../helpers/admin/addNewRetailer";
import { carFields, retailerFields } from "../../../helpers/admin/fieldsArrs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const AddNew = () => {
  const router = useRouter();
  const { product, id } = router.query;
  const [adminStatus, setAdminStatus] = useState<any>(false);

  const displayFields = () => {
    if (product) {
      switch (product) {
        case "requests":
          return <RequestsComponent id={id as string} />;
        case "car":
          return (
            <AddNewProductComponent
              dbRef="cars"
              premadeFields={carFields}
              pageTitle="Add new car"
              addNewProductFunc={addNewCar}
              id={id as string}
              router={router}
            />
          );
        case "retailer":
          return (
            <AddNewProductComponent
              dbRef="retailers"
              premadeFields={retailerFields}
              pageTitle="Add new retailer"
              addNewProductFunc={addNewRetailer}
              id={id as string}
              router={router}
            />
          );
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    setAdminStatus(
      window.localStorage.getItem("admin-status") as string | undefined
    );
  }, []);

  return adminStatus === "logged-in" ? (
    <Flex>{displayFields()}</Flex>
  ) : (
    adminStatus === null && <Link href="/admin-login">Admin login</Link>
  );
};

export default AddNew;

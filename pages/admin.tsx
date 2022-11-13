import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../helpers/firebase/firebaseConfig";

const ProductListItem = ({
  urlPageTitle,
  productTitle,
  productID,
  router,
}: {
  urlPageTitle: string;
  productTitle: string;
  productID: string;
  router: any;
}) => {
  return (
    <Flex
      flexDir="row"
      width="100%"
      minH="70px"
      borderRadius={5}
      backgroundColor="#1D1D1D"
      padding={5}
      justifyContent="space-between"
      alignItems="center"
      cursor="pointer"
      mb={3}
      onClick={() => {
        router.push(`/admin-add-new/${urlPageTitle}/${productID}`);
      }}
    >
      <Text color="white" fontWeight="bold">
        {productTitle}
      </Text>
    </Flex>
  );
};

const AdminPage = () => {
  const router = useRouter();
  const [adminStatus, setAdminStatus] = useState<any>(false);
  const [cars, setCars] = useState<any>([]);
  const [retailers, setRetailers] = useState<any>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([
    { name: "car", arr: cars },
    { name: "retailer", arr: retailers },
    { name: "requests", arr: requests },
  ]);

  useEffect(() => {
    getDocs(collection(db, "cars")).then((snapchot) => {
      setCars([]);
      snapchot.forEach((childSnapchot) => {
        setCars((p: any) => [...p, childSnapchot.data()]);
      });
    });

    getDocs(collection(db, "retailers")).then((snapchot) => {
      setRetailers([]);
      snapchot.forEach((childSnapchot) => {
        setRetailers((p: any) => [...p, childSnapchot.data()]);
      });
    });

    getDocs(collection(db, "requests")).then((snapchot) => {
      setRequests([]);
      snapchot.forEach((childSnapchot) => {
        setRequests((p: any) => [...p, childSnapchot.data()]);
      });
    });
  }, []);

  useEffect(() => {
    setAdminStatus(
      window.localStorage.getItem("admin-status") as string | undefined
    );
  }, []);

  const displayPages = (pageName: string, router: any) => {
    switch (pageName) {
      case "car":
        return cars.map((arrChild: any, idx: number) => (
          <ProductListItem
            key={idx}
            urlPageTitle={pageName}
            productTitle={arrChild["Backend title"].value}
            productID={arrChild.id.value}
            router={router}
          />
        ));
      case "retailer":
        return retailers.map((arrChild: any, idx: number) => (
          <ProductListItem
            key={idx}
            urlPageTitle={pageName}
            productTitle={arrChild["Backend title"].value}
            productID={arrChild.id.value}
            router={router}
          />
        ));
      case "requests":
        return requests.map((request, idx) => (
          <ProductListItem
            key={idx}
            productTitle={request["Namn"] as string}
            urlPageTitle="requests"
            productID={request["Namn"] as string}
            router={router}
          />
        ));
      default:
        return <Text>List is empty...</Text>;
    }
  };

  return adminStatus === "logged-in" ? (
    <Flex
      flexDir="column"
      width="100%"
      height="100vh"
      backgroundColor="#cecece"
      alignItems="center"
    >
      <Heading mt={10} mb={50}>
        Admin Panel
      </Heading>

      <Flex
        flexDir="row"
        width="90%"
        justifyContent="center"
        overflow="auto"
        maxHeight="90%"
      >
        {pages.map((page, pageIdx) => (
          <Flex
            key={pageIdx}
            flexDir="column"
            width="30.33%"
            ml={5}
            padding={5}
            backgroundColor="#a7a7a7"
          >
            <Button
              disabled={page.name === "requests"}
              backgroundColor="#1D1D1D"
              color="white"
              mb={10}
              minHeight={50}
              onClick={() => {
                router.push(`/admin-add-new/${page.name}/new`);
              }}
            >
              {`Add new ${page.name}`}
            </Button>

            <Flex
              flexDir="column"
              width="100%"
              alignItems="center"
              overflow="auto"
              padding={2}
            >
              {displayPages(page.name, router)}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ) : (
    adminStatus === null && <Link href="/admin-login">Admin login</Link>
  );
};

export default AdminPage;

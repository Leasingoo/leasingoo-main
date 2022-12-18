import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BreadcrumbsComponent } from "../../components/BreadcrumbsComponent";
import { CarsList } from "../../components/landing-page/CarsList";
import { Footer } from "../../components/landing-page/Footer";
import { Navbar } from "../../components/landing-page/Navbar";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
import Head from "next/head";

const CarBrandSinglePage = () => {
  const router = useRouter();
  const { carBrandName } = router.query;
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [carBrandInfo, setCarBrandInfo] = useState<any>();
  const [bottomInfo, setBottomInfo] = useState([
    { type: "Serviceavtal", color: "#fff" },
    { type: "Betalskydd", color: "#F3F4F6" },
    { type: "Försäkring", color: "#fff" },
  ]);

  useEffect(() => {
    if (carBrandName) {
      let carBrandQuery = query(
        collection(db, "carBrands"),
        where("Name.value", "==", carBrandName.toString().replaceAll("_", " "))
      );

      getDocs(carBrandQuery).then((snapchot) => {
        snapchot.forEach((childSnapchot) => {
          setCarBrandInfo(childSnapchot.data());
        });
      });
    }
  }, [carBrandName]);

  return (
    <Flex flexDir="column">
      <Head>
        <title>
          {carBrandName?.toString().replaceAll("_", " ") + " - Leasingoo"}
        </title>
        <meta
          name="description"
          content={
            carBrandInfo && carBrandInfo["Description"]
              ? carBrandInfo["Description"].value
              : carBrandName?.toString().replaceAll("_", " ") + " - Leasingoo"
          }
        />
      </Head>
      <Navbar currentRoute={`/${router.pathname.split("/")[1]}`} />

      <BreadcrumbsComponent />

      <Flex
        mt={isMobile ? "20px" : 0}
        w="100%"
        flexDir="column"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex w={isMobile ? "100%" : "60%"} flexDir="column">
          {carBrandInfo && (
            <Flex flexDir="column" p={isMobile ? 10 : 20}>
              <Text
                fontSize={isMobile ? "35px" : "50px"}
                color="#15304B"
                fontWeight="bold"
                mb={5}
              >
                {carBrandInfo["Name"].value}{" "}
                <span style={{ color: "#EF6D0A" }}>privatleasing!</span>
              </Text>

              <Text fontSize={20} color="#15304B" mb={10}>
                {carBrandInfo["Description"]
                  ? carBrandInfo["Description"].value
                  : "..."}
              </Text>
            </Flex>
          )}
        </Flex>

        {carBrandName && (
          <CarsList searchInput="" carBrand={carBrandName as string} />
        )}
      </Flex>

      {bottomInfo.map((item, i) => (
        <Flex
          key={i}
          flexDir="column"
          w="100%"
          bgColor={item.color}
          justifyContent="center"
          alignItems="center"
          p={isMobile ? 10 : 120}
        >
          <Flex flexDir="column" w={isMobile ? "100%" : "60%"}>
            <Text
              color="#15304B"
              fontSize={isMobile ? "30px" : "40px"}
              fontWeight="bold"
              mb={isMobile ? 5 : 10}
            >
              {carBrandName}{" "}
              <span style={{ color: "#EF6D0A" }}>{item.type}</span>
            </Text>
            <Text
              fontSize={isMobile ? 18 : 20}
              color="#15304B"
              fontWeight={400}
              textAlign="start"
              mb={10}
            >
              {carBrandInfo && carBrandInfo[`${item.type} text`].value}
            </Text>
            <Button
              flexDir="row"
              alignItems="center"
              justifyContent="space-evenly"
              w={isMobile ? "100%" : "40%"}
              bgColor={"#15304B"}
              borderRadius={40}
              p={7}
              _hover={{ backgroundColor: "gray" }}
            >
              <Text color="#fff">
                Till {carBrandName} {item.type}
              </Text>
              <Image
                src={require(`../../assets/redirect-arrow.png`)}
                alt={"redirect-arrow"}
              />
            </Button>
          </Flex>
        </Flex>
      ))}

      <Footer />
    </Flex>
  );
};

export default CarBrandSinglePage;

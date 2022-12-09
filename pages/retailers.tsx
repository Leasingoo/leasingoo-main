import { Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BreadcrumbsComponent } from "../components/BreadcrumbsComponent";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import { db } from "../helpers/firebase/firebaseConfig";

const RetailersPage = () => {
  const [retailers, setRetailers] = useState<any>([]);
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();

  const getCarBrands = async () => {
    let retailersArr: any[] = [];

    await getDocs(collection(db, "retailers")).then(async (snapchot) => {
      snapchot.forEach((childSnapchot) => {
        retailersArr = [...retailersArr, childSnapchot.data()];
      });
    });

    return retailersArr;
  };

  useEffect(() => {
    getCarBrands().then((arr) => setRetailers(arr));
  }, []);

  return (
    <Flex flexDir="column">
      <Navbar currentRoute={router.pathname} />

      <BreadcrumbsComponent
        additionalStyle={{
          marginLeft: isMobile ? "5%" : "20%",
        }}
      />

      <Flex
        mt={isMobile ? "20px" : 0}
        w="100%"
        flexDir="column"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex w={isMobile ? "100%" : "60%"} flexDir="column">
          <Flex flexDir="column" p={isMobile ? 10 : 20}>
            <Text
              fontSize={isMobile ? "35px" : "50px"}
              color="#15304B"
              fontWeight="bold"
              mb={5}
            >
              {isMobile ? (
                <>
                  Vi samarbetar <br /> idag med 7 st olika{" "}
                  <span style={{ color: "#EF6D0A" }}>bilhandlare!</span>
                </>
              ) : (
                <>
                  Vi samarbetar idag med <br />7 st olika{" "}
                  <span style={{ color: "#EF6D0A" }}>bilhandlare!</span>
                </>
              )}
            </Text>

            <Text fontSize={20} color="#15304B">
              Vi har samlat ihop alla kontaktuppgifter från de olika
              bilhandlarna. Ta en titt nedan efter olika bilhandlare som
              intresserar dig i närheten. När du har hittat några favoriter så
              är det bara att hoppa iväg och börja jämföra leasingbilar!
            </Text>
          </Flex>

          {retailers.length > 0 && (
            <Flex
              flexDir="row"
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent={isMobile ? "space-around" : ""}
              p={isMobile ? 5 : 10}
            >
              {retailers.map((item: any, idx: number) => (
                <Flex
                  key={idx}
                  flexDir="row"
                  w={"100%"}
                  h={"55px"}
                  bgColor="#F3F4F6"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={5}
                  pl={isMobile ? 5 : 20}
                  borderRadius={50}
                  cursor="pointer"
                  _hover={{ bgColor: "#cfd1d4" }}
                  onClick={() => {
                    router.push(
                      `/retailers/${item["Företagsnamn"].value.replaceAll(
                        " ",
                        "_"
                      )}`
                    );
                  }}
                >
                  <Text
                    fontSize={isMobile ? "16px" : "20px"}
                    fontWeight={600}
                    color="#15304B"
                  >
                    {isMobile
                      ? item["Företagsnamn"].value.substring(0, 30) +
                        (item["Företagsnamn"].value.split("").length > 30
                          ? "..."
                          : "")
                      : item["Företagsnamn"].value}
                  </Text>

                  <Image
                    alt="arrow-icon"
                    src={require("../assets/arrow-icon.png")}
                    style={{
                      width: 25,
                      height: 25,
                      objectFit: "cover",
                      transform: "rotate(90deg)",
                      marginRight: 20,
                      marginLeft: 10,
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default RetailersPage;

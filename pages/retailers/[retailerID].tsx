import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "../../components/landing-page/Footer";
import { Navbar } from "../../components/landing-page/Navbar";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";

const RetailerSinglePage = () => {
  const router = useRouter();
  const { retailerID } = router.query;
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [retailerInfo, setRetailerInfo] = useState<any>();
  const [location, setLocation] = useState({
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  });

  useEffect(() => {
    getDoc(doc(db, `/retailers/${retailerID}`)).then(async (snapchot) => {
      setRetailerInfo(snapchot.data());
    });
  }, [retailerID]);

  return (
    <Flex flexDir="column">
      <Navbar currentRoute={router.pathname} />

      <Flex
        mt={isMobile ? "120px" : "90px"}
        w="100%"
        flexDir="column"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex w={isMobile ? "100%" : "60%"} flexDir="column">
          {retailerInfo && (
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
                    Välkommen till
                    <br />{" "}
                    <span style={{ color: "#EF6D0A" }}>
                      {retailerInfo["Företagsnamn"].value}
                    </span>
                  </>
                )}
              </Text>

              <Text fontSize={20} color="#15304B" mb={10}>
                {retailerInfo["Beskrivning"]
                  ? retailerInfo["Beskrivning"].value
                  : "..."}
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
                <Text color="#fff">Besök deras Webbsida</Text>
                <Image
                  src={require(`../../assets/redirect-arrow.png`)}
                  alt={"redirect-arrow"}
                />
              </Button>
            </Flex>
          )}

          {retailerInfo && (
            <Flex w="100%" flexDir="column" alignItems="center">
              <Flex
                w={isMobile ? "90%" : "100%"}
                alignSelf="center"
                flexDir={isMobile ? "column" : "row"}
                justifyContent={"space-between"}
                mb={20}
                p={isMobile ? 5 : 10}
                boxShadow={isMobile ? "" : "lg"}
                borderTopWidth={isMobile ? 0 : 10}
                borderTopColor={isMobile ? "" : "#15304B"}
              >
                <Flex
                  flexDir="column"
                  mb={isMobile ? 10 : 0}
                  w={isMobile ? "100%" : "33%"}
                >
                  <Text
                    color={COLORS.DARK_BLUE}
                    fontWeight={600}
                    fontSize={25}
                    mb={isMobile ? 3 : 10}
                  >
                    Adress
                  </Text>

                  <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={600}>
                    {retailerInfo["Företagsnamn"]
                      ? retailerInfo["Företagsnamn"].value
                      : "..."}
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={17} w="50%" mb={2}>
                    {retailerInfo["Ort"] && retailerInfo["Gata"]
                      ? `${retailerInfo["Gata"].value} ${retailerInfo["Ort"].value}`
                      : "..."}
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={17}>
                    {retailerInfo["Postnummer"]
                      ? retailerInfo["Postnummer"].value
                      : "..."}
                  </Text>
                </Flex>

                <Flex
                  flexDir="column"
                  mb={isMobile ? 10 : 0}
                  w={isMobile ? "100%" : "33%"}
                >
                  <Text
                    color={COLORS.DARK_BLUE}
                    fontWeight={600}
                    fontSize={25}
                    mb={isMobile ? 3 : 10}
                  >
                    Öppettider
                  </Text>

                  <Text
                    color={COLORS.DARK_BLUE}
                    fontSize={17}
                    fontWeight={600}
                    mb={2}
                  >
                    Mån-Fre
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={16} mb={3}>
                    {retailerInfo["Mån - Fre"]
                      ? retailerInfo["Mån - Fre"].value
                      : "..."}
                  </Text>

                  <Text
                    color={COLORS.DARK_BLUE}
                    fontSize={17}
                    fontWeight={600}
                    mb={2}
                  >
                    Lördag
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={16} mb={3}>
                    {retailerInfo["Lördag"]
                      ? retailerInfo["Lördag"].value
                      : "..."}
                  </Text>

                  <Text
                    color={COLORS.DARK_BLUE}
                    fontSize={17}
                    fontWeight={600}
                    mb={2}
                  >
                    Söndag
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={16}>
                    {retailerInfo["Söndag"]
                      ? retailerInfo["Söndag"].value
                      : "..."}
                  </Text>
                </Flex>

                <Flex flexDir="column" w={isMobile ? "100%" : "33%"}>
                  <Text
                    color={COLORS.DARK_BLUE}
                    fontWeight={600}
                    fontSize={25}
                    mb={isMobile ? 3 : 10}
                  >
                    Kontaktuppgifter
                  </Text>

                  <Text
                    color={COLORS.DARK_BLUE}
                    fontSize={17}
                    fontWeight={600}
                    mb={2}
                  >
                    Telefon
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={17} mb={3}>
                    {retailerInfo["Telefon"]
                      ? retailerInfo["Telefon"].value
                      : "..."}
                  </Text>

                  <Text
                    color={COLORS.DARK_BLUE}
                    fontSize={17}
                    fontWeight={600}
                    mb={2}
                  >
                    Email
                  </Text>
                  <Text color={COLORS.DARK_BLUE} fontSize={17} mb={3}>
                    {retailerInfo["E-mail"]
                      ? retailerInfo["E-mail"].value
                      : "..."}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};
export default RetailerSinglePage;

import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import { aboutusData } from "../helpers/static-data/aboutusPageData";
import { StaticTextContainer } from "../components/landing-page/StaticTextContainer";
import { useMediaQuery } from "@material-ui/core";

const AboutusPage = () => {
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex w="100%" flexDir="column">
      <Navbar />
      <Flex flexDir="column" w="100%" alignItems="center" mt={"120px"}>
        <Flex
          flexDir="row"
          w={isMobile ? "95%" : "60%"}
          justifyContent={isMobile ? "center" : "space-between"}
          alignItems="center"
          mb={20}
        >
          <Text color="#15304B" fontSize={isMobile ? 35 : 50} fontWeight="bold">
            Leasingoo är här för
            <br />
            att göra <span style={{ color: "#EF6D0A" }}>leasing enkelt!</span>
          </Text>

          {!isMobile && (
            <Image
              alt="about-us-image1"
              src={require("../assets/about-us-image1.png")}
            />
          )}
        </Flex>

        {aboutusData.map((item, i) => (
          <StaticTextContainer item={item} i={i} noButtons />
        ))}
      </Flex>

      <Flex
        flexDir="column"
        w="100%"
        bgColor={"#15304B"}
        justifyContent="center"
        alignItems="center"
        p={isMobile ? 10 : 150}
      >
        <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
          <Text
            color="#fff"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb={isMobile ? 5 : 10}
          >
            Nyfiken bilhandlare?
            <br />
            <span style={{ color: "#EF6D0A" }}>Bli en samarbetspartner!</span>
          </Text>
          <Text
            fontSize={isMobile ? 18 : 20}
            color="#fff"
            fontWeight={400}
            textAlign="start"
            mb={10}
          >
            Kunder vill hitta sin perfekta bil. Genom att samarbeta med oss så
            ger vi kunden möjlighet att enkelt se över alla leasingbilar och
            välja den som passar bäst.
          </Text>
          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "100%" : "40%"}
            bgColor={"#EF6D0A"}
            borderRadius={40}
            p={7}
            _hover={{ backgroundColor: "gray" }}
          >
            <Text color="#fff">Företagslösningar</Text>
            <Image
              src={require(`../assets/redirect-arrow.png`)}
              alt={"redirect-arrow"}
            />
          </Button>
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default AboutusPage;

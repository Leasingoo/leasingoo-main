import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { CarsList } from "../components/landing-page/CarsList";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import Image from "next/image";
import { StaticTextContainer } from "../components/landing-page/StaticTextContainer";
import {
  landingContainersData,
  landingSteps,
} from "../helpers/static-data/landingPageData";
import { useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import Head from "next/head";

const LandingPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();

  return (
    <Flex flexDir="column" scrollBehavior="smooth">
      <Head>
        <title>Privatleasing - Leasingoo</title>
        <meta name="description" content="Leasingoo landing page" />
      </Head>
      <Navbar currentRoute="/" />
      <Flex
        pos="relative"
        w="100%"
        flexDir="column"
        mt={isMobile ? "120px" : "90px"}
        alignItems="center"
      >
        {!isMobile && (
          <Image
            alt="header-image"
            src={require("../assets/header-image.png")}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {isMobile ? (
          <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="#15304B" fontWeight="bold" fontSize={"30px"} mb={3}>
              Jämför <span style={{ color: "#EF6D0A" }}>privatleasing</span>
            </Text>
            <Text color="#15304B" textAlign="start" w="80%">
              Hitta enkelt din drömbil genom att filtrera och jämföra bilar hos
              oss.
            </Text>
          </Flex>
        ) : (
          <Text
            color="#fff"
            fontWeight="bold"
            position={"absolute"}
            fontSize="50px"
            top={230}
            left={400}
            w={600}
          >
            Jämför privatleasing. Enkelt och{" "}
            <span style={{ color: "#EF6D0A" }}>smart.</span>
          </Text>
        )}
      </Flex>

      <CarsList searchInput={searchInput} />

      <Flex flexDir="column" w="100%" alignItems="center" mb={20}>
        {isMobile ? (
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb="100px"
            textAlign={"center"}
          >
            Enkelt att hitta <br />
            <span style={{ color: "#EF6D0A" }}>rätt bil</span>
          </Text>
        ) : (
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb="100px"
            textAlign={"center"}
          >
            Enkelt att hitta rätt bil
          </Text>
        )}

        <Flex
          flexDir={isMobile ? "column" : "row"}
          w={isMobile ? "100%" : "80%"}
          alignItems={isMobile ? "center" : "flex-start"}
          justifyContent={isMobile ? "center" : "space-between"}
        >
          {landingSteps.map((item, i) => (
            <Flex
              key={i}
              flexDir="column"
              w={isMobile ? "80%" : "20%"}
              justifyContent="center"
              alignItems="center"
              borderRadius={50}
              mb={isMobile ? 20 : 0}
            >
              <Flex
                w="50px"
                h="50px"
                justifyContent="center"
                alignItems="center"
                borderRadius={50}
                bgColor="#15304B"
                mb={isMobile ? 5 : 20}
              >
                <Text color="#fff" fontWeight="bold">
                  {i + 1}
                </Text>
              </Flex>

              <Flex flexDir="column" alignItems={isMobile ? "" : "center"}>
                <Text
                  color="#15304B"
                  fontWeight="bold"
                  fontSize={20}
                  textAlign={isMobile ? "center" : "start"}
                >
                  {item.title}
                </Text>
                <Text
                  color="#15304B"
                  fontSize={16}
                  textAlign={isMobile ? "center" : "start"}
                >
                  {item.text}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex flexDir="column" w="100%">
        {landingContainersData.map((item, i) => (
          <StaticTextContainer
            item={item}
            i={i}
            buttonFunc={() => {
              router.push(item.route);
            }}
          />
        ))}

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
      </Flex>

      <Footer />
    </Flex>
  );
};

export default LandingPage;

import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Header } from "../components/landing-page/Header";
import { CarsList } from "../components/landing-page/CarsList";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import Image from "next/image";
import { StaticTextContainer } from "../components/landing-page/StaticTextContainer";
import {
  landingContainersData,
  landingFooterData,
  landingSteps,
} from "../helpers/static-data/landingPageData";

const LandingPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Flex flexDir="column" scrollBehavior="smooth">
      <Navbar />
      <Flex pos="relative" w="100%" flexDir="column" mt={"90px"}>
        <Image
          alt="header-image"
          src={require("../assets/header-image.png")}
          style={{ width: "100%", height: "auto" }}
        />
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
      </Flex>

      <CarsList searchInput={searchInput} />

      <Flex flexDir="column" w="100%" alignItems="center" mb={20}>
        <Text color="#15304B" fontSize="40px" fontWeight="bold" mb="100px">
          Enkelt att hitta rätt bil
        </Text>

        <Flex
          flexDir="row"
          w={"80%"}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {landingSteps.map((item, i) => (
            <Flex
              key={i}
              flexDir="column"
              w="20%"
              justifyContent="center"
              alignItems="center"
              borderRadius={50}
            >
              <Flex
                w="50px"
                h="50px"
                justifyContent="center"
                alignItems="center"
                borderRadius={50}
                bgColor="#15304B"
                mb={20}
              >
                <Text color="#fff" fontWeight="bold">
                  {i + 1}
                </Text>
              </Flex>

              <Flex flexDir="column">
                <Text color="#15304B" fontWeight="bold" fontSize={20}>
                  {item.title}
                </Text>
                <Text color="#15304B" fontSize={16}>
                  {item.text}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex flexDir="column" w="100%">
        {landingContainersData.map((item, i) => (
          <StaticTextContainer item={item} i={i} />
        ))}

        {landingFooterData.map((item, i) => (
          <Flex
            key={i}
            flexDir="column"
            w="100%"
            bgColor={item.bgColor}
            justifyContent="center"
            alignItems="center"
            p={150}
          >
            <Flex flexDir="column" w="50%">
              <Text color="#fff" fontSize={"40px"} fontWeight="bold" mb={10}>
                {item.title}
                {item.br && <br />}
                <span style={{ color: item.buttonColor }}>
                  {item.specialTitle}
                </span>
              </Text>
              <Text
                fontSize={20}
                color="#fff"
                fontWeight={400}
                textAlign="start"
                mb={10}
              >
                {item.text}
              </Text>
              <Button
                flexDir="row"
                alignItems="center"
                justifyContent="space-evenly"
                w="40%"
                bgColor={item.buttonColor}
                borderRadius={40}
                p={7}
                _hover={{ backgroundColor: "gray" }}
              >
                <Text color="#fff">{item.buttonText}</Text>
                <Image
                  src={require(`../assets/${item.buttonIcon}.png`)}
                  alt={item.buttonIcon}
                />
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default LandingPage;

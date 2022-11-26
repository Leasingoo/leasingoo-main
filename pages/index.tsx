import React, { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../components/landing-page/Header";
import { CarsList } from "../components/landing-page/CarsList";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import Image from "next/image";

const LandingPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Flex flexDir="column">
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
    </Flex>
  );
};

export default LandingPage;

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Input,
  InputAddon,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@material-ui/core";

const UpcomingPage = () => {
  const isMobile = useMediaQuery("(max-width:1400px)");

  const getTimeRemaining = () => {
    const total =
      Date.parse("December 31 2022") - Date.parse(new Date() as any);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [days, setDays] = useState(getTimeRemaining().days);
  const [hours, setHours] = useState(getTimeRemaining().hours);
  const [minutes, setMinutes] = useState(getTimeRemaining().minutes);
  const [seconds, setSeconds] = useState(getTimeRemaining().seconds);

  useEffect(() => {
    setInterval(() => {
      setDays(getTimeRemaining().days);
      setHours(getTimeRemaining().hours);
      setMinutes(getTimeRemaining().minutes);
      setSeconds(getTimeRemaining().seconds);
    }, 1000);
  }, []);

  return (
    <Flex
      width="90%"
      height={isMobile ? "100%" : "100vh"}
      flexDirection={isMobile ? "column" : "row"}
      justifyContent={isMobile ? "center" : "space-between"}
      alignItems="center"
      mt={isMobile ? 100 : 0}
    >
      <Flex
        w="100%"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        mb={isMobile ? 50 : 0}
      >
        <Image
          alt={"app-logo"}
          src={require("../assets/app-logo-blue.png")}
          style={{ marginBottom: 50 }}
        />
        <Text
          color="#15304B"
          fontSize={isMobile ? 25 : 30}
          fontWeight={800}
          mb={20}
          textAlign="center"
        >
          Snart kan du enkelt{" "}
          <span style={{ color: "#EF6D0A" }}>jämföra privatleasing!</span>
        </Text>

        <Flex
          w="95%"
          flexDir="row"
          alignItems="center"
          justifyContent="center"
          mb={10}
        >
          <Flex flexDir="column" alignItems="center" w={isMobile ? 80 : 180}>
            <Text
              color="#15304B"
              fontSize={isMobile ? 18 : 21}
              fontWeight={300}
            >
              Dagar
            </Text>
            <Text
              color="#15304B"
              fontSize={isMobile ? 60 : 90}
              fontWeight={900}
            >
              {days}
            </Text>
          </Flex>

          <Flex flexDir="column" alignItems="center" w={isMobile ? 80 : 180}>
            <Text
              color="#15304B"
              fontSize={isMobile ? 18 : 21}
              fontWeight={300}
            >
              Timmar
            </Text>
            <Text
              color="#15304B"
              fontSize={isMobile ? 60 : 90}
              fontWeight={900}
            >
              {hours}
            </Text>
          </Flex>

          <Flex flexDir="column" alignItems="center" w={isMobile ? 80 : 180}>
            <Text
              color="#15304B"
              fontSize={isMobile ? 18 : 21}
              fontWeight={300}
            >
              Minuter
            </Text>
            <Text
              color="#15304B"
              fontSize={isMobile ? 60 : 90}
              fontWeight={900}
            >
              {minutes}
            </Text>
          </Flex>

          <Flex flexDir="column" alignItems="center" w={isMobile ? 80 : 180}>
            <Text
              color="#15304B"
              fontSize={isMobile ? 18 : 21}
              fontWeight={300}
            >
              Sekunder
            </Text>
            <Text
              color="#15304B"
              fontSize={isMobile ? 60 : 90}
              fontWeight={900}
            >
              {seconds}
            </Text>
          </Flex>
        </Flex>

        <Flex bgColor="#F3F4F6" p={3} borderRadius={50}>
          <input
            style={{
              width: isMobile ? "90%" : 600,
              paddingLeft: isMobile ? 20 : 50,
              paddingRight: 5,
              border: "none",
              outline: "none",
              backgroundColor: "#F3F4F6",
              fontSize: isMobile ? 15 : "",
            }}
            placeholder={
              isMobile
                ? "Skriv in din mailadress"
                : "Skriv in din mailadress här och få ett meddelande när vi lanserar!"
            }
          />
          <Button
            color="white"
            bgColor="#15304B"
            borderRadius={20}
            p={5}
            w={isMobile ? 120 : 150}
          >
            Skicka
          </Button>
        </Flex>
      </Flex>

      <Image alt="mobile-image" src={require("../assets/mobile-image.png")} />
    </Flex>
  );
};

export default UpcomingPage;

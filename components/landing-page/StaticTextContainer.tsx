import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";

export const StaticTextContainer = ({ item, i }: { item: any; i: number }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex key={i} w="100%" bgColor={item.bgColor} justifyContent="center">
      <Flex
        w={isMobile ? "100%" : "80%"}
        flexDir={isMobile ? "column" : item.direction}
        alignItems="center"
        justifyContent="space-around"
        p={isMobile ? "50px" : 100}
      >
        <Image
          alt={item.image}
          src={require(`../../assets/${
            isMobile ? item.mobileImage : item.image
          }.png`)}
          style={{ borderRadius: 20, alignSelf: item.mobileImageDir }}
        />

        <Flex flexDir="column" w={isMobile ? "100%" : "35%"}>
          <Text color="#15304B" fontWeight="bold" fontSize={"40px"} mb={5}>
            {item.title}{" "}
          </Text>
          <Text color="#15304B" fontWeight={400} fontSize={20} mb={10}>
            {item.text}
          </Text>

          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "95%" : "75%"}
            bgColor="#15304B"
            borderRadius={40}
            p={7}
            alignSelf={isMobile ? "center" : ""}
            _hover={{ backgroundColor: "gray" }}
          >
            <Text color="#fff">{item.buttonText}</Text>
            <Image
              src={require("../../assets/redirect-arrow.png")}
              alt="redirect-arrow"
            />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";

export const StaticTextContainer = ({
  item,
  i,
  noButtons,
}: {
  item: any;
  i: number;
  noButtons?: boolean;
}) => {
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

        <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
          <Text
            color="#15304B"
            fontWeight="bold"
            fontSize={isMobile ? "30px" : "40px"}
            mb={5}
          >
            {item.title}{" "}
          </Text>
          <Text
            color="#15304B"
            fontWeight={400}
            fontSize={isMobile ? 18 : 20}
            mb={10}
            w={isMobile ? "90%" : "70%"}
          >
            {item.text}
          </Text>

          {!noButtons && (
            <Button
              flexDir="row"
              alignItems="center"
              justifyContent="space-evenly"
              w={isMobile ? "95%" : "260px"}
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
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

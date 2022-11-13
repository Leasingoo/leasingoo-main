import NextImage from "next/image";
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { Router, useRouter } from "next/router";
import { useMediaQuery } from "@material-ui/core";

export const CarsListItem = ({ car }: { car: any }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();
  return (
    <Flex
      pos="relative"
      flexDir="column"
      alignItems="center"
      w={isMobile ? "100%" : "250px"}
      h={isMobile ? "" : "350px"}
      boxShadow={"2xl"}
      borderRadius={15}
      mr={isMobile ? 0 : "30px"}
      mb="50px"
      pt={5}
      pb={5}
      cursor="pointer"
      onClick={() => {
        router.push(`/cars/${car["id"].value}`);
      }}
    >
      <NextImage
        alt="car-wings-icon"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          backgroundColor: "#fff",
          borderRadius: 15,
        }}
        src={require("../../assets/card-wing.png")}
      />

      <Image
        maxH={"35px"}
        maxW={"100px"}
        src={car["carBrandImageLink"].value}
        objectFit={"contain"}
      />
      <Image
        h={"auto"}
        w={"80%"}
        src={car["carImageLink"].value}
        objectFit={"contain"}
        mb={10}
      />

      <Text
        color={COLORS.DARK_BLUE}
        fontWeight={400}
        fontSize={17}
        textAlign="center"
        mb={"20px"}
        w="70%"
      >
        {car["Namn"].value}
      </Text>

      <Text
        color={COLORS.DARK_BLUE}
        fontWeight={600}
        fontSize={20}
        textAlign="center"
        mb="20px"
      >
        fr. {car["Pris"].value}
      </Text>
    </Flex>
  );
};

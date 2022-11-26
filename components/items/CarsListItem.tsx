import NextImage from "next/image";
import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { COLORS } from "../../helpers/globalColors";
import { Router, useRouter } from "next/router";
import { useMediaQuery } from "@material-ui/core";
import { motion } from "framer-motion";
import { useState } from "react";

export const CarsListItem = ({ car }: { car: any }) => {
  const [displayWings, setDisplayWings] = useState(false);
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();

  return (
    <motion.div
      style={{
        position: "relative",
        flexDirection: "column",
        width: isMobile ? "100%" : "250px",
        height: isMobile ? "" : "350px",
        boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.07)",
        borderRadius: 15,
        marginRight: isMobile ? 0 : "30px",
        marginBottom: "50px",
        paddingTop: 30,
        paddingBottom: 10,
        cursor: "pointer",
      }}
      onClick={() => {
        router.push(`/cars/${car["id"].value}`);
      }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={(e) => {
        setDisplayWings(true);
      }}
      onHoverEnd={(e) => {
        setDisplayWings(false);
      }}
    >
      {displayWings && (
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
          src={require("../../assets/card-wing-one.png")}
        />
      )}

      <Image
        maxH={"35px"}
        maxW={"100px"}
        // src={car["carBrandImageLink"].value}
        pl={5}
        src="https://firebasestorage.googleapis.com/v0/b/leasingoo.appspot.com/o/09cdc152%2FcarBrandImage?alt=media&token=81c7fe54-1d16-4f7c-b303-f7da6ca9980c"
        objectFit={"contain"}
      />
      <Image
        h={"auto"}
        w={"80%"}
        // src={car["carImageLink"].value}
        src="https://firebasestorage.googleapis.com/v0/b/leasingoo.appspot.com/o/09cdc152%2FcarImage?alt=media&token=0f8492bc-863a-487f-829b-c411aa29760f"
        objectFit={"contain"}
        mb={10}
      />

      <Text
        color={COLORS.DARK_BLUE}
        fontWeight={400}
        fontSize={17}
        mb={"20px"}
        pl={5}
        w="95%"
      >
        {car["Namn"].value}
      </Text>

      <Text
        position="absolute"
        color={COLORS.DARK_BLUE}
        fontWeight={600}
        fontSize={20}
        pl={5}
        mb="20px"
        bottom={0}
      >
        fr. {car["Pris"].value}
      </Text>
    </motion.div>
  );
};

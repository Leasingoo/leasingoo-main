import Image from "next/image";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { useMediaQuery } from "@material-ui/core";

export const CarInformationItem = ({
  title,
  icon,
  carInformation,
  car,
}: {
  title: string;
  icon: string;
  carInformation: any;
  car: any;
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    car && (
      <Flex
        pos="relative"
        flexDir="column"
        w={isMobile ? "90%" : 500}
        h={400}
        pt={"50px"}
        pb={"50px"}
        boxShadow="0px 0px 43px 0px rgb(0 0 0 / 10%);"
        borderRadius={10}
        alignItems="center"
        justifyContent="center"
        mb={isMobile ? "30px" : "50px"}
      >
        <Image
          alt="information-wings-icon"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            marginTop: "100%",
            zIndex: -1,
          }}
          src={require("../../assets/info_border.svg").default}
        />
        <Image
          alt="wings-boxes-icon"
          src={icon}
          style={{ width: "60px", height: "60px", marginBottom: "10px" }}
        />

        <Text
          color={COLORS.DARK_BLUE}
          fontWeight="bold"
          fontSize={30}
          textAlign="center"
          mb={"40px"}
        >
          {title}
        </Text>

        <Flex flexDir="row" mb={10}>
          <Flex flexDir="column" pr="100px">
            {carInformation.map((info: any, idx: any) => (
              <Text
                key={idx}
                color="#000"
                fontSize={17}
                fontWeight={200}
                mb={"5px"}
              >
                {info.key}
              </Text>
            ))}
          </Flex>

          <Flex flexDir="column">
            {carInformation.map((info: any, idx: any) => (
              <Text
                key={idx}
                color={COLORS.DARK_BLUE}
                fontSize={17}
                fontWeight={600}
                mb={"5px"}
              >
                {car[info.valueKey]?.value || "..."}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

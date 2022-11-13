import Image from "next/image";
import { Button, Flex, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { useMediaQuery } from "@material-ui/core";

export const RetailerListItem = ({
  retailerKey,
  retailerID,
  showModal,
  selectRetailerIndex,
}: {
  retailerKey: number;
  showModal: () => void;
  retailerID: any;
  selectRetailerIndex: (index: number) => void;
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [infoShow, setInfoShow] = useState(false);
  const [retailer, setRetailer] = useState<any>();

  useEffect(() => {
    getDoc(doc(db, `retailers/${retailerID.value}`)).then(
      (retailerSnapchot) => {
        setRetailer(retailerSnapchot.data() as any);
      }
    );
  }, []);

  return (
    <Flex
      flexDir="column"
      w={isMobile ? "90%" : "50%"}
      mb="20px"
      bgColor="#fff"
      borderRadius={10}
    >
      <Flex
        borderTopRightRadius={10}
        borderTopLeftRadius={10}
        flexDir="column"
        w={"100%"}
        height="90px"
        justifyContent="center"
        alignItems="center"
        bgColor="#fff"
        cursor="pointer"
        mb={infoShow ? "20px" : 0}
        onClick={() => {
          setInfoShow(!infoShow);
        }}
      >
        <Text
          color={COLORS.DARK_BLUE}
          fontWeight={600}
          fontSize={isMobile ? 23 : 25}
        >
          {retailer && retailer["Företagsnamn"].value}
        </Text>

        <Image
          alt="arrow-icon"
          style={{
            objectFit: "cover",
            right: isMobile ? "7%" : "27%",
            position: "absolute",
            width: "2.5rem",
            height: "2.5rem",
            transform: infoShow ? "" : "rotate(180deg)",
          }}
          src={require("../../assets/arrow-icon.png")}
        />
      </Flex>

      {infoShow && (
        <Flex
          flexDir="column"
          w={"100%"}
          backgroundColor="#fff"
          borderBottomRightRadius={10}
          borderBottomLeftRadius={10}
          padding={isMobile ? "25px" : "50px"}
        >
          <Flex
            w="100%"
            flexDir={isMobile ? "column" : "row"}
            justifyContent={"space-between"}
            mb={10}
          >
            <Flex
              flexDir="column"
              mb={isMobile ? 10 : 0}
              w={isMobile ? "100%" : "33%"}
            >
              <Text
                color={COLORS.DARK_BLUE}
                fontWeight={600}
                fontSize={25}
                mb={3}
              >
                Öppettider
              </Text>

              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                Måndag - Fredag
              </Text>
              <Text
                color={COLORS.DARK_BLUE}
                fontSize={16}
                fontWeight={600}
                mb={3}
              >
                {retailer["Mån - Fre"] ? retailer["Mån - Fre"].value : "..."}
              </Text>

              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                Lördag
              </Text>
              <Text
                color={COLORS.DARK_BLUE}
                fontSize={16}
                fontWeight="bold"
                mb={3}
              >
                {retailer["Lördag"] ? retailer["Lördag"].value : "..."}
              </Text>

              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                Söndag
              </Text>
              <Text color={COLORS.DARK_BLUE} fontSize={16} fontWeight="bold">
                {retailer["Söndag"] ? retailer["Söndag"].value : "..."}
              </Text>
            </Flex>

            <Flex
              flexDir="column"
              mb={isMobile ? 10 : 0}
              w={isMobile ? "100%" : "33%"}
            >
              <Text
                color={COLORS.DARK_BLUE}
                fontWeight={600}
                fontSize={25}
                mb={2}
              >
                Adress
              </Text>

              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                {retailer["Företagsnamn"]
                  ? retailer["Företagsnamn"].value
                  : "..."}
              </Text>
              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                {retailer["Ort"] && retailer["Gata"]
                  ? `${retailer["Gata"].value} ${retailer["Ort"].value}`
                  : "..."}
              </Text>
              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                {retailer["Postnummer"] ? retailer["Postnummer"].value : "..."}
              </Text>
            </Flex>

            <Flex flexDir="column" w={isMobile ? "100%" : "33%"}>
              <Text
                color={COLORS.DARK_BLUE}
                fontWeight={600}
                fontSize={25}
                mb={2}
              >
                Kontaktuppgifter
              </Text>

              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                Telefon
              </Text>
              <Text
                color={COLORS.DARK_BLUE}
                fontSize={17}
                fontWeight={600}
                mb={3}
              >
                {retailer["Telefon"] ? retailer["Telefon"].value : "..."}
              </Text>

              <Text color={COLORS.DARK_BLUE} fontSize={17} fontWeight={200}>
                Email
              </Text>
              <Text
                color={COLORS.DARK_BLUE}
                fontSize={17}
                fontWeight={600}
                mb={3}
              >
                {retailer["E-mail"] ? retailer["E-mail"].value : "..."}
              </Text>
            </Flex>
          </Flex>

          <Button
            bgColor={COLORS.ORANGE}
            color="#fff"
            w="180px"
            h={50}
            alignSelf="center"
            onClick={() => {
              selectRetailerIndex(retailerKey);
              showModal();
            }}
          >
            Skicka förfrågan
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

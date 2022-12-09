import Image from "next/image";
import {
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Input,
} from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
import { useMediaQuery } from "@material-ui/core";

export const RetailerListItem = ({
  retailerKey,
  retailerID,
  car,
}: {
  retailerKey: number;
  retailerID: string;
  car: any;
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [infoShow, setInfoShow] = useState(false);
  const [retailer, setRetailer] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInputs, setModalInputs] = useState([
    "Ditt namn",
    "Ditt efternamn",
    "Ditt E-post",
    "Ditt telefonnummer",
  ]);
  const [retailerIndex, setRetailerIndex] = useState(0);
  let requestInfo: any = {};

  const showModal = () => {
    setModalVisible(true);
  };

  const selectRetailerIndex = (index: number) => {
    setRetailerIndex(index);
  };

  const saveRequest = async () => {
    let selectedRetailer: any = Object.keys(car).filter((key) =>
      key.includes("retailer")
    )[retailerIndex];

    await setDoc(doc(db, `requests/${requestInfo["Ditt namn"]}`), {
      ["Namn"]: requestInfo["Ditt namn"],
      ["Efternamn"]: requestInfo["Ditt efternamn"],
      ["E-post"]: requestInfo["Ditt E-post"],
      ["Telefonnummer"]: requestInfo["Ditt telefonnummer"],
      ["Retailer link"]: `${process.env.NEXT_PUBLIC_URL}/admin-add-new/retailer/${car[selectedRetailer].value}`,
      ["Car link"]: `${process.env.NEXT_PUBLIC_URL}/car-brands/${
        car["Bilmärke"].value
      }/${car["Namn"].value.replaceAll(" ", "_")}`,
    });

    alert("Förfrågan skickad");
    setModalVisible(false);
  };

  useEffect(() => {
    getDoc(doc(db, `retailers/${retailerID}`)).then((retailerSnapchot) => {
      setRetailer(retailerSnapchot.data() as any);
    });
  }, []);

  return (
    <Flex
      flexDir="column"
      w={isMobile ? "90%" : "50%"}
      mb="20px"
      bgColor="#fff"
      borderRadius={100}
    >
      <Flex
        borderRadius={100}
        flexDir="column"
        w={"100%"}
        height="70px"
        justifyContent="center"
        alignItems="center"
        bgColor="#fff"
        cursor="pointer"
        mb={infoShow ? "20px" : 0}
        onClick={() => {
          selectRetailerIndex(retailerKey);
          showModal();
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

      <Modal
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <ModalOverlay />
        <ModalContent
          bgColor={COLORS.DARK_BLUE}
          borderRadius={20}
          alignItems="center"
          animation="ease-in-out"
        >
          {retailer && (
            <Flex w="60%" flexDir="column" mb={10} mt={"80px"}>
              <Text color="#fff" fontWeight="bold" fontSize={30} mb={3}>
                {retailer["Företagsnamn"].value}
              </Text>

              <Text color="#fff" fontWeight={500}>
                {retailer["Telefon"].value}
              </Text>
              <Text color="#fff" fontWeight={500}>
                {retailer["E-mail"].value}
              </Text>
            </Flex>
          )}

          {modalInputs.map((input, idx) => (
            <Input
              key={idx}
              w="70%"
              bgColor="#fff"
              placeholder={input}
              color={COLORS.DARK_BLUE}
              mb={5}
              onChange={(e) => {
                requestInfo[input] = e.target.value;
              }}
              fontWeight={500}
              _placeholder={{ color: "gray", fontWeight: "bold" }}
            />
          ))}

          <Button
            w="40%"
            bgColor={COLORS.ORANGE}
            color="#fff"
            fontSize={20}
            fontWeight={500}
            p={5}
            mb={10}
            mt={10}
            borderRadius={50}
            onClick={saveRequest}
            _hover={{ backgroundColor: "gray" }}
          >
            Skicka
          </Button>
          <ModalCloseButton
            borderRadius={50}
            color="#15304B"
            bgColor="#fff"
            size="lg"
          />
        </ModalContent>
      </Modal>
    </Flex>
  );
};

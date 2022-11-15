import Image from "next/image";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { RetailerListItem } from "../items/RetailerListItem";
import { useMediaQuery } from "@material-ui/core";

export const RetailersListComponent = ({ car }: { car: any }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInputs, setModalInputs] = useState([
    "Namn",
    "Efternamn",
    "E-post",
    "Telefonnummer",
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

    await setDoc(doc(db, `requests/${requestInfo["Namn"]}`), {
      ["Namn"]: requestInfo["Namn"],
      ["Efternamn"]: requestInfo["Efternamn"],
      ["E-post"]: requestInfo["E-post"],
      ["Telefonnummer"]: requestInfo["Telefonnummer"],
      ["Retailer link"]: `${process.env.NEXT_PUBLIC_URL}/admin-add-new/retailer/${car[selectedRetailer].value}`,
      ["Car link"]: `${process.env.NEXT_PUBLIC_URL}/car/${car["id"].value}`,
    });

    alert("Förfrågan skickad");
    setModalVisible(false);
  };

  return (
    car && (
      <Flex
        flexDir="column"
        w="100%"
        backgroundColor={COLORS.DARK_BLUE}
        pt={20}
        pb={20}
        alignItems="center"
        justifyContent="center"
      >
        <Text
          fontSize={27}
          fontWeight="bold"
          color="#fff"
          mb={"10px"}
          textAlign="center"
        >
          Dessa återförsäljare hjälper dig med dröm
          <span style={{ color: COLORS.ORANGE }}>bilen</span>
        </Text>
        <Text
          fontSize={17}
          fontWeight={200}
          textAlign="center"
          color="#fff"
          w={isMobile ? "80%" : "45%"}
          mb={20}
        >
          Det finns självklart mycket mer du kan göra för att utrusta din bil
          utefter dina önskemål. Våra samarbetspartners visar alla sätt ni kan
          anpassa er bil så ni får det perfekta leasingavtalet.
        </Text>

        {Object.keys(car)
          .filter((key) => key.includes("retailer"))
          .map((infoKey, idx) => (
            <RetailerListItem
              key={idx}
              retailerKey={idx}
              showModal={showModal}
              selectRetailerIndex={selectRetailerIndex}
              retailerID={car[infoKey]}
            />
          ))}

        <Modal
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
        >
          <ModalOverlay />
          <ModalContent
            bgColor={COLORS.DARK_BLUE}
            borderRadius={10}
            alignItems="center"
            animation="ease-in-out"
          >
            <Image
              alt="app-logo"
              src={require("../../assets/app-logo.png")}
              style={{
                width: 250,
                height: 68,
                marginBottom: "2rem",
                marginTop: 20,
              }}
            />

            <Text
              color="#fff"
              fontSize={17}
              fontWeight={200}
              textAlign="center"
              paddingX={10}
              mb={10}
            >
              Skicka en intresseanmälan så återkommer våra säljare och kontaktar
              er snarast!
            </Text>

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
                _placeholder={{ color: "gray", fontWeight: "bold" }}
              />
            ))}

            <Button
              w="35%"
              bgColor={COLORS.ORANGE}
              color="#fff"
              fontSize={23}
              mb={10}
              onClick={saveRequest}
            >
              Skicka
            </Button>
            <ModalCloseButton color="#fff" size="lg" />
          </ModalContent>
        </Modal>
      </Flex>
    )
  );
};

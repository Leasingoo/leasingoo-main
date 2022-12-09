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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { RetailerListItem } from "../items/RetailerListItem";
import { useMediaQuery } from "@material-ui/core";

export const RetailersListComponent = ({ car }: { car: any }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");

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
          Välj återförsäljare!
        </Text>
        <Text
          fontSize={16}
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
              retailerID={car[infoKey].value}
              car={car}
            />
          ))}
      </Flex>
    )
  );
};

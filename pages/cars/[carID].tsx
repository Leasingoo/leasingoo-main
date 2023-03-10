import { Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RetailersListComponent } from "../../components/car-page/RetailersListComponent";
import { CarInformationItem } from "../../components/items/CarInformationItem";
import { MainCarInformationItem } from "../../components/items/MainCarInformationItem";
import { Footer } from "../../components/landing-page/Footer";
import { carInformationData } from "../../helpers/car-page/carInformationData";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
import { useRouter } from "next/router";
import { useMediaQuery } from "@material-ui/core";

const CarPage = () => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();
  const { carID } = router.query;
  const [car, setCar] = useState<any>();
  const [carInformationCards, setCarInformationCards] =
    useState(carInformationData);

  useEffect(() => {
    getDoc(doc(db, `cars/${carID}`)).then((car) => {
      setCar(car.data() as any);
    });
  }, [carID]);
  return (
    <Flex flexDir="column" alignItems="center">
      <Flex
        w={isMobile ? "100%" : "70%"}
        flexDir={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
        mb={20}
        mt={isMobile ? 0 : 20}
      >
        <Image src={car && car["carImageLink"].value} w="650px" h="auto" />

        <MainCarInformationItem
          carInformation={[
            { key: "Avtalslängd" },
            { key: "Serviceavtal" },
            { key: "Nybilsgaranti" },
            { key: "Drivmedel" },
            { key: "Drivlåda" },
            { key: "CO2 utsläpp", keyValue: "CO2" },
            { key: "Räckvidd" },
          ]}
          car={car}
        />
      </Flex>

      <Flex
        flexDir="column"
        w="100%"
        backgroundColor={COLORS.DARK_BLUE}
        pt={isMobile ? "50px" : "70px"}
        pb={isMobile ? "50px" : "70px"}
        mb={20}
        pl={isMobile ? "10%" : "20%"}
      >
        <Text
          fontSize={isMobile ? 20 : 27}
          fontWeight={600}
          color="#fff"
          mb={3}
        >
          {car && car["Bilmärke"].value} privat
          <span style={{ color: COLORS.ORANGE }}>leasing</span>
        </Text>

        <Text color="#fff" fontWeight={200} fontSize={18} w="60%">
          {car && car["Beskrivning"].value}
        </Text>
      </Flex>

      <Flex
        w={isMobile ? "100%" : "60%"}
        flexDir="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent={isMobile ? "center" : "space-between"}
        mb="10px"
      >
        {carInformationCards.map((info, idx) => (
          <CarInformationItem
            title={info.title}
            icon={info.icon}
            carInformation={info.carInformation}
            car={car}
          />
        ))}
      </Flex>

      <RetailersListComponent car={car} />

      <Flex
        flexDir="column"
        bgColor={COLORS.ORANGE}
        w="100%"
        padding={isMobile ? 10 : 20}
        alignItems="center"
      >
        <Text
          fontSize={30}
          fontWeight={600}
          color="#fff"
          mb={5}
          textAlign="center"
        >
          Smidig kontakt med{" "}
          <span style={{ color: COLORS.DARK_BLUE }}>bilhandlare</span>
        </Text>

        <Text
          color="#fff"
          w={isMobile ? "100%" : "60%"}
          fontSize={20}
          textAlign="center"
          fontWeight={200}
        >
          Vi på Leasingoo har gjort det enkelt att komma i kontakt med rätt
          bilhandlare. När ni hittat den bil som passar är det bara att skicka
          en intresseanmälan så kontaktar bilhandlaren er snarast.
        </Text>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default CarPage;

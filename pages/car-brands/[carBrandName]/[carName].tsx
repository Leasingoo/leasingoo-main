import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RetailersListComponent } from "../../../components/car-page/RetailersListComponent";
import { CarInformationItem } from "../../../components/items/CarInformationItem";
import { MainCarInformationItem } from "../../../components/items/MainCarInformationItem";
import { Footer } from "../../../components/landing-page/Footer";
import { carInformationData } from "../../../helpers/car-page/carInformationData";
import { db } from "../../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../../helpers/globalColors";
import { useRouter } from "next/router";
import { useMediaQuery } from "@material-ui/core";
import { Navbar } from "../../../components/landing-page/Navbar";
import NextImage from "next/image";
import { BreadcrumbsComponent } from "../../../components/BreadcrumbsComponent";

const CarPage = () => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();
  const { carName } = router.query;
  const [car, setCar] = useState<any>();
  const [carInformationCards, setCarInformationCards] =
    useState(carInformationData);

  useEffect(() => {
    if (carName) {
      let carQuery = query(
        collection(db, "cars"),
        where("Namn.value", "==", carName?.toString().replaceAll("_", " "))
      );

      getDocs(carQuery).then((snapchot) => {
        snapchot.forEach((childSnapchot) => {
          setCar(childSnapchot.data());
        });
      });
    }
  }, [carName]);
  return (
    <Flex flexDir="column" alignItems="center">
      <Navbar currentRoute={router.pathname} />

      {/* <BreadcrumbsComponent /> */}

      <Flex
        w={isMobile ? "100%" : "70%"}
        flexDir={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent="space-between"
        mb={20}
        mt={"150px"}
      >
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/leasingoo.appspot.com/o/09cdc152%2FcarImage?alt=media&token=0f8492bc-863a-487f-829b-c411aa29760f"
          w="650px"
          h="auto"
        />

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
        backgroundColor={"#F3F4F6"}
        pt={isMobile ? "50px" : "70px"}
        pb={isMobile ? "50px" : "70px"}
        mb={20}
        pl={isMobile ? "10%" : "20%"}
      >
        <Text
          fontSize={isMobile ? 20 : 27}
          fontWeight={600}
          color="#15304B"
          mb={5}
        >
          {car && car["Bilmärke"].value} privatleasing
        </Text>

        <Text color="#15304B" fontSize={18} w="60%" mb={10}>
          {car && car["Beskrivning"].value}
        </Text>

        <Button
          flexDir="row"
          alignItems="center"
          justifyContent="space-evenly"
          w={isMobile ? "90%" : "270px"}
          bgColor={"#15304B"}
          borderRadius={40}
          p={7}
          _hover={{ backgroundColor: "gray" }}
          onClick={() => {
            router.push(`/car-brands/${car["Bilmärke"].value}`);
          }}
        >
          {car && <Text color="#fff">Mer om {car["Bilmärke"].value}</Text>}
          <NextImage
            src={require(`../../../assets/redirect-arrow.png`)}
            alt={"redirect-arrow"}
          />
        </Button>
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

      <Footer />
    </Flex>
  );
};

export default CarPage;

import { Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { BreadcrumbsComponent } from "../../components/BreadcrumbsComponent";
import { Footer } from "../../components/landing-page/Footer";
import { Navbar } from "../../components/landing-page/Navbar";
import { StaticTextContainer } from "../../components/landing-page/StaticTextContainer";
import {
  electricCarsSteps,
  electricCarsStaticContainerData,
} from "../../helpers/static-data/electricCarsPageData";
import Head from "next/head";

const ElectricCarsPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <Head>
        <title>Elbilar - Leasingoo</title>
        <meta name="description" content="Elbilar" />
      </Head>
      <Navbar currentRoute={router.pathname} />
      <BreadcrumbsComponent additionalStyle={{ marginBottom: "50px" }} />

      <Flex
        flexDir="row"
        w={isMobile ? "95%" : "55%"}
        alignItems="center"
        justifyContent="space-between"
        mt={isMobile ? 0 : 10}
        mb={isMobile ? 10 : 0}
      >
        <Text
          color="#15304B"
          fontSize={isMobile ? 35 : 50}
          fontWeight="bold"
          mb={5}
        >
          Elbilar är <span style={{ color: "#EF6D0A" }}>framtiden!</span>
        </Text>

        {!isMobile && (
          <Image
            src={require("../../assets/electric-cars1-image.png")}
            alt={"image1"}
          />
        )}
      </Flex>

      {electricCarsStaticContainerData.map((item, i: number) => (
        <StaticTextContainer item={item as any} i={i} noButtons />
      ))}

      <Flex flexDir="column" w="100%" alignItems="center" mb="200px" mt={20}>
        <Flex flexDir="column" w={isMobile ? "90%" : "50%"}>
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb={5}
            textAlign={"center"}
          >
            Saker att tänka på!
          </Text>

          <Text
            color="#15304B"
            fontSize={isMobile ? "20px" : "23px"}
            mb="100px"
            textAlign={"center"}
          >
            Vi har samlat ihop tips på vad ni kan tänka på inför leasingen. Läs
            gärna igenom artiklarna nedan och prata vidare med er bilhandlare!
          </Text>
        </Flex>

        <Flex
          flexDir={isMobile ? "column" : "row"}
          w={isMobile ? "100%" : "80%"}
          alignItems={isMobile ? "center" : "flex-start"}
          justifyContent={isMobile ? "center" : "space-evenly"}
        >
          {electricCarsSteps.map((item, i) => (
            <Flex
              key={i}
              flexDir="column"
              w={isMobile ? "80%" : "30%"}
              justifyContent="center"
              alignItems="center"
              borderRadius={50}
              mb={isMobile ? 20 : 0}
            >
              <Flex flexDir="column">
                <Text
                  color="#15304B"
                  fontWeight="bold"
                  fontSize={20}
                  textAlign={isMobile ? "center" : "start"}
                  mb={3}
                >
                  {item.title}
                </Text>
                <Text
                  color="#15304B"
                  fontSize={16}
                  textAlign={isMobile ? "center" : "start"}
                >
                  {item.text}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default ElectricCarsPage;

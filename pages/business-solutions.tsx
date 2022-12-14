import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BreadcrumbsComponent } from "../components/BreadcrumbsComponent";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import { StaticTextContainer } from "../components/landing-page/StaticTextContainer";
import {
  aboutPageSteps,
  footerData,
} from "../helpers/static-data/businessSolutionsPageData";

const BusinessSolutionsPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [firstContainerData, setFirstContainerData] = useState({
    title: "Vi vill hjälpa kunder att hitta till era leasingbilar!",
    text: "På Leasingoo kan kunderna jämföra och leta efter bilar utefter sina önskemål. Därefter kan de välja en bilhandlare som hjälper dom att slipa ihop det perfekta leasingavtalet.",
    direction: "row",
    image: "business-solutions2-image",
    bgColor: "#F3F4F6",
    mobileImage: "business-solutions2-image",
    mobileImageDir: "center",
  });

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <Navbar currentRoute={router.pathname} />
      <BreadcrumbsComponent additionalStyle={{ marginBottom: "50px" }} />

      <Flex
        flexDir="row"
        w={isMobile ? "95%" : "60%"}
        alignItems="center"
        justifyContent="space-between"
        mt={isMobile ? 0 : 10}
        mb={isMobile ? 10 : 0}
      >
        <Flex flexDir="column">
          <Text
            color="#15304B"
            fontSize={isMobile ? 35 : 50}
            fontWeight="bold"
            mb={5}
          >
            Vi hittar kunderna,
            <br />
            ni skriver <span style={{ color: "#EF6D0A" }}>leasingavtal!</span>
          </Text>

          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "100%" : "55%"}
            bgColor={"#15304B"}
            borderRadius={40}
            p={7}
            _hover={{ backgroundColor: "gray" }}
          >
            <Text color="#fff">Skicka intresseanmälan</Text>
            <Image
              src={require(`../assets/redirect-arrow.png`)}
              alt={"redirect-arrow"}
            />
          </Button>
        </Flex>

        {!isMobile && (
          <Image
            src={require("../assets/business-solutions-image1.png")}
            alt={"image1"}
          />
        )}
      </Flex>

      <StaticTextContainer item={firstContainerData} noButtons />

      <Flex flexDir="column" w="100%" alignItems="center" mb={20} mt={20}>
        {isMobile ? (
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb="100px"
            textAlign={"center"}
          >
            Enkelt att hitta <br />
            <span style={{ color: "#EF6D0A" }}>rätt bil</span>
          </Text>
        ) : (
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb="100px"
            textAlign={"center"}
          >
            Enkelt att komma i kontakt med{" "}
            <span style={{ color: "#EF6D0A" }}>rätt kund!</span>
          </Text>
        )}

        <Flex
          flexDir={isMobile ? "column" : "row"}
          w={isMobile ? "100%" : "80%"}
          alignItems={isMobile ? "center" : "flex-start"}
          justifyContent={isMobile ? "center" : "space-between"}
        >
          {aboutPageSteps.map((item, i) => (
            <Flex
              key={i}
              flexDir="column"
              w={isMobile ? "80%" : "20%"}
              justifyContent="center"
              alignItems="center"
              borderRadius={50}
              mb={isMobile ? 20 : 0}
            >
              <Flex
                w="50px"
                h="50px"
                justifyContent="center"
                alignItems="center"
                borderRadius={50}
                bgColor="#15304B"
                mb={isMobile ? 5 : 20}
              >
                <Text color="#fff" fontWeight="bold">
                  {i + 1}
                </Text>
              </Flex>

              <Flex flexDir="column" alignItems={isMobile ? "" : "center"}>
                <Text
                  color="#15304B"
                  fontWeight="bold"
                  fontSize={20}
                  textAlign={isMobile ? "center" : "start"}
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

      {footerData.map((item, i) => (
        <StaticTextContainer i={i} item={item as any} noButtons />
      ))}

      <Flex
        flexDir="column"
        w="100%"
        bgColor={"#F3F4F6"}
        justifyContent="center"
        alignItems="center"
        p={isMobile ? 10 : 150}
      >
        <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb={isMobile ? 5 : 10}
          >
            Gör det enkelt för kunden att hitta er,
            <br />
            <span style={{ color: "#EF6D0A" }}>bli en samarbetspartner!</span>
          </Text>
          <Text
            fontSize={isMobile ? 18 : 20}
            color="#15304B"
            fontWeight={400}
            textAlign="start"
            mb={10}
          >
            Kunder vill hitta sin perfekta bil. Genom att samarbeta med oss så
            ger vi kunden möjlighet att enkelt se över alla leasingbilar och
            välja den som passar bäst. När kunden har bestämt sig för en av era
            bilar så ser vi till att de kommer i kontakt med er butik och ni kan
            enkelt göra affär.
          </Text>
          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "100%" : "40%"}
            bgColor={"#15304B"}
            borderRadius={40}
            p={7}
            _hover={{ backgroundColor: "gray" }}
          >
            <Text color="#fff">Skicka intresseanmälan</Text>
            <Image
              src={require(`../assets/redirect-arrow.png`)}
              alt={"redirect-arrow"}
            />
          </Button>
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default BusinessSolutionsPage;

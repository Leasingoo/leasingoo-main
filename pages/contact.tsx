import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BreadcrumbsComponent } from "../components/BreadcrumbsComponent";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import {
  openingTimes,
  questionsAnswers,
} from "../helpers/static-data/contactPageData";
import Head from "next/head";

const ContactPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [selectedQuestion, setSelectedQuestion] = useState<
    number | undefined
  >();

  return (
    <Flex flexDir="column" scrollBehavior="smooth" alignItems="center">
      <Head>
        <title>Kontakt - Leasingoo</title>
        <meta name="description" content="Kontakt" />
      </Head>
      <Navbar currentRoute={router.pathname} />

      {isMobile && (
        <BreadcrumbsComponent
          additionalStyle={{
            marginLeft: "5%",
            marginTop: 120,
          }}
        />
      )}

      <Flex
        pos="relative"
        w="100%"
        flexDir="column"
        mt={isMobile ? "40px" : "90px"}
        mb={isMobile ? 20 : 0}
        alignItems="center"
      >
        {!isMobile && (
          <Image
            alt="header-image"
            src={require("../assets/contact-page-header.png")}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {isMobile ? (
          <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="#15304B" fontWeight="bold" fontSize={"30px"} mb={3}>
              Vår support <br />
              hjälper er <span style={{ color: "#EF6D0A" }}>hela vägen!</span>
            </Text>
          </Flex>
        ) : (
          <Text
            color="#fff"
            fontWeight="bold"
            position={"absolute"}
            fontSize="50px"
            top={230}
            left={400}
            w={600}
          >
            Vår support hjälper er{" "}
            <span style={{ color: "#EF6D0A" }}>hela vägen!</span>
          </Text>
        )}
      </Flex>

      {!isMobile && (
        <BreadcrumbsComponent
          additionalStyle={{
            marginLeft: "20%",
            marginBottom: 70,
            marginTop: 50,
          }}
        />
      )}

      <Flex
        flexDir="column"
        width={isMobile ? "100%" : "60%"}
        mb={20}
        alignItems={isMobile ? "center" : ""}
        bgColor={isMobile ? "#15304B0D" : "#fff"}
        p={isMobile ? 5 : 0}
      >
        <Text color="#15304B" fontSize={30} fontWeight="bold" mb={10}>
          Vanliga frågor & svar
        </Text>

        {questionsAnswers.map((item, i) => (
          <Flex key={i} flexDir="column" mb={5}>
            <Flex
              flexDir="row"
              w={"100%"}
              h={isMobile ? "65px" : "55px"}
              bgColor={
                selectedQuestion === i
                  ? "#15304B"
                  : isMobile
                  ? "#fff"
                  : "#F3F4F6"
              }
              alignItems="center"
              justifyContent="space-between"
              pl={isMobile ? 5 : 20}
              borderRadius={50}
              cursor="pointer"
              _hover={{ bgColor: selectedQuestion !== i && "#cfd1d4" }}
              onClick={() => {
                setSelectedQuestion((p) => (p === i ? undefined : i));
              }}
            >
              <Text
                fontSize={isMobile ? "16px" : "20px"}
                fontWeight={600}
                color={selectedQuestion === i ? "#fff" : "#15304B"}
              >
                {item.question}
              </Text>

              <Image
                alt="arrow-icon"
                src={require(`../assets/${
                  selectedQuestion === i ? "arrow-icon-white" : "arrow-icon"
                }.png`)}
                style={{
                  width: 25,
                  height: 25,
                  objectFit: "cover",
                  transform:
                    selectedQuestion === i ? "rotate(0deg)" : "rotate(180deg)",
                  marginRight: 20,
                  marginLeft: 10,
                }}
              />
            </Flex>

            {selectedQuestion === i && (
              <Flex pl={10} mt={3}>
                <Text
                  fontSize={"18"}
                  color="#15304B"
                  w={isMobile ? "95%" : "80%"}
                >
                  {item.answer}
                </Text>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>

      <Flex flexDir="column" width={isMobile ? "95%" : "65%"} mb={20}>
        <Text
          color="#15304B"
          fontSize={30}
          fontWeight="bold"
          mb={10}
          pl={isMobile ? "10%" : 0}
        >
          Har du andra frågetecken? <br />
          <span style={{ color: "#EF6D0A" }}>Kontakta oss!</span>
        </Text>
        <Text
          pl={isMobile ? "10%" : 0}
          color="#15304B"
          fontWeight={500}
          w={isMobile ? "95%" : "60%"}
          fontSize={20}
          mb={10}
        >
          Vi svarar på era mail inom 12 timmar. Om ni önskar hjälp direkt så går
          det utmärkt att ringa supporten under våra öppettider!{" "}
        </Text>
        {openingTimes.map((item, i) => (
          <Flex
            flexDir={"row"}
            alignItems="center"
            w={isMobile ? "100%" : "50%"}
            justifyContent={isMobile ? "space-evenly" : ""}
            mb={5}
          >
            <Text color="#15304B" w={isMobile ? "" : "60%"} fontSize={20}>
              {item.days}
            </Text>
            <Text color="#15304B" w={isMobile ? "" : "60%"} fontSize={20}>
              {item.hours}
            </Text>
          </Flex>
        ))}
        <Flex
          w={isMobile ? "95%" : "40%"}
          flexDir={"row"}
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          mt={5}
        >
          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "45%" : "215px"}
            bgColor={"#15304B"}
            borderRadius={40}
            p={7}
            _hover={{ backgroundColor: "gray" }}
          >
            <Text color="#fff">Maila direkt </Text>
            <Image
              src={require(`../assets/redirect-arrow.png`)}
              alt={"redirect-arrow"}
            />
          </Button>

          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "45%" : "215px"}
            bgColor={"#15304B"}
            borderRadius={40}
            p={7}
            _hover={{ backgroundColor: "gray" }}
          >
            <Text color="#fff">Ring support </Text>
            <Image
              src={require(`../assets/redirect-arrow.png`)}
              alt={"redirect-arrow"}
            />
          </Button>
        </Flex>
      </Flex>

      <Footer contactPage />
    </Flex>
  );
};

export default ContactPage;

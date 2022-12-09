import Image from "next/image";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { COLORS } from "../../helpers/globalColors";
import { SocialMediaButtonItem } from "../items/SocialMediaButtonItem";
import { useMediaQuery } from "@material-ui/core";
import { footerSocialMedia } from "../../helpers/static-data/landingPageData";
import { useRouter } from "next/router";
import {
  leasingooRoutes,
  privateLeasingRoutes,
} from "../../helpers/static-data/footerData";

export const Footer = ({ contactPage }: { contactPage?: boolean }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");

  const scrollTop = () => {
    if (typeof window !== "undefined") {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex flexDir="column" width="100%">
      {!contactPage && (
        <Flex
          flexDir="column"
          w="100%"
          bgColor={"#EF6D0A"}
          justifyContent="center"
          alignItems="center"
          p={isMobile ? 10 : 150}
        >
          <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
            <Text
              color="#fff"
              fontSize={isMobile ? "30px" : "40px"}
              fontWeight="bold"
              mb={isMobile ? 5 : 10}
            >
              Vår support hjälper er{" "}
              <span style={{ color: "#15304B" }}>hela vägen!</span>
            </Text>
            <Text
              fontSize={isMobile ? 18 : 20}
              color="#fff"
              fontWeight={400}
              textAlign="start"
              mb={10}
            >
              Vi svarar på era mail inom 12 timmar. Om ni önskar hjälp direkt så
              går det utmärkt att ringa supporten under våra öppettider!
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
              onClick={() => {
                router.push("/contact");
              }}
            >
              <Text color="#fff">Kontakta oss</Text>
              <Image
                src={require(`../../assets/contact-icon-white.png`)}
                alt={"contact-icon-white"}
              />
            </Button>
          </Flex>
        </Flex>
      )}

      <Flex
        flexDir="column"
        alignItems={isMobile ? "flex-start" : "center"}
        backgroundColor={COLORS.DARK_BLUE}
        p={isMobile ? 5 : 10}
      >
        <Flex
          position={isMobile ? "fixed" : "absolute"}
          bgColor="#EF6D0A"
          bottom={isMobile ? "110px" : 5}
          left={isMobile ? "" : 5}
          right={isMobile ? 5 : ""}
          w={isMobile ? "50px" : "60px"}
          h={isMobile ? "50px" : "60px"}
          justifyContent="center"
          alignItems="center"
          borderRadius={50}
          cursor="pointer"
          onClick={scrollTop}
          zIndex={20}
        >
          <Image
            alt={"arrow-top"}
            src={require("../../assets/arrow-top-icon.png")}
          />
        </Flex>

        <Flex
          flexDir={isMobile ? "column" : "row"}
          width="60%"
          justifyContent={isMobile ? "" : "space-around"}
          mb={10}
        >
          <Flex
            flexDir="column"
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 10 : 0}
            ml={isMobile ? -5 : 0}
          >
            <Image
              alt="app-logo"
              src={require("../../assets/app-logo.png")}
              style={{
                width: 200,
                height: 54,
                marginBottom: isMobile ? 0 : 50,
              }}
            />
            {!isMobile && (
              <Flex flexDir="row" alignItems="center">
                {footerSocialMedia.map((item, idx) => (
                  <SocialMediaButtonItem key={idx} item={item} />
                ))}
              </Flex>
            )}
          </Flex>

          <Flex flexDir={isMobile ? "column" : "row"}>
            <Flex
              flexDir="column"
              ml={isMobile ? 0 : "120px"}
              alignItems="flex-start"
              mb={isMobile ? 10 : 0}
            >
              <Text color="#fff" fontWeight="bold" fontSize={25} mb={2}>
                Privatleasing
              </Text>

              {privateLeasingRoutes.map((item, i) => (
                <Text
                  color="#fff"
                  fontSize={16}
                  mb={2}
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={() => {
                    router.push(item.route);
                  }}
                >
                  {item.name}
                </Text>
              ))}
            </Flex>

            <Flex
              flexDir="column"
              ml={isMobile ? 0 : "120px"}
              mb={isMobile ? 10 : 0}
            >
              <Text color="#fff" fontWeight="bold" fontSize={25} mb={2}>
                Leasingoo
              </Text>
              {leasingooRoutes.map((item, i) => (
                <Text
                  _hover={{ textDecoration: "underline" }}
                  color="#fff"
                  fontSize={16}
                  mb={2}
                  cursor="pointer"
                  onClick={() => {
                    router.push(item.route);
                  }}
                >
                  {item.name}
                </Text>
              ))}
            </Flex>
          </Flex>

          {isMobile && (
            <Flex flexDir="row" alignItems="center" mb={10}>
              {footerSocialMedia.map((item, idx) => (
                <SocialMediaButtonItem key={idx} item={item} />
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

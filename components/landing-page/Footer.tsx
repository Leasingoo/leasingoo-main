import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { COLORS } from "../../helpers/globalColors";
import { SocialMediaButtonItem } from "../items/SocialMediaButtonItem";
import { useMediaQuery } from "@material-ui/core";
import { footerSocialMedia } from "../../helpers/static-data/landingPageData";

export const Footer = ({ showSteps }: { showSteps?: boolean }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [privateLeasingLinks, setPrivateLeasingLinks] = useState([
    { name: "Jämför leasing", link: "" },
    { name: "Bilhandlare", link: "" },
    { name: "Bilmärken", link: "" },
    { name: "Om privatleasing", link: "" },
    { name: "Försäkring", link: "" },
    { name: "Garantier", link: "" },
    { name: "Elbilar", link: "" },
  ]);
  const [leasingooLinks, setLeasingooLinks] = useState([
    { name: "Företagslösningar", link: "" },
    { name: "Om oss", link: "" },
    { name: "Kontakta oss", link: "" },
  ]);

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
    <Flex
      flexDir="column"
      width="100%"
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
            style={{ width: 200, height: 54, marginBottom: isMobile ? 0 : 50 }}
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

            {privateLeasingLinks.map((item, i) => (
              <Text color="#fff" fontSize={16} mb={2} cursor="pointer">
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
            {leasingooLinks.map((item, i) => (
              <Text color="#fff" fontSize={16} mb={2} cursor="pointer">
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
  );
};

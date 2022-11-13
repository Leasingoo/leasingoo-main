import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { userStepsData } from "../../helpers/footer/userStepsData";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { SocialMediaButtonItem } from "../items/SocialMediaButtonItem";
// import { UserStepsItem } from "../items/UserStepsItem";
import { useMediaQuery } from "@material-ui/core";

export const Footer = ({ showSteps }: { showSteps?: boolean }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [socialMedia, setSocialMedia] = useState([
    {
      name: "twitter",
      icon: require("../../assets/twitter-icon.png"),
      url: "https://twitter.com/leasingoo",
    },
    {
      name: "faceboook",
      icon: require("../../assets/facebook-icon.png"),
      url: "https://www.facebook.com/Leasingoo/",
    },
    {
      name: "instagram",
      icon: require("../../assets/instagram-icon.png"),
      url: "https://www.instagram.com/leasingoo/",
    },
    {
      name: "youtube",
      icon: require("../../assets/youtube-icon.png"),
      url: "https://youtube.com",
    },
  ]);

  return (
    <Flex
      flexDir="column"
      width="100%"
      backgroundColor={COLORS.DARK_BLUE}
      alignItems="center"
      p={10}
    >
      <Flex
        flexDir={isMobile ? "column" : "row"}
        width="60%"
        justifyContent="space-around"
        mb={10}
      >
        <Flex flexDir="column" alignItems="center" mb={isMobile ? 20 : 0}>
          <Image
            alt="app-logo"
            src={require("../../assets/app-logo.png")}
            style={{ width: 200, height: 54, marginBottom: "1.25rem" }}
          />
          <Flex flexDir="row" alignItems="center">
            {socialMedia.map((item, idx) => (
              <SocialMediaButtonItem key={idx} item={item} />
            ))}
          </Flex>
        </Flex>

        <Flex flexDir={isMobile ? "column" : "row"} alignItems="center">
          <Flex
            flexDir="column"
            ml={isMobile ? 0 : "120px"}
            alignItems="center"
            mb={isMobile ? 10 : 0}
          >
            <Text color="#fff" fontWeight="bold" fontSize={25} mb={2}>
              Öppettider
            </Text>
            <Text color="#fff" fontSize={16}>
              Mån - Fre
            </Text>
            <Text color="#fff" fontSize={16} mb={5} fontWeight={200}>
              09.00 - 18.00
            </Text>
            <Text color="#fff" fontSize={16}>
              Lör - Sön
            </Text>
            <Text color="#fff" fontSize={16} fontWeight={200}>
              09.00 - 16.00
            </Text>
          </Flex>

          <Flex
            flexDir="column"
            ml={isMobile ? 0 : "120px"}
            alignItems="center"
            mb={isMobile ? 10 : 0}
          >
            <Text color="#fff" fontWeight="bold" fontSize={25} mb={2}>
              Kontakt
            </Text>
            <Text color="#fff" fontSize={16}>
              Telefon
            </Text>
            <Text color="#fff" fontSize={16} mb={5} fontWeight={200}>
              072 00 33 333
            </Text>
            <Text color="#fff" fontSize={16}>
              E-post
            </Text>
            <Text color="#fff" fontSize={16} fontWeight={200}>
              kontakt@leasingoo.se
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

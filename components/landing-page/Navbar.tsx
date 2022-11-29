import { Flex, Input, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";

export const Navbar = () => {
  const [navItems, setNavItems] = useState([
    { name: "Bilar", url: "", icon: "smile-icon" },
    { name: "Bilmärken", url: "", icon: "car-brands-icon" },
    { name: "Bilhandlare", url: "", icon: "retailers-icon" },
    { name: "Kontakt", url: "", icon: "contact-icon" },
  ]);
  const [selectedNavItem, setSelectedNavItem] = useState("Bilar");
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex
      boxShadow="dark-lg"
      pos="fixed"
      bgColor="#fff"
      top={isMobile ? "" : 0}
      bottom={isMobile ? 0 : ""}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height={isMobile ? "80px" : "90px"}
      paddingRight={isMobile ? 0 : 10}
      paddingLeft={isMobile ? 0 : 10}
      zIndex={10}
    >
      {!isMobile && (
        <Flex flexDir="row" cursor="pointer" alignItems="center">
          <Image alt="menu-icon" src={require("../../assets/menu-icon.png")} />
          <Text color="#15304B" margin={3}>
            Meny
          </Text>
        </Flex>
      )}

      {!isMobile && (
        <Input
          w={500}
          placeholder="Sök efter drömbilen..."
          bgColor={"#F3F4F6"}
          color="#15304B"
          _placeholder={{ color: "#15304B" }}
          padding={7}
          borderRadius={50}
          paddingLeft={20}
          cursor="pointer"
        />
      )}

      {!isMobile && (
        <Image
          alt="app-logo"
          src={require("../../assets/app-logo-blue.png")}
          style={{ height: 31, width: 120 }}
        />
      )}

      <Flex
        flexDir="row"
        w={isMobile ? "100%" : "35%"}
        alignItems="center"
        justifyContent="space-evenly"
      >
        {navItems.map((item, i) => (
          <Flex
            flexDir={isMobile ? "column" : "row"}
            cursor="pointer"
            alignItems="center"
            onClick={() => {
              setSelectedNavItem(item.name);
            }}
          >
            <Image
              alt={item.icon}
              src={require(`../../assets/nav-items/${item.icon}-${
                selectedNavItem === item.name ? "active" : "inactive"
              }.png`)}
              style={{ width: isMobile ? 32 : "", height: isMobile ? 32 : "" }}
            />

            <Text
              margin={isMobile ? 1 : 3}
              fontSize={isMobile ? "15px" : ""}
              color={selectedNavItem === item.name ? "#EF6D0A" : "#15304B"}
            >
              {item.name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

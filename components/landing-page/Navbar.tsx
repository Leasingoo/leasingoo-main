import { Flex, Input, Text } from "@chakra-ui/react";
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

  return (
    <Flex
      pos="fixed"
      bgColor="#fff"
      top={0}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      height={"90px"}
      paddingRight={10}
      paddingLeft={10}
      borderBottomWidth={1}
      borderBottomColor="#d2d2d8"
      zIndex={10}
    >
      <Flex flexDir="row" cursor="pointer" alignItems="center">
        <Image alt="menu-icon" src={require("../../assets/menu-icon.png")} />
        <Text color="#15304B" margin={3}>
          Meny
        </Text>
      </Flex>

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

      <Image
        alt="app-logo"
        src={require("../../assets/app-logo-blue.png")}
        style={{ height: 31, width: 120 }}
      />

      <Flex
        flexDir="row"
        w="35%"
        alignItems="center"
        justifyContent="space-between"
      >
        {navItems.map((item, i) => (
          <Flex
            flexDir="row"
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
            />

            <Text
              margin={3}
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

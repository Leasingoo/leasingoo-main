import { Flex, Input, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { navbarData } from "../../helpers/static-data/navbarData";

export const Navbar = ({ currentRoute }: { currentRoute: string }) => {
  const [selectedNavItem, setSelectedNavItem] = useState(currentRoute);
  const isMobile = useMediaQuery("(max-width:1400px)");
  const router = useRouter();

  return (
    <>
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
            <Image
              alt="menu-icon"
              src={require("../../assets/menu-icon.png")}
            />
            <Text color="#15304B" margin={3} fontWeight={500}>
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
            _placeholder={{ color: "#15304B", fontWeight: 500 }}
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
            style={{ cursor: "pointer", height: 31, width: 120 }}
            onClick={() => {
              router.push("/");
            }}
          />
        )}

        <Flex
          flexDir="row"
          w={isMobile ? "100%" : "35%"}
          alignItems="center"
          justifyContent="space-evenly"
        >
          {navbarData.map((item, i) => (
            <Flex
              flexDir={isMobile ? "column" : "row"}
              cursor="pointer"
              alignItems="center"
              onClick={() => {
                router.push(item.route);
                setSelectedNavItem(item.route);
              }}
            >
              <Image
                alt={item.icon}
                src={require(`../../assets/nav-items/${item.icon}-${
                  selectedNavItem === item.route ? "active" : "inactive"
                }.png`)}
                style={{
                  width: isMobile ? 32 : "",
                  height: isMobile ? 32 : "",
                }}
              />

              <Text
                margin={isMobile ? 1 : 3}
                fontSize={isMobile ? "15px" : ""}
                color={selectedNavItem === item.route ? "#EF6D0A" : "#15304B"}
                fontWeight={500}
              >
                {item.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {isMobile && (
        <Flex
          position="absolute"
          top={3}
          flexDir="row"
          w="100%"
          alignItems="center"
          justifyContent="space-evenly"
        >
          {currentRoute !== "/" && (
            <Image
              alt="back-icon"
              src={require("../../assets/back-icon.png")}
              style={{ width: 45, height: 45, margin: 5, cursor: "pointer" }}
            />
          )}
          <Input
            placeholder="Sök efter drömbilen..."
            bgColor={"#F3F4F6"}
            color="#15304B"
            _placeholder={{ color: "#15304B", fontWeight: "bold" }}
            padding={5}
            margin={5}
            borderRadius={50}
            paddingLeft={10}
            cursor="pointer"
          />
          <Image
            alt="menu-icon"
            src={require("../../assets/menu-icon.png")}
            style={{ width: 35, height: 25, margin: 10, cursor: "pointer" }}
          />
        </Flex>
      )}
    </>
  );
};

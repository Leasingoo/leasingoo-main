import { Flex, Input, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { navbarData } from "../../helpers/static-data/navbarData";
import { SearchModalComponent } from "../SearchModalComponent";
import { MenuComponent } from "./MenuComponent";

export const Navbar = ({ currentRoute }: { currentRoute: string }) => {
  const [selectedNavItem, setSelectedNavItem] = useState(currentRoute);
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [showMenu, setShowMenu] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const router = useRouter();

  const closeSearchModal = () => {
    setSearchModalVisible(false);
  };

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
        {showMenu && (
          <MenuComponent
            router={router}
            showMenu={showMenu}
            closeMenu={() => {
              setShowMenu(false);
            }}
          />
        )}
        {!isMobile && (
          <>
            <Flex
              flexDir="row"
              cursor="pointer"
              alignItems="center"
              _hover={{ backgroundColor: "#dedede" }}
              borderRadius={isMobile ? "" : 50}
              pr={isMobile ? 0 : 3}
              pl={isMobile ? 0 : 3}
              onClick={() => {
                setShowMenu(true);
              }}
            >
              <Image
                alt="menu-icon"
                src={require("../../assets/menu-icon.png")}
              />
              <Text color="#15304B" margin={3} fontWeight={500}>
                Meny
              </Text>
            </Flex>

            {currentRoute !== "/" && (
              <Flex
                flexDir="row"
                cursor="pointer"
                alignItems="center"
                _hover={{ backgroundColor: "#dedede" }}
                borderRadius={isMobile ? "" : 50}
                pr={isMobile ? 0 : 3}
                pl={isMobile ? 0 : 3}
                onClick={router.back}
              >
                <Image
                  alt="back-icon"
                  src={require("../../assets/back-icon.png")}
                />
                <Text color="#15304B" margin={3} fontWeight={500}>
                  Tillbaka
                </Text>
              </Flex>
            )}

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
              onClick={() => {
                setSearchModalVisible(true);
              }}
            />
            <SearchModalComponent
              closeSearchModal={closeSearchModal}
              searchModalVisible={searchModalVisible}
            />

            <Image
              alt="app-logo"
              src={require("../../assets/app-logo-blue.png")}
              style={{ cursor: "pointer", height: 31, width: 120 }}
              onClick={() => {
                router.push("/");
              }}
            />
          </>
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
              _hover={{ backgroundColor: "#dedede" }}
              borderRadius={isMobile ? "" : 50}
              pr={isMobile ? 0 : 3}
              pl={isMobile ? 0 : 3}
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
              onClick={router.back}
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
            onClick={() => {
              setSearchModalVisible(true);
            }}
          />
          <SearchModalComponent
            closeSearchModal={closeSearchModal}
            searchModalVisible={searchModalVisible}
          />

          <Image
            alt="menu-icon"
            src={require("../../assets/menu-icon.png")}
            style={{ width: 35, height: 25, margin: 10, cursor: "pointer" }}
            onClick={() => {
              setShowMenu(true);
            }}
          />
        </Flex>
      )}
    </>
  );
};

import {
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useState } from "react";

export const MenuComponent = ({
  closeMenu,
  showMenu,
  router,
}: {
  closeMenu: () => void;
  showMenu: boolean;
  router: any;
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [extraLinks, setExtraLinks] = useState<any[]>([
    { name: "Försäkring", route: "/insurance" },
    { name: "Garantier", route: "/guarantee" },
    { name: "Elbilar", route: "/electric-cars" },
    { name: "Företagslösningar", route: "/business-solutions" },
  ]);
  const [menuLinks, setMenuLinks] = useState<any>([
    {
      name: "Bilar",
      route: "/",
      description: "Jämför alla våra leasingbilar.",
      image: "smile-icon-inactive",
    },
    {
      name: "Bilmärken",
      route: "/car-brands",
      description: "Välj mellan flera olika bilmärken.",
      image: "car-brands-icon-inactive",
    },
    {
      name: "Bilhandlare",
      route: "/retailers",
      description: "Hitta närmaste bilhandlare.",
      image: "retailers-icon-inactive",
    },
    {
      name: "Om leasing",
      route: "/about-privatleasing",
      description: "Hur fungerar privatleasing?",
      image: "about-privatleasing-icon",
    },
    {
      name: "Om oss",
      route: "/about-us",
      description: "Vi gör leasing enkelt för er!",
      image: "about-us-icon",
    },
    {
      name: "Kontakt",
      route: "/contact",
      description: "Vill du ha hjälp med något?",
      image: "contact-icon-inactive",
    },
  ]);

  return (
    <Modal isOpen={showMenu} onClose={closeMenu}>
      <ModalOverlay />
      <ModalContent
        maxWidth="100%"
        height={isMobile ? "100%" : "auto"}
        bgColor="#fff"
        marginTop={0}
        marginBottom={0}
        alignItems="center"
        animation="linear"
      >
        <Flex
          flexDir="column"
          bgColor="#fff"
          boxShadow="dark-lg"
          w="100%"
          p={5}
          height={isMobile ? "100%" : "auto"}
          alignItems={isMobile ? "center" : ""}
        >
          <Flex
            pos="absolute"
            top={5}
            left={isMobile ? "" : 5}
            right={isMobile ? 5 : ""}
            flexDir="row"
            cursor="pointer"
            alignItems="center"
            bgColor="#F3F4F6"
            h="50px"
            _hover={{ backgroundColor: "#dedede" }}
            borderRadius={50}
            pr={3}
            pl={3}
            onClick={closeMenu}
          >
            <Image
              alt="close-icon"
              src={require("../../assets/close-icon.png")}
            />
            {!isMobile && (
              <Text color="#15304B" margin={3} fontWeight={500}>
                Stäng
              </Text>
            )}
          </Flex>

          {isMobile ? (
            <Flex flexDir="column" alignItems="center" mt={"25%"} w="100%">
              <Image
                alt="app-logo"
                src={require("../../assets/app-logo-blue.png")}
                style={{ width: 200, marginBottom: 50 }}
              />

              {menuLinks.map((item: any, i: number) => (
                <Flex
                  key={i}
                  flexDir="row"
                  alignItems="center"
                  bgColor={"#F3F4F6"}
                  h="80px"
                  w="98%"
                  borderRadius={10}
                  cursor="pointer"
                  _hover={{ backgroundColor: "#dedede" }}
                  onClick={() => {
                    closeMenu();
                    router.push(item.route);
                  }}
                  mb={4}
                >
                  {" "}
                  <Image
                    alt={item.image}
                    src={require(`../../assets/nav-items/${item.image}.png`)}
                    style={{ width: 40, margin: 20 }}
                  />
                  <Text color="#15304B" fontSize={22} fontWeight="bold">
                    {item.name}
                  </Text>
                </Flex>
              ))}
            </Flex>
          ) : (
            <Flex flexDir="row" w="100%" mt={20}>
              <Flex flexDir="column" pl={10}>
                <Text color="#15304B" fontSize={30} fontWeight="bold" mb={5}>
                  Våra huvudsidor
                </Text>

                <Flex flexDir="row" alignItems="center" w="100%">
                  {menuLinks.map((item: any, i: number) => (
                    <Flex
                      key={i}
                      flexDir="column"
                      minW="150px"
                      w="150px"
                      h="190px"
                      bgColor="#F3F4F6"
                      borderRadius={10}
                      justifyContent="center"
                      p={5}
                      m={"15px"}
                      cursor="pointer"
                      onClick={() => {
                        closeMenu();
                        router.push(item.route);
                      }}
                      _hover={{ backgroundColor: "#dedede" }}
                    >
                      <Image
                        alt={item.image}
                        src={require(`../../assets/nav-items/${item.image}.png`)}
                        style={{ width: 40 }}
                      />
                      <Text
                        color="#15304B"
                        fontSize={16}
                        fontWeight="bold"
                        mt={5}
                        mb={1}
                      >
                        {item.name}
                      </Text>
                      <Text color="#15304B" fontSize={13} mb={3}>
                        {item.description}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              <Flex flexDir="column" pl={20} alignSelf="end">
                <Text color="#15304B" fontSize={20} fontWeight="bold" mb={3}>
                  Våra undersidor
                </Text>

                {extraLinks.map((item, i) => (
                  <Flex
                    key={i}
                    w="250px"
                    h={"40px"}
                    flexDir="column"
                    justifyContent="center"
                    bgColor="#F3F4F6"
                    borderRadius={50}
                    pl={10}
                    cursor="pointer"
                    mb={3}
                    _hover={{ backgroundColor: "#dedede" }}
                    onClick={() => {
                      closeMenu();
                      router.push(item.route);
                    }}
                  >
                    <Text color="#15304B" fontWeight={600} fontSize={14}>
                      {item.name}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </ModalContent>
    </Modal>
  );
};

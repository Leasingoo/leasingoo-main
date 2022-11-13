import { Flex, Input } from "@chakra-ui/react";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
// import { motion } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@material-ui/core";
export const Header = ({
  searchInput,
  setSearchInput,
  elementRef,
  inputPosition,
}: {
  inputPosition: string;
  elementRef: any;
  searchInput: string;
  setSearchInput: (e: string) => void;
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex
      flexDir="column"
      width="100%"
      alignItems="center"
      backgroundColor={COLORS.DARK_BLUE}
      pt="60px"
      pb="150px"
    >
      <Image
        alt="app-logo"
        src={require("../../assets/app-logo.png")}
        style={{ width: 300, height: 81, marginBottom: 10 }}
        // width={300}
        // height={81}
        // mb={10}
      />

      <Flex ref={elementRef} />
      <Flex
        position={inputPosition as any}
        flexDir="row"
        justifyContent={
          isMobile && inputPosition === "fixed" ? "flex-start" : "center"
        }
        alignItems="center"
        width="100%"
        height="100px"
        bgColor={COLORS.DARK_BLUE}
        top={0}
        zIndex={inputPosition === "fixed" ? 10 : 0}
      >
        <Input
          width={isMobile ? "80%" : "30%"}
          minHeight="60px"
          backgroundColor="#fff"
          placeholder="Sök efter drömbilen.."
          pl={10}
          borderRadius={10}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
        />

        {!isMobile && (
          <Image
            alt="search-icon"
            src={require("../../assets/search-icon.png")}
            style={{
              width: "5rem",
              height: "5rem",
              padding: "1.25rem",
              cursor: "pointer",
            }}
          />
        )}
      </Flex>
    </Flex>
  );
};

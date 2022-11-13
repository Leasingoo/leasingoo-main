import React, { useEffect, useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Header } from "../components/landing-page/Header";
import { CarsList } from "../components/landing-page/CarsList";
import { Footer } from "../components/landing-page/Footer";

const LandingPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const filterButtonRef: any = useRef();
  const inputFieldRef: any = useRef();
  const [inputPosition, setInputPosition] = useState<any>("");
  const [filterButtonPosition, setFilterButtonPosition] =
    useState<any>("absolute");

  function isInViewport(element: any) {
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.bottom >= 0;
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let visible1 = isInViewport(filterButtonRef.current);
        let visible2 = isInViewport(inputFieldRef.current);

        if (visible2) {
          setInputPosition("");
        } else {
          setInputPosition("fixed");
        }

        if (visible1) {
          setFilterButtonPosition("absolute");
        } else {
          setFilterButtonPosition("fixed");
        }
      };
    }
  });

  return (
    <Flex flexDir="column" width="100%" alignItems="center">
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        elementRef={inputFieldRef}
        inputPosition={inputPosition}
      />
      <CarsList
        searchInput={searchInput}
        elementRef2={filterButtonRef}
        filterButtonPosition={filterButtonPosition}
      />
      <Footer />
    </Flex>
  );
};

export default LandingPage;

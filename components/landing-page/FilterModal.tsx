import {
  Button,
  Checkbox,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { COLORS } from "../../helpers/globalColors";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";

export type Filters = {
  sort?: string;
  gearBox?: string;
  driveModel?: string[];
  brand?: string[];
  minPrice: number;
  maxPrice: number;
};

export const FilterModal = ({
  filters,
  setFilters,
  cars,
}: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  cars: any[];
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const gearBoxOptions = useMemo(() => ["Automat", "Manuell"], []);
  const driveModelList = useMemo(
    () => ["Bensin", "Elbil", "Hybrid", "Plugin Hybrid"],
    []
  );
  const [filterButtons, setFilterButtons] = useState([
    "Drivmedel",
    "Drivlåda",
    "Bilmärken",
    "Pris",
  ]);
  const [sortingOptions, setSortingOptions] = useState([
    "Mest relevanta",
    "Pris - Lågt till Högt",
    "Pris - Högt till Lågt",
    "Namn - A till Ö",
    "Namn - Ö till A",
  ]);
  const [selectedFilterOption, setSelectedFilterOption] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");

  const onChangeFilter = (type: string, value: string | number) => {
    setFilters((prevState) => ({ ...prevState, [type]: value }));
  };
  const onChangeFilterArray = (type: string, value: string | number) => {
    setFilters((prevState: any) => ({
      ...prevState,
      [type]: prevState[type]
        ? prevState[type]?.includes(value)
          ? prevState[type]?.filter((item: string) => item !== value)
          : [...prevState[type], value]
        : undefined,
    }));
  };

  const displayFilter = (item: string) => {
    switch (item) {
      case "Drivmedel":
        return (
          <Flex
            w={200}
            pos="absolute"
            flexDir="column"
            bgColor="#fff"
            zIndex={8}
            boxShadow={"lg"}
            borderRadius={20}
            borderTopWidth={2}
            borderTopColor="#F3F4F6"
            mt={"100px"}
            left="50%"
            transform={"translate(-50%, 0%)"}
          >
            {driveModelList.map((item, idx) => (
              <Flex
                key={idx}
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
                p={"15px"}
                fontWeight={600}
                borderRadius={10}
                onClick={() => {
                  onChangeFilterArray("driveModel", item);
                }}
                _hover={{ bgColor: "#F3F4F6" }}
                cursor="pointer"
              >
                <Text color={COLORS.DARK_BLUE}>{item}</Text>

                <Flex
                  w="25px"
                  h="25px"
                  borderRadius="100%"
                  borderWidth={2}
                  borderColor={COLORS.DARK_BLUE}
                  bgColor={
                    filters.driveModel?.includes(item) ? "#15304B" : "#fff"
                  }
                />
              </Flex>
            ))}
          </Flex>
        );

      case "Drivlåda":
        return (
          <Flex
            w={200}
            pos="absolute"
            flexDir="column"
            justifyContent="center"
            bgColor="#fff"
            zIndex={8}
            boxShadow={"lg"}
            borderRadius={20}
            borderTopWidth={2}
            borderTopColor="#F3F4F6"
            mt={"100px"}
            left="50%"
            transform={"translate(-50%, 0%)"}
            p={5}
          >
            {gearBoxOptions.map((item, idx) => (
              <Flex
                key={idx}
                flexDir="row"
                justifyContent="space-between"
                mb={idx === 0 ? 5 : 0}
                cursor="pointer"
                alignItems="center"
                onClick={() => {
                  if (filters.gearBox === item) {
                    onChangeFilter("gearBox", "");
                  } else {
                    onChangeFilter("gearBox", item);
                  }
                }}
              >
                <Text fontSize={18} fontWeight={600}>
                  {item}
                </Text>

                <Flex
                  w="25px"
                  h="25px"
                  borderRadius="100%"
                  borderWidth={2}
                  borderColor={COLORS.DARK_BLUE}
                  bgColor={
                    filters?.gearBox === item ? COLORS.DARK_BLUE : "#fff"
                  }
                />
              </Flex>
            ))}
          </Flex>
        );

      case "Bilmärken":
        return (
          <Flex
            w={200}
            pos="absolute"
            flexDir="column"
            justifyContent="center"
            bgColor="#fff"
            zIndex={8}
            boxShadow={"lg"}
            borderRadius={20}
            borderTopWidth={2}
            borderTopColor="#F3F4F6"
            mt={"100px"}
            left="50%"
            transform={"translate(-50%, 0%)"}
            p={5}
          >
            {cars.length > 0 &&
              cars
                .map((e) => e["Bilmärke"].value)
                .filter((value, index, array) => array.indexOf(value) === index)
                .map((item, idx) => (
                  <Flex
                    key={idx}
                    flexDir="row"
                    justifyContent="space-between"
                    onClick={() => {
                      onChangeFilterArray("brand", item);
                    }}
                    p="15px"
                    cursor="pointer"
                    _hover={{ backgroundColor: "#F3F4F6" }}
                  >
                    <Text color={COLORS.DARK_BLUE}>{item}</Text>

                    <Flex
                      w="25px"
                      h="25px"
                      borderRadius="100%"
                      borderWidth={2}
                      borderColor={COLORS.DARK_BLUE}
                      bgColor={
                        filters.brand?.includes(item) ? "#15304B" : "#fff"
                      }
                    />
                  </Flex>
                ))}
          </Flex>
        );

      case "Pris":
        return (
          <Flex
            w={300}
            pos="absolute"
            flexDir="column"
            justifyContent="center"
            bgColor="#fff"
            zIndex={8}
            boxShadow={"lg"}
            borderRadius={20}
            borderTopWidth={2}
            borderTopColor="#F3F4F6"
            mt={"100px"}
            left="50%"
            transform={"translate(-50%, 0%)"}
            pl={10}
            pr={10}
            pt={5}
            pb={5}
          >
            <Flex
              mb={5}
              w="100%"
              flexDir="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color={COLORS.DARK_BLUE} fontWeight="500">
                {filters.minPrice} SEK
              </Text>
              <Text color={COLORS.DARK_BLUE} fontWeight="500">
                {filters.maxPrice} SEK
              </Text>
            </Flex>

            <RangeSlider
              aria-label={["min", "max"]}
              defaultValue={[0, 100]}
              size="lg"
              mb="10px"
              onChange={(e) => {
                onChangeFilter("minPrice", ~~((e[0] * 7500) / 100));
                onChangeFilter("maxPrice", ~~((e[1] * 7500) / 100));
              }}
            >
              <RangeSliderTrack bgColor="#d6d4d4">
                <RangeSliderFilledTrack bgColor={COLORS.DARK_BLUE} />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} bgColor={COLORS.DARK_BLUE} />
              <RangeSliderThumb index={1} bgColor={COLORS.DARK_BLUE} />
            </RangeSlider>
          </Flex>
        );
      case "Sortera efter":
    }

    return (
      <Flex
        w={350}
        pos="absolute"
        flexDir="column"
        justifyContent="center"
        bgColor="#fff"
        zIndex={8}
        boxShadow={"lg"}
        borderRadius={20}
        borderTopWidth={2}
        borderTopColor="#F3F4F6"
        mt={"100px"}
        left="50%"
        transform={"translate(-50%, 0%)"}
        p={5}
      >
        {sortingOptions.map((item, idx) => (
          <Flex
            key={idx}
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            p={"15px"}
            fontWeight={600}
            borderRadius={10}
            onClick={() => {
              setSelectedFilterOption(idx);
              onChangeFilter("sort", idx.toString());
            }}
            _hover={{ bgColor: "#F3F4F6" }}
            cursor="pointer"
          >
            <Text color={COLORS.DARK_BLUE}>{item}</Text>

            <Flex
              w="25px"
              h="25px"
              borderRadius="100%"
              borderWidth={2}
              borderColor={COLORS.DARK_BLUE}
              bgColor={selectedFilterOption === idx ? "#15304B" : "#fff"}
            />
          </Flex>
        ))}
      </Flex>
    );
  };

  return (
    <Flex
      flexDir="row"
      width={isMobile ? "100%" : "60%"}
      alignItems="center"
      justifyContent="space-between"
      mb={10}
      overflowX={isMobile ? "auto" : "hidden"}
    >
      <Flex flexDir="row" w={isMobile ? "100%" : "50%"}>
        {filterButtons.map((item, i) => (
          <>
            <Flex flexDir="column" alignItems={"center"}>
              <Button
                borderRadius={50}
                bgColor="#F3F4F6"
                p={25}
                m={5}
                borderWidth={2}
                borderColor={selectedFilter === item ? "#15304B" : ""}
                onClick={() => {
                  setSelectedFilter(selectedFilter === item ? "" : item);
                }}
              >
                <Text>{item}</Text>
                {!isMobile && (
                  <Image
                    style={{ margin: 3 }}
                    alt="arrow-down"
                    src={require("../../assets/arrow-down-icon.png")}
                  />
                )}
              </Button>
            </Flex>
            {selectedFilter === item && displayFilter(item)}
          </>
        ))}

        {isMobile && (
          <>
            <Flex flexDir="column" alignItems={"center"}>
              <Button
                borderRadius={50}
                bgColor="#F3F4F6"
                p={25}
                m={5}
                borderWidth={2}
                borderColor={
                  selectedFilter === "Sortera efter" ? "#15304B" : ""
                }
                onClick={() => {
                  setSelectedFilter(
                    selectedFilter === "Sortera efter" ? "" : "Sortera efter"
                  );
                }}
              >
                <Text>Sortera efter</Text>
                <Image
                  style={{ margin: 3 }}
                  alt="arrow-down"
                  src={require("../../assets/arrow-down-icon.png")}
                />
              </Button>
            </Flex>
            {selectedFilter === "Sortera efter" &&
              displayFilter("Sortera efter")}
          </>
        )}
      </Flex>

      {!isMobile && (
        <Flex flexDir="column" alignItems={"center"}>
          <Button
            borderRadius={50}
            bgColor="#F3F4F6"
            p={25}
            m={5}
            borderWidth={2}
            borderColor={selectedFilter === "Sortera efter" ? "#15304B" : ""}
            onClick={() => {
              setSelectedFilter(
                selectedFilter === "Sortera efter" ? "" : "Sortera efter"
              );
            }}
          >
            <Text>Sortera efter</Text>
            <Image
              style={{ margin: 3 }}
              alt="arrow-down"
              src={require("../../assets/arrow-down-icon.png")}
            />
          </Button>

          {selectedFilter === "Sortera efter" && displayFilter("Sortera efter")}
        </Flex>
      )}
    </Flex>
  );
};

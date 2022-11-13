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
// import { isMobile } from "../../helpers/isMobile";
// import { motion } from "framer-motion";
import { useMediaQuery } from "@material-ui/core";

export type Filters = {
  sort?: string;
  gearBox?: string;
  driveModel?: string[];
  brand?: string[];
  minPrice: number;
  maxPrice: number;
};
export const FilterModal = ({
  isVisible,
  filters,
  setFilters,
  cars,
}: {
  isVisible: boolean;
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

  return (
    <Flex
      display={isVisible ? "" : "none"}
      flexDir="column"
      w={isMobile ? "95%" : "380px"}
      position={"fixed"}
      right={isMobile ? "" : 5}
      top={130}
      p={10}
      bgColor={COLORS.DARK_BLUE}
      boxShadow={"dark-lg"}
      borderRadius={15}
      justifyContent="center"
      mt={-10}
      zIndex={1000}
    >
      <Text
        fontSize={30}
        color="white"
        fontWeight="bold"
        mb={5}
        textAlign="center"
      >
        Dröm<span style={{ color: COLORS.ORANGE }}>bilen</span>?
      </Text>

      <Flex flexDir="column" mb={5}>
        <Text fontSize={20} fontWeight={600} color="white" mb={1}>
          Sortering
        </Text>

        <Select
          bgColor="#fff"
          color={COLORS.DARK_BLUE}
          fontWeight="bold"
          onChange={(e) => onChangeFilter("sort", e.target.value)}
          value={filters.sort}
          borderRadius={10}
        >
          <option value={0}>Mest relevanta</option>
          <option value={1}>Pris - Lågt till Högt</option>
          <option value={2}>Pris - Högt till Lågt</option>
          <option value={3}>Namn - A till Ö</option>
          <option value={4}>Namn - Ö till A</option>
        </Select>
      </Flex>

      <Flex flexDir="column" mb={5}>
        <Text fontSize={20} fontWeight={600} color="white" mb={1}>
          Drivlåda
        </Text>

        <Flex
          flexDir="row"
          width="100%"
          h="50px"
          bgColor="#fff"
          borderRadius={10}
          alignItems="center"
          justifyContent="space-evenly"
        >
          {gearBoxOptions.map((item, idx) => (
            <Flex
              key={idx}
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
              <Flex
                w="25px"
                h="25px"
                mr="10px"
                borderRadius="100%"
                borderWidth={2}
                borderColor={
                  filters?.gearBox === item ? COLORS.ORANGE : COLORS.DARK_BLUE
                }
                bgColor={filters?.gearBox === item ? COLORS.ORANGE : "#fff"}
              />
              <Text
                fontSize={18}
                fontWeight={600}
                color={
                  filters?.gearBox === item ? COLORS.ORANGE : COLORS.DARK_BLUE
                }
              >
                {item}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <Flex flexDir="column" mb={5}>
        <Text fontSize={20} fontWeight={600} color="white" mb={1}>
          Drivmedel
        </Text>

        <Flex flexDir="row" alignItems="center" flexWrap="wrap">
          {driveModelList.map((item, idx) => (
            <Button
              key={idx}
              bgColor={
                filters.driveModel?.includes(item) ? COLORS.ORANGE : "#fff"
              }
              color={COLORS.DARK_BLUE}
              onClick={() => {
                onChangeFilterArray("driveModel", item);
              }}
              m="5px"
              fontWeight={600}
              _hover={{}}
              borderRadius={10}
              h="35px"
              pl="20px"
              pr="20px"
            >
              {item}
            </Button>
          ))}
        </Flex>
      </Flex>

      <Flex flexDir="column" mb={5}>
        <Text fontSize={20} fontWeight={600} color="white" mb={1}>
          Bilmärken
        </Text>

        <Flex flexDir="row" alignItems="center" flexWrap="wrap">
          {cars.length > 0 &&
            cars
              .map((e) => e["Bilmärke"].value)
              .filter((value, index, array) => array.indexOf(value) === index)
              .map((item, idx) => (
                <Button
                  key={idx}
                  bgColor={
                    filters.brand?.includes(item) ? COLORS.ORANGE : "#fff"
                  }
                  color={COLORS.DARK_BLUE}
                  onClick={() => {
                    onChangeFilterArray("brand", item);
                  }}
                  m="5px"
                  fontWeight={600}
                  _hover={{}}
                  borderRadius={10}
                  h="35px"
                  pl="20px"
                  pr="20px"
                >
                  {item}
                </Button>
              ))}
        </Flex>
      </Flex>

      <Flex flexDir="column" mb={5}>
        <Text fontSize={20} fontWeight={600} color="white" mb={1}>
          Prisintervall
        </Text>

        <Flex
          flexDir="column"
          w="100%"
          bgColor="#fff"
          justifyContent="center"
          alignItems="center"
          p={8}
          borderRadius={10}
        >
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

          <Text color={COLORS.DARK_BLUE} fontWeight="bold">
            {filters.minPrice} kr / mån — {filters.maxPrice} kr / mån
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

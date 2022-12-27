import {
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { ClickAwayListener, useMediaQuery } from "@material-ui/core";
import { COLORS } from "../globalColors";
import { useMemo, useState } from "react";

const DisplayFilter = ({
  item,
  setSelectedFilter,
  setFilters,
  router,
  filters,
  onChangeFilter,
  cars,
  onChangeFilterArray,
}: {
  item: string;
  setSelectedFilter: any;
  setFilters: any;
  router: any;
  filters: any;
  onChangeFilter: any;
  cars: any;
  onChangeFilterArray: any;
}) => {
  const gearBoxOptions = useMemo(() => ["Automat", "Manuell"], []);
  const driveModelList = useMemo(
    () => ["Bensin", "Elbil", "Hybrid", "Plugin Hybrid"],
    []
  );
  const [sortingOptions, setSortingOptions] = useState([
    "Mest relevanta",
    "Pris - Lågt till Högt",
    "Pris - Högt till Lågt",
    "Namn - A till Ö",
    "Namn - Ö till A",
  ]);
  const isMobile = useMediaQuery("(max-width:1400px)");

  switch (item) {
    case "Drivmedel":
      return (
        <ClickAwayListener
          onClickAway={() => {
            setSelectedFilter("");
          }}
        >
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
            left={isMobile ? "50%" : ""}
            transform={isMobile ? "translate(-50%, 0%)" : ""}
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
                  onChangeFilterArray("fuelType", item);
                }}
                _hover={{ bgColor: "#F3F4F6" }}
                cursor="pointer"
              >
                <Text color={COLORS.DARK_BLUE} fontWeight={600}>
                  {item}
                </Text>

                <Flex
                  w="25px"
                  h="25px"
                  borderRadius="100%"
                  borderWidth={2}
                  borderColor={COLORS.DARK_BLUE}
                  bgColor={
                    filters.fuelType?.includes(item) ? "#15304B" : "#fff"
                  }
                />
              </Flex>
            ))}
          </Flex>
        </ClickAwayListener>
      );

    case "Drivlåda":
      return (
        <ClickAwayListener
          onClickAway={() => {
            setSelectedFilter("");
          }}
        >
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
            left={isMobile ? "50%" : ""}
            transform={isMobile ? "translate(-50%, 0%)" : ""}
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
        </ClickAwayListener>
      );

    case "Bilmärken":
      return (
        <ClickAwayListener
          onClickAway={() => {
            setSelectedFilter("");
          }}
        >
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
            left={isMobile ? "50%" : ""}
            transform={isMobile ? "translate(-50%, 0%)" : ""}
            p={5}
          >
            {cars.length > 0 &&
              cars
                .map((e: any) => e["Bilmärke"].value)
                .filter(
                  (value: any, index: number, array: any) =>
                    array.indexOf(value) === index
                )
                .map((item: any, idx: number) => (
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
                    <Text color={COLORS.DARK_BLUE} fontWeight={600}>
                      {item}
                    </Text>

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
        </ClickAwayListener>
      );

    case "Pris":
      return (
        <ClickAwayListener
          onClickAway={() => {
            setSelectedFilter("");
          }}
        >
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
            left={isMobile ? "50%" : ""}
            transform={isMobile ? "translate(-50%, 0%)" : ""}
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
              <Text color={COLORS.DARK_BLUE} fontWeight={600}>
                {filters.minPrice} SEK
              </Text>
              <Text color={COLORS.DARK_BLUE} fontWeight={600}>
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
                <RangeSliderFilledTrack bgColor={COLORS.DARK_BLUE} fill="" />
                {/*/////////////////*/}
              </RangeSliderTrack>
              <RangeSliderThumb index={0} bgColor={COLORS.DARK_BLUE} />
              <RangeSliderThumb index={1} bgColor={COLORS.DARK_BLUE} />
            </RangeSlider>
          </Flex>
        </ClickAwayListener>
      );
    case "Sortera efter":
      return (
        <ClickAwayListener
          onClickAway={() => {
            setSelectedFilter("");
          }}
        >
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
            left={isMobile ? "50%" : ""}
            transform={isMobile ? "translate(-50%, 0%)" : ""}
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
                  onChangeFilter("sort", idx.toString());
                }}
                _hover={{ bgColor: "#F3F4F6" }}
                cursor="pointer"
              >
                <Text color={COLORS.DARK_BLUE} fontWeight={600}>
                  {item}
                </Text>

                <Flex
                  w="25px"
                  h="25px"
                  borderRadius="100%"
                  borderWidth={2}
                  borderColor={COLORS.DARK_BLUE}
                  bgColor={Number(filters.sort) === idx ? "#15304B" : "#fff"}
                />
              </Flex>
            ))}
          </Flex>
        </ClickAwayListener>
      );
    default:
      return <></>;
  }
};

export default DisplayFilter;

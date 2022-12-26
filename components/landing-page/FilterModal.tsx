import {
  Button,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { COLORS } from "../../helpers/globalColors";
import { ClickAwayListener, useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { isArray } from "util";
import DisplayFilter from "../../helpers/filters/DisplayFilter";

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
  isCarBrand,
}: {
  filters: any;
  setFilters: Dispatch<SetStateAction<Filters>>;
  cars: any[];
  isCarBrand: string;
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [showRemoveAllButton, setShowRemoveAllButton] = useState(false);
  const [filterButtons, setFilterButtons] = useState(
    isCarBrand
      ? ["Drivmedel", "Drivlåda", "Pris"]
      : ["Drivmedel", "Drivlåda", "Bilmärken", "Pris"]
  );
  const sortingOptions: string[] = [
    "Mest relevanta",
    "Pris - Lågt till Högt",
    "Pris - Högt till Lågt",
    "Namn - A till Ö",
    "Namn - Ö till A",
  ];
  const defaultFilters: any = {
    sort: "0",
    minPrice: 0,
    maxPrice: 7500,
    gearBox: "",
    brand: [],
    driveModel: [],
  };

  const onChangeFilter = (type: string, value: string | number) => {
    setFilters((prevState) => ({ ...prevState, [type]: value }));

    router.query[type] = value.toString();
    router.push(router, undefined, { scroll: false });
  };

  const onChangeFilterArray = async (type: string, value: string | number) => {
    setFilters((prevState: any) => ({
      ...prevState,
      [type]: prevState[type]
        ? prevState[type]?.includes(value)
          ? prevState[type]?.filter((item: string) => item !== value)
          : [...prevState[type], value]
        : undefined,
    }));
    let previousRouteArr: any = router.query[type]?.toString().split("-");

    (router.query[type] =
      router.query[type] && previousRouteArr?.length > 0
        ? previousRouteArr?.includes(value.toString())
          ? previousRouteArr
              ?.filter((item: string) => item !== value.toString())
              .toString()
              .replaceAll(",", "-")
          : `${router.query[type]}-${value.toString()}`
        : value.toString()),
      router.push(router, undefined, { scroll: false });
  };

  const displayAppliedFilters = (key: string) => {
    switch (key) {
      case "sort":
        return <Text>{sortingOptions[Number(filters[key])]}</Text>;
      case "gearBox":
        return <Text>{filters[key]}</Text>;
      case "driveModel":
        return (
          <>
            {filters[key].map((item: string, idx: number) => (
              <Button
                key={idx}
                borderRadius={50}
                bgColor="#F3F4F6"
                p={25}
                m={5}
                borderWidth={2}
                borderColor={"#15304B"}
                onClick={() => {
                  onChangeFilterArray(key, item);
                }}
              >
                <Text>{item}</Text>
                <Image
                  style={{ margin: 3, width: 25 }}
                  alt="close-icon"
                  src={require("../../assets/close-icon.png")}
                />
              </Button>
            ))}
          </>
        );
      case "brand":
        return (
          <>
            {filters[key].map((item: string, idx: number) => (
              <Button
                key={idx}
                borderRadius={50}
                bgColor="#F3F4F6"
                p={25}
                m={5}
                borderWidth={2}
                borderColor={"#15304B"}
                onClick={() => {
                  onChangeFilterArray(key, item);
                }}
              >
                <Text>{item}</Text>
                <Image
                  style={{ margin: 3, width: 25 }}
                  alt="close-icon"
                  src={require("../../assets/close-icon.png")}
                />
              </Button>
            ))}
          </>
        );
      case "minPrice":
        return <Text>{"Lägsta pris: " + filters[key]}</Text>;
      case "maxPrice":
        return <Text>{"Högsta pris: " + filters[key]}</Text>;
    }
  };

  useEffect(() => {
    let equalValues: any[] = [];
    Object.keys(filters).forEach((item) => {
      if (item === "brand" || item === "driveModel") {
        if (filters[item].length === defaultFilters[item].length) {
          equalValues = [...equalValues, item];
        }
      } else {
        if (filters[item] === defaultFilters[item]) {
          equalValues = [...equalValues, item];
        }
      }
    });

    if (Object.keys(filters).length === equalValues.length) {
      setShowRemoveAllButton(false);
    }
  }, [filters]);

  return (
    <Flex
      w="100%"
      flexDir="column"
      alignItems={"center"}
      mb={isMobile ? 5 : 10}
    >
      <Flex
        flexDir="row"
        width={isMobile ? "100%" : "55%"}
        alignItems="center"
        justifyContent="space-between"
        overflowX={isMobile ? "auto" : "hidden"}
      >
        <Flex flexDir="row" w={isMobile ? "100%" : "60%"}>
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
                    setSelectedFilter((p) => (p === item ? "" : item));
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

                {selectedFilter === item && (
                  <DisplayFilter
                    item={item}
                    setSelectedFilter={setSelectedFilter}
                    setFilters={setFilters}
                    router={router}
                    filters={filters}
                    onChangeFilter={onChangeFilter}
                    cars={cars}
                    onChangeFilterArray={onChangeFilterArray}
                  />
                )}
              </Flex>
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
                </Button>
              </Flex>
              {selectedFilter === "Sortera efter" && (
                <DisplayFilter
                  item={"Sortera efter"}
                  setSelectedFilter={setSelectedFilter}
                  setFilters={setFilters}
                  router={router}
                  filters={filters}
                  onChangeFilter={onChangeFilter}
                  cars={cars}
                  onChangeFilterArray={onChangeFilterArray}
                />
              )}
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

            {selectedFilter === "Sortera efter" && (
              <DisplayFilter
                item={"Sortera efter"}
                setSelectedFilter={setSelectedFilter}
                setFilters={setFilters}
                router={router}
                filters={filters}
                onChangeFilter={onChangeFilter}
                cars={cars}
                onChangeFilterArray={onChangeFilterArray}
              />
            )}
          </Flex>
        )}
      </Flex>

      <Flex
        flexDir="row"
        width={isMobile ? "95%" : "75%"}
        alignItems="center"
        justifyContent={isMobile ? "" : "center"}
        overflowX={isMobile ? "auto" : "hidden"}
        flexWrap={isMobile ? "nowrap" : "wrap"}
      >
        {Object.keys(filters).map(
          (key: string, i) =>
            (key === ("brand" || "driveModel")
              ? filters[key].length > 0
              : filters[key] !== defaultFilters[key]) && (
              <Flex
                onLoad={() => {
                  setShowRemoveAllButton(true);
                }}
              >
                {key === "brand" || key === "driveModel" ? (
                  displayAppliedFilters(key)
                ) : (
                  <Button
                    borderRadius={50}
                    bgColor="#F3F4F6"
                    p={25}
                    m={5}
                    borderWidth={2}
                    borderColor={"#15304B"}
                    onClick={() => {
                      onChangeFilter(key, defaultFilters[key]);
                    }}
                  >
                    {displayAppliedFilters(key)}

                    <Image
                      style={{ margin: 3, width: 25 }}
                      alt="close-icon"
                      src={require("../../assets/close-icon.png")}
                    />
                  </Button>
                )}
              </Flex>
            )
        )}

        {showRemoveAllButton && (
          <Button
            borderRadius={50}
            bgColor="#fff"
            p={25}
            m={5}
            borderWidth={2}
            borderColor={"#15304B"}
            onClick={() => {
              setFilters(defaultFilters);
              router.push("", undefined, { scroll: false });
              setShowRemoveAllButton(false);
            }}
          >
            Rensa alla
            <Image
              style={{ margin: 3, width: 25 }}
              alt="close-icon"
              src={require("../../assets/close-icon.png")}
            />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

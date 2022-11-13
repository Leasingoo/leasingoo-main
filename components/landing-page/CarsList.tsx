import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { db } from "../../helpers/firebase/firebaseConfig";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";
import { CarsListItem } from "../items/CarsListItem";
import { FilterModal, Filters } from "./FilterModal";
import { motion } from "framer-motion";
import { useMediaQuery } from "@material-ui/core";

export const CarsList = ({
  searchInput,
  filterButtonPosition,
  elementRef2,
}: {
  searchInput: string;
  filterButtonPosition: string;
  elementRef2: any;
}) => {
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [cars, setCars] = useState<any[]>([]);
  const [filters, setFilters] = useState<Filters>({
    sort: "0",
    minPrice: 0,
    maxPrice: 7500,
    gearBox: "",
    brand: [],
    driveModel: [],
  });
  const [openFilterModel, setOpenFilterModel] = useState(false);

  useEffect(() => {
    getDocs(collection(db, "cars")).then((snapchot) => {
      setCars([]);

      snapchot.forEach((childSnapchot) => {
        setCars((p: any) => [...p, childSnapchot.data()]);
      });
    });
  }, []);

  const filterSearch = useCallback(
    (item: any) =>
      searchInput !== ""
        ? item["Namn"]?.value?.toLowerCase()?.includes(searchInput)
        : item,
    [searchInput]
  );

  const filterByGearBox = useCallback(
    (item: any) =>
      !!filters.gearBox ? item["Drivlåda"]?.value === filters.gearBox : item,
    [filters.gearBox]
  );

  const filterByDriveModel = useCallback(
    (item: any) =>
      filters.driveModel?.length
        ? filters.driveModel?.includes(item["Drivmedel"]?.value)
        : item,
    [filters.driveModel]
  );

  const filterByBrand = useCallback(
    (item: any) =>
      filters.brand?.length
        ? filters.brand?.includes(item["Bilmärke"]?.value)
        : item,
    [filters.brand]
  );
  const filterByPrice = (item: any) => {
    return (
      Number(item["Pris"].value.replace(" ", "")) >= filters.minPrice &&
      Number(item["Pris"].value.replace(" ", "")) <= filters.maxPrice
    );
  };

  const sortByPrice = useCallback(
    (a: any, b: any) => {
      switch (filters.sort) {
        case "0":
          return 0;
        case "1":
          return (
            Number(a["Pris"].value.replace(" ", "")) -
            Number(b["Pris"].value.replace(" ", ""))
          );
        case "2":
          return (
            Number(b["Pris"].value.replace(" ", "")) -
            Number(a["Pris"].value.replace(" ", ""))
          );
        case "3":
          let textB = b["Namn"].value.split("")[0].toLowerCase();
          let textA = a["Namn"].value.split("")[0].toLowerCase();

          return textA < textB ? -1 : textA > textB ? 1 : 0;
        case "4":
          let textB2 = b["Namn"].value.split("")[0].toLowerCase();
          let textA2 = a["Namn"].value.split("")[0].toLowerCase();

          return textA2 < textB2 ? (textA2 > textB2 ? 1 : 0) : -1;
      }
    },
    [filters.sort]
  );
  const filteredCars = useMemo(
    () =>
      [...(cars || [])]
        .filter(filterSearch)
        .filter(filterByGearBox)
        .filter(filterByDriveModel)
        .filter(filterByBrand)
        .filter(filterByPrice)
        .sort(sortByPrice as any),
    [
      cars,
      filterSearch,
      filterByGearBox,
      filterByDriveModel,
      filterByBrand,
      filterByPrice,
      sortByPrice,
    ]
  );

  useEffect(() => {
    setOpenFilterModel(isMobile ? false : true);
  }, [isMobile]);

  return (
    <Flex
      flexDir="column"
      mt={-20}
      w="100%"
      alignItems="center"
      minHeight={800}
    >
      <Flex position="absolute" top={0} ref={elementRef2} />

      <Flex
        position={filterButtonPosition as any}
        bgColor={openFilterModel ? COLORS.ORANGE : "#fff"}
        justifyContent="center"
        alignItems="center"
        borderRadius="100%"
        borderWidth={2}
        borderColor={COLORS.DARK_BLUE}
        padding="5px"
        right={isMobile ? 5 : 10}
        top={
          filterButtonPosition === "fixed"
            ? isMobile
              ? 7
              : 5
            : isMobile
            ? 5
            : 3
        }
        cursor="pointer"
        onClick={() => {
          setOpenFilterModel(!openFilterModel);
        }}
        zIndex={10}
      >
        <Image
          alt="filter-icon"
          src={require("../../assets/filter-icon.png")}
          style={{
            width: isMobile ? "25px" : "40px",
            margin: "0.25rem",
            height: isMobile ? "25px" : "40px",
            objectFit: "contain",
          }}
        />
      </Flex>

      <FilterModal
        isVisible={openFilterModel}
        filters={filters}
        setFilters={setFilters}
        cars={cars}
      />
      <Flex
        pos="relative"
        flexDir="row"
        flexWrap="wrap"
        justifyContent="center"
        width={isMobile ? "75%" : "50%"}
        mb={20}
        zIndex={2}
      >
        {cars.length > 0 &&
          filteredCars.map((item, idx) => (
            <CarsListItem key={idx} car={item} />
          ))}
      </Flex>
    </Flex>
  );
};

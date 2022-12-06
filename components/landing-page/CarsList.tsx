import Image from "next/image";
import { Button, Flex, Text } from "@chakra-ui/react";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { db } from "../../helpers/firebase/firebaseConfig";
import { CarsListItem } from "../items/CarsListItem";
import { FilterModal, Filters } from "./FilterModal";
import { useMediaQuery } from "@material-ui/core";

export const CarsList = ({
  searchInput,
  carBrand,
}: {
  searchInput: string;
  carBrand?: string;
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
  const [carsTotalNumber, setCarsTotalNumber] = useState<number | null>(null);
  const [paginationLimit, setPaginationLimit] = useState(13);

  const getTotalCars = async () => {
    const snapshot = await getCountFromServer(collection(db, "cars"));

    setCarsTotalNumber(snapshot.data().count);
  };

  useEffect(() => {
    let carsQuery = query(
      collection(db, "cars"),
      carBrand
        ? where("Bilmärke.value", "==", carBrand)
        : limit(paginationLimit)
    );

    getDocs(carsQuery).then((snapchot) => {
      setCars([]);

      snapchot.forEach((childSnapchot) => {
        setCars((p: any) => [...p, childSnapchot.data()]);
      });
    });
  }, [paginationLimit]);

  useEffect(() => {
    getTotalCars();
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

  return (
    <Flex
      flexDir="column"
      mt={isMobile ? 5 : carBrand ? 0 : 20}
      w="100%"
      alignItems="center"
      minHeight={800}
    >
      <FilterModal
        filters={filters}
        setFilters={setFilters}
        cars={cars}
        isCarBrand={carBrand as string}
      />

      <Flex
        pos="relative"
        flexDir="row"
        flexWrap="wrap"
        justifyContent={isMobile ? "space-evenly" : "center"}
        width={isMobile ? "100%" : "70%"}
        mb={10}
        zIndex={2}
      >
        {cars.length > 0 &&
          filteredCars.map((item, idx) => (
            <CarsListItem key={idx} car={item} />
          ))}
      </Flex>

      {carsTotalNumber && !carBrand && (
        <Flex
          w="100%"
          flexDir="column"
          alignItems="center"
          pb={40}
          mb={20}
          borderBottomWidth={3}
          borderBottomColor="#F3F4F6"
        >
          <Text color="#15304B" mb={3} fontSize={18}>
            {`Visar ${paginationLimit - 1} av ${carsTotalNumber}`}
          </Text>

          <Flex w={350} bgColor="#F3F4F6" h={1} borderRadius={50} mb={7}>
            <Flex
              w={`${Math.round(paginationLimit * 100) / carsTotalNumber}%`}
              bgColor="#15304B"
              h={1}
              borderRadius={50}
            />
          </Flex>
          <Button
            borderRadius={50}
            bgColor="#F3F4F6"
            borderWidth={1}
            borderColor="#000000"
            p={"25px"}
            onClick={() => {
              if (paginationLimit !== carsTotalNumber) {
                setPaginationLimit(carsTotalNumber + 1);
              }
            }}
          >
            Visa fler leasingbilar
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

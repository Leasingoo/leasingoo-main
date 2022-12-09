import { Flex, Text, Image } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BreadcrumbsComponent } from "../components/BreadcrumbsComponent";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import { db } from "../helpers/firebase/firebaseConfig";

const CarBrandsPage = () => {
  const router = useRouter();
  const [carBrands, setCarBrands] = useState<any>([]);
  const isMobile = useMediaQuery("(max-width:1400px)");

  const getCarBrands = async () => {
    let cars: any[] = [];
    let carBrandsArr: any[] = [];

    await getDocs(collection(db, "cars")).then(async (snapchot) => {
      snapchot.forEach((childSnapchot) => {
        cars = [...cars, childSnapchot.data()];
      });
    });

    cars.forEach((item) => {
      carBrandsArr = [...carBrandsArr, item["Bilmärke"].value];
    });

    carBrandsArr = carBrandsArr.filter((value, index, array) => {
      return array.indexOf(value) === index;
    });

    return carBrandsArr;
  };

  useEffect(() => {
    getCarBrands().then((arr) => setCarBrands(arr));
  }, []);

  return (
    <Flex flexDir="column">
      <Navbar currentRoute={router.pathname} />

      <BreadcrumbsComponent
        additionalStyle={{
          marginLeft: isMobile ? "5%" : "20%",
        }}
      />

      <Flex
        mt={isMobile ? "20px" : 0}
        w="100%"
        flexDir="column"
        alignItems={"center"}
        justifyContent="center"
      >
        <Flex
          w={isMobile ? "100%" : "60%"}
          flexDir="column"
          p={isMobile ? 5 : 20}
          mb={20}
        >
          <Text
            fontSize={isMobile ? "35px" : "50px"}
            color="#15304B"
            fontWeight="bold"
            mb={5}
          >
            Vi listar idag totalt <br />8 st olika{" "}
            <span style={{ color: "#EF6D0A" }}>bilmärken!</span>
          </Text>

          <Text fontSize={20} color="#15304B" mb={20}>
            Vi har samlat ihop all relevant information gällande privatleasing
            från de olika bilmärkena. Ta en titt nedan efter olika bilmärken som
            intresserar dig, läs vidare kring vad de erbjuder och inspireras.
          </Text>

          {carBrands.length > 0 && (
            <Flex
              flexDir="row"
              flexWrap={"wrap"}
              alignItems="center"
              justifyContent={isMobile ? "space-around" : ""}
            >
              {carBrands.map((item: string, idx: number) => (
                <Flex
                  flexDir="column"
                  w={isMobile ? "170px" : "216px"}
                  h={isMobile ? "170px" : "216px"}
                  bgColor="#F3F4F6"
                  justifyContent="center"
                  alignItems="center"
                  m={isMobile ? 0 : 3}
                  mb={isMobile ? 3 : 0}
                  borderRadius={10}
                  cursor="pointer"
                  _hover={{ bgColor: "#cfd1d4" }}
                  onClick={() => {
                    router.push(`/car-brands/${item}`);
                  }}
                >
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/leasingoo.appspot.com/o/09cdc152%2FcarBrandImage?alt=media&token=81c7fe54-1d16-4f7c-b303-f7da6ca9980c"
                    w={"50px"}
                    h={"50px"}
                    mb={5}
                  />
                  <Text fontSize={20}>{item}</Text>
                </Flex>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default CarBrandsPage;

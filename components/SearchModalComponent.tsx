import {
  Flex,
  Image,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import { collection, getDocs } from "firebase/firestore";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../helpers/firebase/firebaseConfig";

export const SearchModalComponent = ({
  searchModalVisible,
  closeSearchModal,
}: {
  searchModalVisible: boolean;
  closeSearchModal: () => void;
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([
    {
      type: "Bilar",
      arrName: "cars",
      nameRef: "Namn",
      arr: [],
      displayArr: [],
      route: "/car-brands/",
    },
    {
      type: "Bilmärken",
      arrName: "carBrands",
      nameRef: "Name",
      arr: [],
      displayArr: [],
      route: "/car-brands/",
    },
    {
      type: "Bilhandlare",
      arrName: "retailers",
      nameRef: "Företagsnamn",
      arr: [],
      displayArr: [],
      route: "/retailers/",
    },
  ]);

  useEffect(() => {
    let searchResultsArr = [...searchResults];
    searchResults.forEach((searchResult: any, idx: number) => {
      getDocs(collection(db, `/${searchResult.arrName}`)).then((snapchot) => {
        searchResult.arr = [];
        snapchot.forEach((childSnapchot) => {
          searchResultsArr[idx].arr = [
            ...searchResultsArr[idx].arr,
            childSnapchot.data(),
          ];
        });
      });
    });

    setSearchResults(searchResultsArr);
  }, []);

  useEffect(() => {
    let searchResultsArr = [...searchResults];
    searchResults.forEach((result: any, idx: number) => {
      if (searchTerm) {
        result.displayArr = result.arr.filter((item: any) =>
          item[result.nameRef].value
            .toUpperCase()
            .includes(searchTerm.toUpperCase())
        );
      } else {
        result.displayArr = [];
      }
    });

    setSearchResults(searchResultsArr);
  }, [searchTerm]);

  return (
    <Modal isOpen={searchModalVisible} onClose={closeSearchModal}>
      <ModalOverlay />
      <ModalContent
        position="absolute"
        left={isMobile ? 0 : "20%"}
        top={isMobile ? 0 : 3}
        bgColor={"#F3F4F6"}
        borderRadius={10}
        alignItems="center"
        animation="ease-in-out"
        maxW={isMobile ? "100%" : "500px"}
        h={isMobile ? "100%" : ""}
        p={5}
        margin={0}
      >
        {isMobile && (
          <Flex
            pos="absolute"
            top={5}
            left={isMobile ? "" : 5}
            right={isMobile ? 5 : ""}
            flexDir="row"
            cursor="pointer"
            alignItems="center"
            bgColor="#fff"
            h="50px"
            borderRadius={50}
            pr={3}
            pl={3}
            onClick={closeSearchModal}
          >
            <NextImage
              alt="close-icon"
              src={require("../assets/close-icon.png")}
            />
            {!isMobile && (
              <Text color="#15304B" margin={3} fontWeight={500}>
                Stäng
              </Text>
            )}
          </Flex>
        )}

        <Flex
          flexDir="column"
          w={isMobile ? "100%" : ""}
          mt={isMobile ? 20 : 0}
        >
          <Input
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            autoFocus={true}
            onBlur={({ target }) => target.focus()}
            mb={3}
            bgColor="#fff"
            borderRadius={50}
            w="90%"
            alignSelf="center"
          />
          <Flex
            flexDir="column"
            w={isMobile ? "100%" : "500px"}
            bgColor="#F3F4F6"
            alignItems="center"
          >
            <Text
              color="#15304B"
              fontSize={20}
              fontWeight="bold"
              textAlign="center"
              mb={5}
            >
              Visar alla träffar på <br />‘{searchTerm}’
            </Text>

            {searchResults.map((item, i) => (
              <Flex key={i} flexDir="column" w="90%" mb={5}>
                <Text color="#15304B" fontSize={18} fontWeight={600} mb={3}>
                  {item.type}
                </Text>

                <Flex flexDir="column" w="100%" maxH="250px" overflow="auto">
                  {item.displayArr.length > 0 ? (
                    item.displayArr.map((result: any, idx: number) => (
                      <Flex
                        key={idx}
                        flexDir="row"
                        bgColor="#fff"
                        borderRadius={5}
                        w="100%"
                        h="80px"
                        p={5}
                        alignItems="center"
                        justifyContent="space-between"
                        mb={3}
                        cursor="pointer"
                        onClick={() => {
                          closeSearchModal();
                          router.push(
                            `/${item.route}${
                              i === 0 ? result["Bilmärke"].value : ""
                            }/${result[item.nameRef].value.replaceAll(
                              " ",
                              "_"
                            )}`
                          );
                        }}
                      >
                        <Flex flexDir="column">
                          <Text
                            color="#15304B"
                            fontWeight={i === 0 ? 500 : "bold"}
                          >
                            {result[item.nameRef].value}
                          </Text>
                          {i === 0 && (
                            <Text color="#15304B" fontWeight={"bold"}>
                              {"fr. " + result["Pris"].value}
                            </Text>
                          )}
                        </Flex>

                        {i !== 2 ? (
                          <Image
                            src="https://firebasestorage.googleapis.com/v0/b/leasingoo.appspot.com/o/09cdc152%2FcarImage?alt=media&token=0f8492bc-863a-487f-829b-c411aa29760f"
                            w="110px"
                          />
                        ) : (
                          <NextImage
                            alt={"search-result-image"}
                            src={require("../assets/nav-items/retailers-icon-inactive.png")}
                          />
                        )}
                      </Flex>
                    ))
                  ) : (
                    <Text color="#15304B">No results</Text>
                  )}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

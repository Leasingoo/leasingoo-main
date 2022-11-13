import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteItem } from "../../helpers/admin/deleteProduct";
import { db } from "../../helpers/firebase/firebaseConfig";

export const RequestsComponent = ({ id }: { id: string }) => {
  const [requestInfo, setRequestInfo] = useState();
  const [infoKeys, setInfoKeys] = useState([
    "Namn",
    "Efternamn",
    "E-post",
    "Telefonnummer",
    "Retailer link",
    "Car link",
  ]);

  useEffect(() => {
    getDoc(doc(db, `requests/${id}`)).then((request) => {
      setRequestInfo(request.data() as any);
    });
  }, []);

  return requestInfo ? (
    <Flex
      flexDir="column"
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDir="column" alignItems="flex-start" mb={20}>
        {infoKeys.map((infoKey, idx) => (
          <Flex
            key={idx}
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-around"
              width="80%"
              mb="20px"
              key={idx}
            >
              <Input
                width="32%"
                placeholder="Field key"
                borderColor="gray"
                value={infoKey}
              />
              <Input
                width="62%"
                borderColor="gray"
                placeholder="Field value"
                value={requestInfo[infoKey]}
              />
            </Flex>

            <Text
              color="#1d1d1d"
              fontWeight="bold"
              cursor="pointer"
              padding={2}
              mt={-5}
              backgroundColor="#d9d7d7"
              borderRadius={10}
              onClick={() => {
                navigator.clipboard.writeText(requestInfo[infoKey]);
              }}
            >
              Copy value
            </Text>
          </Flex>
        ))}
      </Flex>

      <Button
        backgroundColor="#1d1d1d"
        color="#fff"
        onClick={() => {
          deleteItem("requests", id);
        }}
      >
        Delete request
      </Button>
    </Flex>
  ) : (
    <div>no info</div>
  );
};

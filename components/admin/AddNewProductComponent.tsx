import { Button, Flex, Heading, Image, Input, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteItem } from "../../helpers/admin/deleteProduct";
import { db } from "../../helpers/firebase/firebaseConfig";
import { additionalFieldsType } from "../../types/additionalFieldsType";
import { AddNewProductType } from "../../types/productTypes";

const AddNewProductComponent = ({
  dbRef,
  premadeFields,
  pageTitle,
  addNewProductFunc,
  id,
  router,
}: AddNewProductType) => {
  const [additionalFields, setAdditionalFields] =
    useState<additionalFieldsType[]>(premadeFields);
  const [carBrandImageFile, setCarBrandImageFile] = useState<any>();
  const [carImageFile, setCarImageFile] = useState<any>();
  const [beginProcess, setBeginProcess] = useState<boolean>(false);

  const addField = () => {
    setAdditionalFields((previousFields) => [
      ...previousFields,
      { key: "", value: "", order: additionalFields.length + 1 },
    ]);
  };

  const onChangeField = async (
    changeType: "key" | "value",
    fieldIndex: number,
    newText: string
  ) => {
    let fieldsArr = [...additionalFields];

    switch (changeType) {
      case "key":
        fieldsArr[fieldIndex].key = newText;
        break;
      case "value":
        fieldsArr[fieldIndex].value = newText;
        break;
    }

    setAdditionalFields(fieldsArr);
  };

  const deleteField = async (fieldIndex: number) => {
    let newFieldsArr = [...additionalFields];
    newFieldsArr.splice(fieldIndex, 1);

    setAdditionalFields(newFieldsArr);
  };

  useEffect(() => {
    if (id !== "new") {
      getDoc(doc(db, `${dbRef}/${id}`)).then(async (productElement) => {
        setAdditionalFields([]);
        let productObj: any = productElement.data();
        let additionalFieldsArr = Object.entries(productObj);

        additionalFieldsArr.forEach((elementArr: any) => {
          setAdditionalFields((previousFields) => [
            ...previousFields,
            {
              key: elementArr[1].key,
              value: elementArr[1].value,
              order: elementArr[1].order,
              disabled: elementArr[1].disabled,
            },
          ]);
        });
      });
    }
  }, []);

  return (
    <Flex
      flexDir="column"
      width="100%"
      height="100vh"
      alignItems={"center"}
      backgroundColor="#cecece"
      overflowY="auto"
    >
      <Heading mt={5} mb={20}>
        {pageTitle}
      </Heading>

      <Flex
        flexDir="column"
        width="60%"
        borderRadius={10}
        backgroundColor="#f7f7f7"
        padding={5}
        justifyContent="center"
        alignItems="center"
      >
        {additionalFields
          .sort((a, b) => a.order - b.order)
          .map((field, idx) => (
            <Flex
              key={idx}
              flexDir="row"
              alignItems="center"
              justifyContent="center"
              width="83%"
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
                  width="49%"
                  disabled={field.disabled || field.key === "id"}
                  placeholder="Field key"
                  borderColor="gray"
                  value={field.key}
                  onChange={(e: any) => {
                    onChangeField("key", idx, e.target.value);
                  }}
                />
                <Input
                  width="49%"
                  disabled={field.key === "id"}
                  borderColor="gray"
                  placeholder="Field value"
                  value={field.value}
                  onChange={(e: any) => {
                    onChangeField("value", idx, e.target.value);
                  }}
                />
              </Flex>

              {field.key !== "id" && (
                <Text
                  color="red"
                  onClick={() => {
                    deleteField(idx);
                  }}
                  fontWeight="bold"
                  cursor="pointer"
                  padding={2}
                  mt={-5}
                >
                  Delete
                </Text>
              )}
            </Flex>
          ))}

        {pageTitle === "Add new car" && (
          <Flex flexDir="column" width="100%" alignItems="center">
            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-around"
              width="80%"
              mb="20px"
            >
              <Text color="#1D1D1D" fontSize={20} fontWeight="bold">
                Car brand logo
              </Text>

              <Flex flexDir="row" alignItems="center">
                {id !== "new" && (
                  <Image
                    mr={5}
                    w="100px"
                    src={
                      additionalFields.filter(
                        (item) => item.key === "carBrandImageLink"
                      ).length > 0
                        ? additionalFields.filter(
                            (item) => item.key === "carBrandImageLink"
                          )[0].value
                        : ""
                    }
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setCarBrandImageFile(e.target.files && e.target.files[0]);
                  }}
                ></input>
              </Flex>
            </Flex>

            <Flex
              flexDir="row"
              alignItems="center"
              justifyContent="space-around"
              width="80%"
              mb="20px"
            >
              <Text color="#1D1D1D" fontSize={20} fontWeight="bold">
                Car Image
              </Text>
              <Flex flexDir="row" alignItems="center">
                {id !== "new" && (
                  <Image
                    mr={5}
                    w="100px"
                    src={
                      additionalFields.filter(
                        (item) => item.key === "carImageLink"
                      ).length > 0
                        ? additionalFields.filter(
                            (item) => item.key === "carImageLink"
                          )[0].value
                        : ""
                    }
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setCarImageFile(e.target.files && e.target.files[0]);
                  }}
                ></input>
              </Flex>
            </Flex>
          </Flex>
        )}

        <Flex width="80%">
          <Button
            backgroundColor="#1D1D1D"
            color="white"
            mb="40px"
            width={200}
            onClick={addField}
          >
            Add new key value pair
          </Button>
        </Flex>

        <Flex flexDir="row" alignItems="center" justifyContent="space-between">
          <Button
            isLoading={beginProcess}
            backgroundColor="#1D1D1D"
            color="white"
            onClick={() => {
              switch (dbRef) {
                case "carBrands":
                  addNewProductFunc(
                    additionalFields,
                    id,
                    setBeginProcess,
                    router
                  );
                  break;
                case "cars":
                  addNewProductFunc(
                    additionalFields,
                    id,
                    carImageFile,
                    carBrandImageFile,
                    setBeginProcess,
                    router
                  );
                  break;
                case "retailers":
                  addNewProductFunc(
                    additionalFields,
                    id,
                    setBeginProcess,
                    router
                  );
                  break;
              }
            }}
          >
            {id !== "new" ? "Save changes" : pageTitle}
          </Button>

          {id !== "new" && (
            <Button
              backgroundColor="#1D1D1D"
              color="white"
              onClick={() => {
                deleteItem(dbRef, id);
              }}
              margin={10}
            >
              Delete item
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddNewProductComponent;

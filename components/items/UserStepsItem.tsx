import { Flex, Image, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import { userStepsDataType } from "../../helpers/footer/userStepsData";
import { COLORS } from "../../helpers/globalColors";
// import { isMobile } from "../../helpers/isMobile";

export const UserStepsItem = ({ item }: { item: userStepsDataType }) => {
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center" mb={0}>
      <Image src={item.icon} width="60px" height="60px" mb="5px" />

      <Text
        color="#fff"
        fontWeight="bold"
        fontSize={23}
        flexDir="row"
        mb="10px"
      >
        {item.title}
        <span style={{ color: COLORS.ORANGE }}>{item.colored}</span>
      </Text>

      <Text width="80%" color="#FFFFFF" fontSize={17} textAlign="center">
        {item.description}
      </Text>
    </Flex>
  );
};

import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import { COLORS } from "../../helpers/globalColors";

interface socialMediaItemType {
  icon: string;
  url: string;
  name: string;
}

export const SocialMediaButtonItem = ({
  item,
}: {
  item: socialMediaItemType;
}) => {
  return (
    <a href={item.url} target="_blank">
      <Flex
        backgroundColor={COLORS.ORANGE}
        width={8}
        height={8}
        justifyContent="center"
        alignItems="center"
        margin={1}
        cursor="pointer"
        borderRadius={5}
      >
        <Image
          alt="social-media-icon"
          src={item.icon}
          style={{
            width: item.name === "instagram" ? "2rem" : "1rem",
            height: item.name === "instagram" ? "2rem" : "1rem",
          }}
        />
      </Flex>
    </a>
  );
};

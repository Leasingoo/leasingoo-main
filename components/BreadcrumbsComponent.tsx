import { Breadcrumb, BreadcrumbItem, Button } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { breadcrumbsRoutes } from "../helpers/static-data/breadcrumbsData";

export const BreadcrumbsComponent = ({
  additionalStyle,
}: {
  additionalStyle?: any;
}) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Breadcrumb
      style={{
        alignSelf: "flex-start",
        marginTop: isMobile ? "120px" : "150px",
        marginLeft: isMobile ? 0 : "20%",
        ...additionalStyle,
      }}
      separator={
        <Image
          alt="arrow-icon"
          src={require("../assets/arrow-icon.png")}
          style={{ transform: "rotate(90deg)", width: isMobile ? 25 : 35 }}
        />
      }
    >
      {router.asPath
        .toString()
        .split("/")
        .map((item, i) => (
          <BreadcrumbItem key={i}>
            <Button
              borderRadius={50}
              bgColor="#fff"
              color="#15304B"
              fontWeight={500}
              fontSize={isMobile ? 15 : 18}
              _hover={{
                backgroundColor:
                  i !== router.asPath.toString().split("/").length - 1
                    ? "#cacfd4"
                    : "#fff",
              }}
              onClick={() => {
                if (i !== router.asPath.toString().split("/").length - 1) {
                  router.push(
                    `/${
                      i !== 0
                        ? router.asPath.toString().split("/")[i - 1] + "/"
                        : ""
                    }${item}`
                  );
                }
              }}
            >
              {isMobile
                ? breadcrumbsRoutes[item] ??
                  item
                    .replaceAll("_", " ")
                    .replaceAll("%C3%AB", "ë")
                    .replaceAll("%C3%B6", "ö")
                    .substring(0, 15) +
                    (item
                      .replaceAll("_", " ")
                      .replaceAll("%C3%AB", "ë")
                      .replaceAll("%C3%B6", "ö")
                      .split("").length > 15
                      ? "..."
                      : "")
                : breadcrumbsRoutes[item] ?? item}
            </Button>
          </BreadcrumbItem>
        ))}
    </Breadcrumb>
  );
};

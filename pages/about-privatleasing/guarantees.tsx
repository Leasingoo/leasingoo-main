import { Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { BreadcrumbsComponent } from "../../components/BreadcrumbsComponent";
import { Footer } from "../../components/landing-page/Footer";
import { Navbar } from "../../components/landing-page/Navbar";
import { StaticTextContainer } from "../../components/landing-page/StaticTextContainer";
import { guaranteesPageData } from "../../helpers/static-data/guaranteesPageData";
import Head from "next/head";

export const GuanranteesPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <Head>
        <title>Garantier - Leasingoo</title>
        <meta name="description" content="Garantier" />
      </Head>
      <Navbar currentRoute={router.pathname} />
      <BreadcrumbsComponent additionalStyle={{ marginBottom: "50px" }} />

      <Flex
        flexDir="row"
        w={isMobile ? "95%" : "55%"}
        alignItems="center"
        justifyContent="space-between"
        mt={isMobile ? 0 : 10}
        mb={isMobile ? 10 : 0}
      >
        <Text
          color="#15304B"
          fontSize={isMobile ? 35 : 50}
          fontWeight="bold"
          mb={5}
        >
          Garantier är <span style={{ color: "#EF6D0A" }}>viktigt!</span>
        </Text>

        {!isMobile && (
          <Image
            src={require("../../assets/guarantees1-image.png")}
            alt={"image1"}
          />
        )}
      </Flex>

      {guaranteesPageData.map((item, i: number) => (
        <StaticTextContainer item={item as any} i={i} noButtons />
      ))}

      <Footer />
    </Flex>
  );
};

export default GuanranteesPage;

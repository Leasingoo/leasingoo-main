import { Button, Flex, Text } from "@chakra-ui/react";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { BreadcrumbsComponent } from "../components/BreadcrumbsComponent";
import { Footer } from "../components/landing-page/Footer";
import { Navbar } from "../components/landing-page/Navbar";
import {
  privatleasingFooterData,
  privatleasingTopData,
} from "../helpers/static-data/privatleasingPageData";

const aboutPrivatleasingPage = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:1400px)");

  return (
    <Flex w="100%" flexDir="column" alignItems="center">
      <Navbar currentRoute={router.pathname} />
      <BreadcrumbsComponent additionalStyle={{ marginBottom: "50px" }} />

      <Flex
        flexDir="row"
        w={isMobile ? "95%" : "60%"}
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
          Fördelar med en <br />
          <span style={{ color: "#EF6D0A" }}>privatleasing!</span>
        </Text>

        {!isMobile && (
          <Image
            src={require("../assets/about-privatleasing-image1.png")}
            alt={"image1"}
          />
        )}
      </Flex>

      <Flex
        flexDir="column"
        w="100%"
        bgColor={"#F3F4F6"}
        justifyContent="center"
        alignItems="center"
        p={isMobile ? 10 : 150}
      >
        <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb={isMobile ? 5 : 10}
          >
            Detta är <span style={{ color: "#EF6D0A" }}>privatleasing</span>
          </Text>
          <Text
            fontSize={isMobile ? 18 : 20}
            color="#15304B"
            fontWeight={400}
            textAlign="start"
            mb={10}
          >
            I väldigt korta drag så är privatleasing en sorts långtidshyra där
            man betalar en månadsavgift för att under en viss period ha tillgång
            till bilen utan att själv behöva ansvara för all skötsel. I
            månadsavgiften ingår i de flesta fall försäkring, service,
            garantier, vägassistans och en viss körsträcka. Värt att tänka på är
            att eventuella förmåner i många fall varierar beroende på vilket
            företag man väljer att finansiera bilen med. Därför bör du alltid
            bekanta sig med villkoren. När leasingperioden har tagit slut så
            återlämnar man helt enkelt bilen.
          </Text>
          <Button
            flexDir="row"
            alignItems="center"
            justifyContent="space-evenly"
            w={isMobile ? "100%" : "40%"}
            bgColor={"#15304B"}
            borderRadius={40}
            p={7}
            _hover={{ backgroundColor: "gray" }}
            onClick={() => {
              router.push("/");
            }}
          >
            <Text color="#fff">Jämför privatleasing</Text>
            <Image
              src={require(`../assets/redirect-arrow.png`)}
              alt={"redirect-arrow"}
            />
          </Button>
        </Flex>
      </Flex>

      {privatleasingTopData.map((item, i) => (
        <Flex
          key={i}
          flexDir="column"
          w="100%"
          bgColor={item.bgColor}
          justifyContent="center"
          alignItems="center"
          p={isMobile ? 10 : 150}
        >
          <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
            <Text
              color="#15304B"
              fontSize={isMobile ? "30px" : "40px"}
              fontWeight="bold"
              mb={isMobile ? 5 : 10}
            >
              {item.title}{" "}
            </Text>
            <Text
              fontSize={isMobile ? 18 : 20}
              color="#15304B"
              fontWeight={400}
              textAlign="start"
              mb={10}
            >
              {item.text}
            </Text>
          </Flex>
        </Flex>
      ))}

      <Flex
        flexDir="column"
        w="100%"
        bgColor={"#F3F4F6"}
        justifyContent="center"
        alignItems="center"
        p={isMobile ? 10 : 150}
      >
        <Flex
          flexDir="column"
          w={isMobile ? "100%" : "70%"}
          alignItems="center"
        >
          <Text
            color="#15304B"
            fontSize={isMobile ? "30px" : "40px"}
            fontWeight="bold"
            mb={isMobile ? 5 : 20}
          >
            Viktigt att <span style={{ color: "#EF6D0A" }}>tänka på!</span>
          </Text>

          <Flex
            flexDir={isMobile ? "column" : "row"}
            justifyContent="space-evenly"
          >
            <Flex flexDir="column" w={isMobile ? "90%" : "40%"}>
              <Text
                fontSize={20}
                color="#15304B"
                fontWeight={"bold"}
                textAlign="start"
                mb={10}
              >
                Ta hand om din bil så slipper du onödiga kostnader.
              </Text>
              <Text
                fontSize={isMobile ? 18 : 20}
                color="#15304B"
                fontWeight={400}
                textAlign="start"
                mb={10}
              >
                Så länge du sköter din leasade bil så kommer det inte att uppstå
                några problem när du väl lämnar tillbaka den efter
                avtalsperiodens slut. Men om olyckan är framme eller det
                oväntade händer så är det viktigt att direkt kontakta
                leasingföretaget för att på bästa sätt åtgärda det hela. Annars
                riskerar du att få betala avgifter för onormalt slitage. Men
                detta går även att jämföra med bilägande då bilens värde hade
                minskat i förhållande till de skador som uppstått.
              </Text>
            </Flex>

            <Flex flexDir="column" w={isMobile ? "90%" : "40%"}>
              <Text
                fontSize={20}
                color="#15304B"
                fontWeight={"bold"}
                textAlign="start"
                mb={10}
              >
                Det blir troligen ingen bilsemester i Europa.{" "}
              </Text>
              <Text
                fontSize={isMobile ? 18 : 20}
                color="#15304B"
                fontWeight={400}
                textAlign="start"
                mb={10}
              >
                Att det har blivit populärt med bilsemester i Europa är ingen
                hemlighet. Men då du med en leasingbil i de flesta fall har en
                fast körsträcka är det inte säkert att sträckan är tillräckligt
                omfattande för att täcka en långsemester. Om du däremot äger din
                bil finns det så klart inga begränsningar gällande hur långt du
                kan åka. Annat än bensinkostnaden förstås.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {privatleasingFooterData.map((item, i) => (
        <Flex
          key={i}
          flexDir="column"
          w="100%"
          bgColor={item.bgColor}
          justifyContent="center"
          alignItems="center"
          p={isMobile ? 10 : 150}
        >
          <Flex flexDir="column" w={isMobile ? "100%" : "50%"}>
            <Text
              color="#15304B"
              fontSize={isMobile ? "30px" : "40px"}
              fontWeight="bold"
              mb={isMobile ? 5 : 10}
            >
              {item.title}{" "}
            </Text>
            <Text
              fontSize={isMobile ? 18 : 20}
              color="#15304B"
              fontWeight={400}
              textAlign="start"
              mb={10}
            >
              {item.text}
            </Text>

            <Button
              flexDir="row"
              alignItems="center"
              justifyContent="space-evenly"
              w={isMobile ? "100%" : "40%"}
              bgColor={"#15304B"}
              borderRadius={40}
              p={7}
              _hover={{ backgroundColor: "gray" }}
              onClick={() => {
                router.push(item.route);
              }}
            >
              <Text color="#fff">{item.buttonText}</Text>
              <Image
                src={require(`../assets/redirect-arrow.png`)}
                alt={"redirect-arrow"}
              />
            </Button>
          </Flex>
        </Flex>
      ))}

      <Footer />
    </Flex>
  );
};

export default aboutPrivatleasingPage;

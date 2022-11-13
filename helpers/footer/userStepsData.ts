export interface userStepsDataType {
  title: string;
  description: string;
  colored: string;
  icon: string;
}

export const userStepsData: userStepsDataType[] = [
  {
    title: "Välj dröm",
    colored: "bilen",
    description:
      "Vi har gjort det enkelt att hitta rätt bil. Sortera efter dina önskemål och leta enkelt fram drömbilen.",
    icon: require("../../assets/CHOOSE.png"),
  },
  {
    title: "Välj återför",
    colored: "säljare",
    description:
      "Vi har samlat de närmaste återförsäljarna i din stad som säljer din drömbil. Bara att klicka och välja!",
    icon: require("../../assets/DEALER.png"),
  },
  {
    title: "Skicka intresse",
    colored: "formulär",
    description:
      "Vi har gjort det enkelt att få kontakt med återförsäljare. Fyll i formuläret så kontaktar återförsäljaren dig snarast.",
    icon: require("../../assets/MAIL.png"),
  },
  {
    title: "Träffa återförsäljare",
    colored: "säljare",
    description:
      "Nu kan ni se över bilen, gå igenom extrautrustning och anpassa avtalet utefter dina önskemål.",
    icon: require("../../assets/CHAT.png"),
  },
];

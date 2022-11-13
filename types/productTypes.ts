import { additionalFieldsType } from "./additionalFieldsType";

export interface carBrandType {
  name: string;
  description: string;
  logo: string;
}

export interface carType {
  brand: string;
  brandLogo: string;
  name: string;
  description: string;
  drive: string;
  driveBox: string;
  fuel: string;
  award: string;
  image: string;
  gallery: Array<string>;
  contractDuration: string;
  miles: string;
  warranty: string;
  co2: string;
  enginePower: string;
  emissionsMixedDriving: string;
  emissionsCountryRoad: string;
  wheels: string;
  towbar: string;
  luggage: string;
  acceleration: string;
  invoiceFee: string;
  setupFee: string;
  overMileCost: string;
}

export interface retailerType {
  name: string;
  phoneNumber: string;
  logo: string;
  email: string;
  street: string;
  postalCode: string;
}

export interface AddNewProductType {
  dbRef: string;
  premadeFields: additionalFieldsType[];
  pageTitle: string;
  addNewProductFunc: any;
  id: string;
  router: any;
}

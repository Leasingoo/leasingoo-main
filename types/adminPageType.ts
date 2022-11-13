import { carBrandType, carType, retailerType } from "./productTypes";

export interface adminCarbrandType {
  name: string;
  arr: Array<carBrandType>;
}

export interface adminCarType {
  name: string;
  arr: Array<carType>;
}

export interface adminRetailerType {
  name: string;
  arr: Array<retailerType>;
}

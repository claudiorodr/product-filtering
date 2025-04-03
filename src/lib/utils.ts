import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { operators, properties } from "@/data/datastore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOperatorsOfProperty = (propertyId: number) => {
  const typeOfProperty = properties.find(
    (property) => property.id === propertyId,
  )?.type;

  switch (typeOfProperty) {
    case "string":
      return operators.filter(
        (operator) =>
          operator.id === "equals" ||
          operator.id === "any" ||
          operator.id === "none" ||
          operator.id === "in" ||
          operator.id === "contains",
      );
    case "number":
      return operators.filter(
        (operator) =>
          operator.id === "equals" ||
          operator.id === "greater_than" ||
          operator.id === "less_than" ||
          operator.id === "any" ||
          operator.id === "none" ||
          operator.id === "in",
      );
    case "enumerated":
      return operators.filter(
        (operator) =>
          operator.id === "equals" ||
          operator.id === "any" ||
          operator.id === "none" ||
          operator.id === "in",
      );
    default:
      return [];
  }
};

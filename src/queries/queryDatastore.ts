// @ts-nocheck

import { operators, products, properties } from "@/data/datastore";
import { getOperatorsOfProperty } from "@/lib/utils";
import { OPERATORS } from "@/types/store";

export const fetchProperties = () => properties;
export const fetchOperators = () => operators;
export const fetchProducts = () => products;
export const fetchOperatorsByProperty = (propertyId: number) =>
  getOperatorsOfProperty(propertyId);

export const fetchProductsByFilters = (
  propertyId: number,
  operator: OPERATORS,
  value: string,
) => {
  if (!propertyId || !operator || !value) return products;

  return products.filter((product) => {
    const property = product.property_values.find(
      (property) => property.property_id === propertyId,
    );
    if (!property) return false;

    switch (operator) {
      case "equals":
        return property.value === value;
      case "greater_than":
        return parseFloat(property.value) > parseFloat(value);
      case "less_than":
        return parseFloat(property.value) < parseFloat(value);
      case "contains":
        return property.value.includes(value);

      default:
        return false;
    }
  });
};

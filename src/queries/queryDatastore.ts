// Importing data and utility functions from the project
import { operators, products, properties } from "@/data/datastore";
import { getOperatorsOfProperty } from "@/lib/utils";
import { OPERATORS, Property } from "@/types/store";

// Fetches all available properties from the datastore
export const fetchProperties = () => properties;

// Fetches all available operators from the datastore
export const fetchOperators = () => operators;

// Fetches all available products from the datastore
export const fetchProducts = () => products;

// Fetches operators associated with a specific property by its ID
export const fetchOperatorsByProperty = (propertyId: number) =>
  getOperatorsOfProperty(propertyId);

/**
 * Filters products based on the provided property ID, operator, and value.
 *
 * @param propertyId - The ID of the property to filter by (nullable).
 * @param operator - The operator to apply for filtering (nullable).
 * @param value - The value to compare against (nullable).
 * @returns An array of filtered products or all products if no valid filters are provided.
 */
export const fetchProductsByFilters = (
  propertyId: Property["id"] | null,
  operator: OPERATORS | null,
  value: string | null,
) => {
  // If no property ID or operator is provided, return all products
  if (propertyId == null || operator == null) return products;

  // Filter products based on the provided filters
  return products.filter((product) => {
    // Find the property value associated with the given property ID
    const property = product.property_values.find(
      (property) => property.property_id === propertyId,
    );

    // Apply the filtering logic based on the operator
    switch (operator) {
      case "equals":
        // Check if the property value equals the provided value
        return property?.value == value;

      case "greater_than":
        // Check if the property value is greater than the provided value
        return property?.value > value;

      case "less_than":
        // Check if the property value is less than the provided value
        return property?.value < value;

      case "any":
        // Check if the product has any property with the given property ID
        return product.property_values.some(
          (property) => property.property_id === propertyId,
        );

      case "none":
        // Check if the product has no property with the given property ID
        return !product.property_values.some(
          (property) => property.property_id === propertyId,
        );

      case "in":
        // Check if the property value is included in a comma-separated list of values
        return value.split(",").includes(property?.value?.toString());

      case "contains":
        // Check if the property value contains the provided value as a substring
        return property?.value.toString().includes(value);

      default:
        // Return false for unsupported operators
        return false;
    }
  });
};

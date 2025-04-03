export type OPERATORS =
  | "equals"
  | "greater_than"
  | "less_than"
  | "any"
  | "none"
  | "in"
  | "contains";

export type TYPES = "string" | "number" | "enumerated";

export type PROPERTIES =
  | "Product Name"
  | "color"
  | "weight (oz)"
  | "category"
  | "wireless";

export type Operator = {
  text: string;
  id: OPERATORS;
};

export type Property = {
  id: number;
  name: PROPERTIES;
  type: TYPES;
  values?: string[];
};

export type Product = {
  id: number;
  property_values: {
    property_id: Property["id"];
    value: string | number;
  }[];
};

"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fetchOperatorsByProperty,
  fetchProperties,
} from "@/queries/queryDatastore";
import { OPERATORS } from "@/types/store";

export const ProductFilter = ({
  filters: { operator, property, value },
}: {
  filters: {
    property: {
      selectedProperty: number | null;
      setSelectedProperty: (propertyId: number) => void;
    };
    operator: {
      selectedOperator: OPERATORS | null;
      setSelectedOperator: (operatorId: OPERATORS) => void;
    };
    value: {
      propertyValue: string;
      setPropertyValue: (value: string) => void;
    };
  };
}) => {
  const { selectedProperty, setSelectedProperty } = property;
  const { selectedOperator, setSelectedOperator } = operator;
  const { propertyValue, setPropertyValue } = value;
  const properties = fetchProperties();

  const operators =
    selectedProperty !== null ? fetchOperatorsByProperty(selectedProperty) : [];

  return (
    <div className="flex items-center gap-2 py-4">
      <Select onValueChange={(value) => setSelectedProperty(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a property" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {properties.map((property) => (
              <SelectItem key={property.id} value={String(property.id)}>
                {property.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setSelectedOperator(value as OPERATORS)}
      >
        <SelectTrigger className="w-[180px]" disabled={operators.length === 0}>
          <SelectValue placeholder="Select an operator" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {operators.map((operator) => (
              <SelectItem key={operator.id} value={operator.id}>
                {operator.text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        placeholder="Property Value"
        disabled={
          selectedProperty === null ||
          selectedOperator === null ||
          selectedOperator === "any" ||
          selectedOperator === "none"
        }
        value={propertyValue}
        onChange={(event) => setPropertyValue(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

import React, { useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import { ProductFilter } from "@/components/product-filter";
import { ProductTable } from "@/components/product-table";
import { fetchProductsByFilters } from "@/queries/queryDatastore";
import { OPERATORS } from "@/types/store";

export const Route = createFileRoute("/")({
  component: ProductFiltering,
});

function ProductFiltering() {
  const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<OPERATORS | null>(
    null,
  );
  const [propertyValue, setPropertyValue] = useState<string>("");

  const filters = {
    property: {
      selectedProperty,
      setSelectedProperty,
    },
    operator: {
      selectedOperator,
      setSelectedOperator,
    },
    value: {
      propertyValue,
      setPropertyValue,
    },
  };

  const products = fetchProductsByFilters(
    selectedProperty,
    selectedOperator,
    propertyValue,
  );

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to Salsify Product Filtering!
          </h2>
          <p className="text-muted-foreground">
            Let&apos;s filter those products!
          </p>
        </div>
      </div>
      <div className="w-full">
        <ProductFilter filters={filters} />
        <ProductTable products={products} />
      </div>
    </div>
  );
}

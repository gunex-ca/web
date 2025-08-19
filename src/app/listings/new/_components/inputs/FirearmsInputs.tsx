"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { AsyncComboBox } from "./AsyncComboBox";

export const FirearmsManufacturerInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // debounce search value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: manufacturers, isLoading } =
    api.search.manufacturers.useQuery(debouncedSearch);
  return (
    <AsyncComboBox
      isLoading={isLoading}
      value={value}
      onChange={onChange}
      options={[
        { label: "(Other)", value: "Other" },
        ...(manufacturers?.map((manufacturer) => ({
          label: manufacturer.manufacturer,
          value: manufacturer.manufacturer,
        })) ?? []),
      ]}
      onSearchChange={(value) => {
        setSearch(value);
      }}
    />
  );
};

export const FirearmsManufacturerModelInput: React.FC<{
  manufacturer: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ manufacturer, value, onChange }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // debounce search value
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const { data: models = [], isLoading } =
    api.search.manufacturerModels.useQuery(
      {
        manufacturer,
        q: debouncedSearch,
      },
      { enabled: manufacturer !== "" },
    );

  return (
    <AsyncComboBox
      isLoading={isLoading}
      disabled={manufacturer === "" || value === "Other"}
      value={value}
      onChange={onChange}
      options={[
        { label: "(Other)", value: "Other" },
        ...(models?.map((model) => ({
          label: model,
          value: model,
        })) ?? []),
      ]}
      onSearchChange={(value) => {
        setSearch(value);
      }}
    />
  );
};

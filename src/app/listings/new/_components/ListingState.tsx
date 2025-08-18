"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type ListingFormState = {
  title: string;
  description: string;
  price: number;
  condition: string;
  categoryId: string;
  subCategory: string;
  properties: Record<string, string | number>;
  images: { id: string; url: string; alt?: string; sortOrder: number }[];
};

type ListingFormContextType = {
  state: ListingFormState;
  setState: React.Dispatch<React.SetStateAction<ListingFormState>>;
  update: (fields: Partial<ListingFormState>) => void;
};

const defaultState: ListingFormState = {
  title: "",
  description: "",
  price: 0,
  condition: "",
  categoryId: "",
  subCategory: "",
  properties: {},
  images: [],
};

const ListingFormContext = createContext<ListingFormContextType | undefined>(
  undefined
);

export const ListingFormProvider: React.FC<{
  children: React.ReactNode;
  categoryId: string;
}> = ({ children, categoryId }) => {
  const [state, setState] = useState<ListingFormState>({
    ...defaultState,
    categoryId,
  });

  const update = (fields: Partial<ListingFormState>) => {
    setState((prev) => ({
      ...prev,
      ...fields,
      properties: { ...prev.properties, ...fields.properties },
    }));
  };

  return (
    <ListingFormContext.Provider value={{ state, setState, update }}>
      {children}
    </ListingFormContext.Provider>
  );
};

export const useListingForm = () => {
  const ctx = useContext(ListingFormContext);
  if (!ctx) {
    throw new Error("useListingForm must be used within a ListingFormProvider");
  }
  return ctx;
};

"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type BaseProperties = Record<string, string | number>;

export type ListingFormState<T extends BaseProperties = BaseProperties> = {
  title: string;
  description: string;
  price: number;
  subCategoryId: string;
  properties: T;
  images: File[];
};

type ListingFormContextType = {
  state: ListingFormState<BaseProperties>;
  setState: React.Dispatch<
    React.SetStateAction<ListingFormState<BaseProperties>>
  >;
  update: (fields: Partial<ListingFormState<BaseProperties>>) => void;
};

const defaultState: ListingFormState = {
  title: "",
  description: "",
  price: 0,
  subCategoryId: "",
  properties: {},
  images: [],
};

const ListingFormContext = createContext<ListingFormContextType | undefined>(
  undefined
);

export const ListingFormProvider: React.FC<{
  children: React.ReactNode;
  subCategoryId: string;
}> = ({ children, subCategoryId }) => {
  const [state, setState] = useState<ListingFormState<BaseProperties>>({
    ...defaultState,
    subCategoryId,
  });

  const update = (fields: Partial<ListingFormState<BaseProperties>>) => {
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

export const useListingForm = <T extends BaseProperties = BaseProperties>() => {
  const ctx = useContext(ListingFormContext);
  if (!ctx)
    throw new Error("useListingForm must be used within a ListingFormProvider");

  return {
    ...ctx,
    state: ctx.state as ListingFormState<T>,
    update: (fields: Partial<ListingFormState<T>>) => {
      ctx.update(fields as Partial<ListingFormState<BaseProperties>>);
    },
  };
};

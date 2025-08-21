import {
  actions,
  calibers,
  guns,
  manufacturers,
} from "~/lib/categories/gun-manufacturer";
import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const gunsRouter = createTRPCRouter({
  getGuns: publicProcedure.query(async () => {
    return guns;
  }),

  getCalibres: publicProcedure.query(async () => {
    return calibers;
  }),

  getManufacturers: publicProcedure.query(async () => {
    return manufacturers;
  }),

  getModels: publicProcedure
    .input(
      z.object({
        manufacturer: z.string(),
      })
    )
    .query(async ({ input }) => {
      return guns.filter((m) => m.manufacturer === input.manufacturer);
    }),

  getLegalClasses: publicProcedure
    .input(
      z.object({
        manufacturer: z.string(),
        model: z.string(),
      })
    )
    .query(async ({ input }) => {
      return guns.filter(
        (m) => m.manufacturer === input.manufacturer && m.model === input.model
      );
    }),

  getActions: publicProcedure.query(async () => {
    return actions;
  }),
});

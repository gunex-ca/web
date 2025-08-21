import { listingRouter } from "~/server/api/routers/listings";
import { locationRouter } from "~/server/api/routers/location";
import { userRouter } from "~/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { searchRouter } from "./routers/search";
import { gunsRouter } from "./routers/guns";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listing: listingRouter,
  search: searchRouter,
  user: userRouter,
  location: locationRouter,
  gun: gunsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

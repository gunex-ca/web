import type { NextRequest } from "next/server";
import { db } from "~/server/db";

import { NextResponse } from "next/server";
import type { z } from "zod/v4";
import { env } from "~/env";

export const internalAuth: () => Middleware = () => async (ctx, _, next) => {
  const headers = ctx.req.headers;
  const key = headers.get("x-api-key") ?? "";
  if (key === env.INTERNAL_AUTH_TOKEN) return next(ctx);
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
};

export const parseBody: <T extends z.ZodTypeAny>(schema: T) => Middleware =
  (schema) => async (ctx, _, next) => {
    const response = await ctx.req.json();
    const body = schema.safeParse(response);

    if (!body.success) {
      console.error("Validation error:", body.error);
      return NextResponse.json({ error: body.error }, { status: 400 });
    }

    ctx.body = body.data;

    return next(ctx);
  };

export type BaseContext = {
  req: NextRequest;
  db: typeof db;
  [key: string]: unknown;
};
export type Handler<C extends BaseContext = BaseContext, E = unknown> = (
  ctx: C,
  extra: E,
) => Promise<Response>;

export type Middleware<TNext = object, TPrev = object, Extra = unknown> = (
  ctx: Context<TPrev>,
  extra: Extra,
  next: (ctx: Context<TNext>) => Promise<Response>,
) => Promise<Response>;

export type Context<T = object> = BaseContext & T;

export const request = () => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const middlewares: Middleware<any, any>[] = [];

  const use = <TPrev = object, TNext = object>(
    middleware: Middleware<TPrev, TNext>,
  ) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    middlewares.push(middleware as Middleware<any, any>);
    return { use, handle };
  };

  const handle =
    <TContext = object, Extra = unknown>(
      handler: Handler<TContext & BaseContext, Extra>,
    ) =>
    (req: NextRequest, extra: Extra) => {
      let index = 0;
      const ctx: Context = { req, db };

      const next = (ctx: Context): Promise<Response> => {
        if (index >= middlewares.length)
          return handler(ctx as TContext & BaseContext, extra);
        const middleware = middlewares[index++];
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        return middleware!(ctx, extra, next);
      };

      return next(ctx);
    };

  return { use, handle };
};

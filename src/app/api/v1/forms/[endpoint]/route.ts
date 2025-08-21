import { NextResponse } from "next/server";
import { z } from "zod/v4";
import { parseBody, request } from "~/app/api/middleware";
import { auth } from "~/lib/auth";
import { formSubmission } from "~/server/db/schema/submission";
import { takeFirst } from "~/server/db/utils";

const submissionSchema = z.object({
  type: z.string().max(64).optional(),
  data: z.record(z.string(), z.any()),
});

export const POST = request()
  .use(parseBody(submissionSchema))
  .handle<{
    body: z.infer<typeof submissionSchema>;
    params: { endpoint: string };
  }>(async (ctx) => {
    try {
      const endpoint =
        ctx.req.nextUrl.pathname.split("/forms/")[1]?.split("/")[0] ??
        "default";
      const body = ctx.body;

      const session = await auth.api.getSession({ headers: ctx.req.headers });

      const ip =
        ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
      const userAgent = ctx.req.headers.get("user-agent") ?? "";
      const referer = ctx.req.headers.get("referer") ?? undefined;

      const inserted = await ctx.db
        .insert(formSubmission)
        .values({
          endpoint,
          type: body.type,
          data: body.data,
          userId: session?.user.id,
          ip,
          userAgent,
          referer,
        })
        .returning()
        .then(takeFirst);

      return NextResponse.json(
        {
          id: inserted.id,
          endpoint,
          receivedAt: inserted.createdAt,
        },
        { status: 201 },
      );
    } catch (error) {
      console.error("Form submission error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }
  });

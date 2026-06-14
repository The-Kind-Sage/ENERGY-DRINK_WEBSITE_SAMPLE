import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { adminLogin, adminMe, adminSignup } from "../auth";

export const adminSignupFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ data }) => {
    return adminSignup(data);
  });

export const adminLoginFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return adminLogin(data);
  });

export const adminMeFn = createServerFn({ method: "GET" })
  .handler(async ({ request }) => {
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    return adminMe(token);
  });



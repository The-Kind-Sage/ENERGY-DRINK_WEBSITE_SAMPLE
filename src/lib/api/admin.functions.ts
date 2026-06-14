import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { adminLogin, adminSignup, adminMe } from "../auth";

export const adminSignupFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ data }) => adminSignup(data));

export const adminLoginFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => adminLogin(data));

// Note: this fn is included for completeness; the admin page works without it.
// If your TanStack Start version doesn't expose request on GET handlers,
// simply stop using this function client-side.
export const adminMeFn = createServerFn({ method: "GET" }).handler(async () => {
  // No request context available in this template.
  return adminMe(undefined);
});


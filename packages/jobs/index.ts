import { serve } from "inngest/edge";
import { inngest } from "./client";
import { newProspect } from "./prospects/new";
import { verifyEmail } from "./prospects/verify-email";
import { helloWorld } from "./test";

export const handler = serve({
  client: inngest,
  functions: [helloWorld, newProspect, verifyEmail],
});

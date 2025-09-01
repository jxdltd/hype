import { auth } from "@repo/auth/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const getAuth = createServerFn().handler(async () => {
  const request = getWebRequest();

  if (!request) {
    throw new Error("No request found");
  }

  const resp = await auth.api.getSession({
    headers: request.headers,
  });

  if (!resp) {
    return null;
  }

  return {
    session: resp.session,
    user: resp.user,
  };
});

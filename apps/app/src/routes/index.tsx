import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "@repo/database";
import { testTable } from "@repo/database/schema";

async function readCount() {
  return await db.select().from(testTable);
}

const getCount = createServerFn({
  method: "GET",
}).handler(() => {
  return readCount().then((res) => res.length);
});

const updateCount = createServerFn({ method: "POST" }).handler(async () => {
  await db.insert(testTable).values({});
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <button
      type="button"
      onClick={() => {
        updateCount().then(() => {
          router.invalidate();
        });
      }}
    >
      Add 1 to {state}?
    </button>
  );
}

import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {


  return (
    <HydrateClient>
<h1 className="text-red-600">Hello world </h1>
    </HydrateClient>
  );
}

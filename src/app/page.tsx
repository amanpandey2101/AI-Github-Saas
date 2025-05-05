import Link from "next/link";

import { api, HydrateClient } from "@/trpc/server";
import { SignIn } from "@clerk/nextjs";
export default async function Home() {


  return (
    <HydrateClient>
      <SignIn />
    </HydrateClient>
  );
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function App() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    // Redirect to the home page if the user is not authenticated
    router.push("/home");
  }

  return <></>;
}

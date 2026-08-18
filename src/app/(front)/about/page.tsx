import Link from "next/link";
import AppLoading from "../components/app-loading";
import { Suspense } from "react";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

async function ApiVersion() {
  const response = await fetch('https://api.codingthailand.com/api/version');
  const apiInfo = await response.json();

  return <p>API Version: {apiInfo.data.version}</p>;
}

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <main>
      <Suspense fallback={ <AppLoading /> }>
        <ApiVersion />
      </Suspense>     
      <hr />
      <Link href="/" className="underline">
        Home Page
      </Link>
    </main>
  );
}
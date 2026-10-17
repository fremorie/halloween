import Link from "next/link";

const UIExperiments = ["title"];

export default function Page() {
  return (
    <main className="mx-auto max-w-md p-8 font-mono">
      <h1 className="mb-4 text-2xl font-bold">UI experiments</h1>
      <ul className="list-disc space-y-1 pl-6">
        {UIExperiments.map((name) => (
          <li key={name}>
            <Link
              href={`/ui/${name}`}
              className="underline underline-offset-4 hover:text-orange-500"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

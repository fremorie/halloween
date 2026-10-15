import Link from "next/link";

const experiments = [
  "kuwahara",
  "pumpkins",
  "rain",
  "window",
  "yarn-balls",
  "eulerian-path",
  "jack-o-lantern",
  "jack-o-lantern-2",
  "jack-o-lantern-3",
  "pedestal",
  "cat",
  "cat-rigged",
] as const;

export default function Page() {
  return (
    <main className="mx-auto max-w-md p-8 font-mono">
      <h1 className="mb-4 text-2xl font-bold">Experiments</h1>
      <ul className="list-disc space-y-1 pl-6">
        {experiments.map((name) => (
          <li key={name}>
            <Link
              href={`/${name}`}
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

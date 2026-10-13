import Link from "next/link";

export default function Page() {
  return (
    <Link
      href={`/experiments`}
      className="underline underline-offset-4 hover:text-orange-500"
    >
      Experiments
    </Link>
  );
}

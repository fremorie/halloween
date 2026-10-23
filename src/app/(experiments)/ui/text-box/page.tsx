import { TextBox } from "@/components/ui/textBox/textBox";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center px-12">
      <div className="w-full max-w-2xl">
        <TextBox>
          <p className="whitespace-pre-line">
            It&apos;s almost time to go trick-or-treating, and I don&apos;t have
            a&nbsp;costume... Will you help me make it?
          </p>
        </TextBox>
      </div>
    </div>
  );
}

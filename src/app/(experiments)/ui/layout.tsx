export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="relative h-screen w-full bg-[#F2EBDE]">{children}</div>
  );
}

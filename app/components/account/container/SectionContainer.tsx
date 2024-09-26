import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};
export default function SectionContainer({ title, children }: Props) {
  return (
    <section className="flex w-full max-w-[848px] flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="rounded-lg border p-6 shadow-md">{children}</div>
    </section>
  );
}

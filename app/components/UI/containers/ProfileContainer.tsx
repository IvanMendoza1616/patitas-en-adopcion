import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ProfileContainer({ children }: Props) {
  return (
    <main className="px-4">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-8 rounded-lg border p-6 shadow-md">
        {children}
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import SectionContainer from "@/app/components/account/container/SectionContainer";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "View detailed analytics and track key metrics related to your shelter's performance, adoptions, and engagement.",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/sign-in?redirectTo=/account/analytics");

  if (session.user.role !== "admin")
    return (
      <SectionContainer title="Analytics">
        <div className="flex h-[300px] items-center justify-center">
          <p>You don&apos;t have permissions to access this page</p>
        </div>
      </SectionContainer>
    );

  return (
    <SectionContainer title="Analytics">
      <p className="h-[300px]">Analytics</p>
    </SectionContainer>
  );
}

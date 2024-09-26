"use client";
import { adoptPetRequest } from "@/app/actions";
import SubmitButton from "../UI/SubmitButton";
import FormMessage from "../account/FormMessage";
import { useFormState } from "react-dom";
import PersonalInformation from "./PersonalInformation";
import HouseholdInformation from "./HouseholdInformation";
import LifestyleInformation from "./LifestyleInformation";
import References from "./References";
import AdditionalInformation from "./AdditionalInformation";
import Link from "next/link";

type Props = {
  shelterEmail: string;
};

export default function AdoptPetForm({ shelterEmail }: Props) {
  const [state, formAction] = useFormState(adoptPetRequest, {
    success: false,
    message: "",
    emailSent: false,
    shelterEmail,
  });

  return (
    <>
      <form className="flex flex-col gap-16" action={formAction}>
        <PersonalInformation />
        <HouseholdInformation />
        <LifestyleInformation />
        <References />
        <AdditionalInformation />
        <div>
          <FormMessage message={state.message} success={state.success} />
          <SubmitButton>Submit Application</SubmitButton>
        </div>
      </form>
      {state.emailSent && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="flex max-w-[500px] flex-col gap-4 rounded-lg bg-white px-4 py-8">
            <h3 className="text-xl font-semibold">Application Sent</h3>
            <p className="mb-4">
              A notification with all your information has been sent to the
              shelter. You will be contacted by them in order to continue with
              the adoption process.
            </p>
            <Link
              className="self-start rounded-md border px-4 py-2"
              href="/pet-search"
            >
              Close
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

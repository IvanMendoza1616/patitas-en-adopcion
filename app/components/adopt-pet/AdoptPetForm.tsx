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
      <form className="flex flex-col gap-8" action={formAction}>
        <PersonalInformation />
        <HouseholdInformation />
        <LifestyleInformation />
        <References />
        <AdditionalInformation />
        <div className="col-span-2">
          <SubmitButton>Send Form</SubmitButton>
          <FormMessage message={state.message} success={state.success} />
        </div>
      </form>
      {state.emailSent && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
          <div className="max-w-[500px] bg-white px-4 py-8">
            <p className="mb-4">
              A notification with all your information has been sent to the
              shelter. You will be contacted by them in order to continue with
              the adoption process.
            </p>
            <Link className="bg-gray-100 px-2 py-1" href="/pet-search">
              Close
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

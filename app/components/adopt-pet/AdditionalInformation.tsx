import { useState } from "react";
import TextAreaInput from "../UI/inputs/TextAreaInput";
import TextInput from "../UI/inputs/TextInput";
import CheckboxInput from "../UI/inputs/CheckboxInput";

export default function AdditionalInformation() {
  const [givePetOther, setGivePetOther] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Additional Information</h3>
      <TextAreaInput
        label="Why do you want to adopt a pet?"
        placeholder="Enter reasons for adopting a pet"
        name="why-adopt"
        id="why-adopt"
        rows={3}
        required
      />
      <TextAreaInput
        label="If your pet got out or was lost, what would you do?"
        placeholder="Enter what you would do"
        name="pet-lost"
        id="pet-lost"
        rows={3}
        required
      />
      <TextInput
        label="What is your monthly budget for a pet?"
        placeholder="Enter your monthy budget"
        name="budget"
        id="budget"
        required
      />
      <TextAreaInput
        label="If you move, what will you do with your pet?"
        placeholder="Enter what you would do"
        name="if-moving"
        id="if-moving"
        rows={3}
        required
      />

      <div className="flex flex-col gap-1">
        <p className="font-semibold">
          Which of the following reasons might force you to give up your pet?
          (Check all that apply)
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-y-1">
          <CheckboxInput
            label="Excessive barking"
            name="give-up-pet"
            id="excessive-barking"
            value="excessive-barking"
          />
          <CheckboxInput
            label="Aggressive on leash"
            name="give-up-pet"
            id="aggressive-leash"
            value="aggressive-leash"
          />
          <CheckboxInput
            label="Destructive chewing"
            name="give-up-pet"
            id="destructive-chewing"
            value="destructive-chewing"
          />
          <CheckboxInput
            label="Biting/Aggression"
            name="give-up-pet"
            id="biting"
            value="biting"
          />
          <CheckboxInput
            label="Digging"
            name="give-up-pet"
            id="digging"
            value="digging"
          />
          <CheckboxInput
            label="Divorce/Separation"
            name="give-up-pet"
            id="divorce"
            value="divorce"
          />
          <CheckboxInput
            label="Moving/Relocating"
            name="give-up-pet"
            id="moving"
            value="moving"
          />
          <CheckboxInput
            label="Allergies"
            name="give-up-pet"
            id="allergies"
            value="allergies"
          />
          <CheckboxInput
            label="Not trainable"
            name="give-up-pet"
            id="not-trainable"
            value="not-trainable"
          />
          <CheckboxInput
            label="Poor watchdog"
            name="give-up-pet"
            id="poor-watchdog"
            value="poor-watchdog"
          />
          <CheckboxInput
            label="Financial problems"
            name="give-up-pet"
            id="financial-problems"
            value="financial-problems"
          />
          <CheckboxInput
            label="Having a baby"
            name="give-up-pet"
            id="having-baby"
            value="having-baby"
          />
          <CheckboxInput
            label="Pets not getting along"
            name="give-up-pet"
            id="not-pet-friendly"
            value="not-pet-friendly"
          />
          <CheckboxInput
            label="None of the above"
            name="give-up-pet"
            id="none-above"
            value="none-above"
          />
          <CheckboxInput
            label="Other"
            id="give-up-pet-other-checkbox"
            onChange={(e) => {
              setGivePetOther(e.target.checked);
            }}
          />
          {givePetOther && (
            <TextInput
              label="Reason"
              placeholder="Enter reason"
              name="give-up-pet"
              id="give-up-pet-other"
              className="col-span-full"
              required
            />
          )}
        </div>
      </div>
      <TextAreaInput
        label=" Is there anything else you would like to share about with us?"
        placeholder="Enter any additional information"
        name="anything-else"
        id="anything-else"
        rows={3}
        required
      />
    </div>
  );
}

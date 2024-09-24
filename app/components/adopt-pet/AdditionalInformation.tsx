import { useState } from "react";

export default function AdditionalInformation() {
  const [givePetOther, setGivePetOther] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl">Additional Information</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="why-adopt">Why do you want to adopt a pet?</label>
        <input
          className="px-2"
          type="text"
          name="why-adopt"
          id="why-adopt"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="pet-lost">
          If your pet got out or was lost, what would you do?
        </label>
        <input
          className="px-2"
          type="text"
          name="pet-lost"
          id="pet-lost"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="budget">What is your monthly budget for a pet?</label>
        <input
          className="px-2"
          type="text"
          name="budget"
          id="budget"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="if-moving">
          If you move, what will you do with your pet?
        </label>
        <input
          className="px-2"
          type="text"
          name="if-moving"
          id="if-moving"
          required
        />
      </div>
      <fieldset className="col-span-2 flex flex-col gap-1">
        <legend>
          Which of the following reasons might force you to give up your pet?
          (Check all that apply)
        </legend>
        <div className="grid grid-cols-4">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="excessive-barking"
              name="give-up-pet"
              value="excessive-barking"
            />
            <label htmlFor="excessive-barking">Excessive barking</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="aggressive-leash"
              name="give-up-pet"
              value="aggressive-leash"
            />
            <label htmlFor="aggressive-leash">Aggressive on leash</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="destructive-chewing"
              name="give-up-pet"
              value="destructive-chewing"
            />
            <label htmlFor="destructive-chewing">Destructive chewing</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="biting"
              name="give-up-pet"
              value="biting"
            />
            <label htmlFor="biting">Biting/Aggression</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="digging"
              name="give-up-pet"
              value="digging"
            />
            <label htmlFor="digging">Digging</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="divorce"
              name="give-up-pet"
              value="divorce"
            />
            <label htmlFor="divorce">Divorce/Separation</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="moving"
              name="give-up-pet"
              value="moving"
            />
            <label htmlFor="moving">Moving/Relocating</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="allergies"
              name="give-up-pet"
              value="allergies"
            />
            <label htmlFor="allergies">Allergies</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="not-trainable"
              name="give-up-pet"
              value="not-trainable"
            />
            <label htmlFor="not-trainable">Not trainable</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="poor-watchdog"
              name="give-up-pet"
              value="poor-watchdog"
            />
            <label htmlFor="poor-watchdog">Poor watchdog</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="financial-problems"
              name="give-up-pet"
              value="financial-problems"
            />
            <label htmlFor="financial-problems">Financial problems</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="having-baby"
              name="give-up-pet"
              value="having-baby"
            />
            <label htmlFor="having-baby">Having a baby</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="not-pet-friendly"
              name="give-up-pet"
              value="not-pet-friendly"
            />
            <label htmlFor="not-pet-friendly">Pets not getting along</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="none-above"
              name="give-up-pet"
              value="none-above"
            />
            <label htmlFor="none-above">None of the above</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="give-up-pet-other-checkbox"
              onChange={(e) => {
                setGivePetOther(e.target.checked);
              }}
            />
            <label htmlFor="give-up-pet-other-checkbox">Other</label>
            {givePetOther && (
              <div className="flex flex-col gap-1">
                <input
                  className="px-2"
                  type="text"
                  name="give-up-pet"
                  id="give-up-pet-other"
                  required
                />
              </div>
            )}
          </div>
        </div>
      </fieldset>
      <div className="flex flex-col gap-1">
        <label htmlFor="anything-else">
          Is there anything else you would like to share about with us?
        </label>
        <input
          className="px-2"
          type="text"
          name="anything-else"
          id="anything-else"
        />
      </div>
    </div>
  );
}

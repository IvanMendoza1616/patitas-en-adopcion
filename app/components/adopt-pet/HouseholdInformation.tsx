import { useState } from "react";
import SelectInput from "../UI/inputs/SelectInput";
import TextInput from "../UI/inputs/TextInput";
import RadioInputs from "../UI/inputs/RadioInputs";

export default function HouseholdInformation() {
  const [residenceType, setResidenceType] = useState("");
  const [isOwner, setIsOwner] = useState("");
  const [hasYard, setHasYard] = useState("");
  const [haveKids, setHaveKids] = useState("");
  const [havePets, setHavePets] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <h3 className="col-span-full text-xl font-semibold">
        Household Information
      </h3>
      <SelectInput
        label="Type of Residence"
        name="residence-type"
        id="residence-type"
        className={`col-span-full ${residenceType === "other" ? "md:col-span-1" : ""}`}
        onChange={(e) => {
          setResidenceType(e.target.value);
        }}
        required
      >
        <option value="">Select one</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="condo">Condo</option>
        <option value="townhome">Townhome</option>
        <option value="other">Other</option>
      </SelectInput>
      {residenceType === "other" && (
        <TextInput
          label="Specify"
          placeholder="Enter residence type"
          name="residence-type-other"
          id="residence-type-other"
          className="col-span-full md:col-span-1"
          required
        />
      )}
      <RadioInputs
        label="Are you the owner of the residence?"
        name="is-owner"
        id="is-owner"
        className="col-span-full"
        onChange={(e) => {
          setIsOwner(e.target.value);
        }}
        required
      />
      {isOwner === "no" && (
        <>
          <RadioInputs
            label="Do you have your landlord's permission to have a pet?"
            name="landlord-permission"
            id="landlord-permission"
            className="col-span-full"
            required
          />
          <TextInput
            label="Landlord's Name"
            placeholder="Enter landlord's name"
            name="landlord-name"
            id="landlord-name"
            className="col-span-full md:col-span-1"
            required
          />
          <TextInput
            label="Landlord's Phone"
            placeholder="Enter landlord's phone"
            name="landlord-phone"
            id="landlord-phone"
            className="col-span-full md:col-span-1"
            required
          />
        </>
      )}
      <RadioInputs
        label="Does your residence have a yard or outdoor space?"
        name="has-yard"
        id="has-yard"
        className="col-span-full"
        onChange={(e) => {
          setHasYard(e.target.value);
        }}
        required
      />
      {hasYard === "yes" && (
        <RadioInputs
          label="Is the yard fenced?"
          name="yard-fenced"
          id="yard-fenced"
          className="col-span-full"
          required
        />
      )}
      <TextInput
        label="Number of people in household"
        placeholder="Enter number of people"
        name="number-people-household"
        id="number-people-household"
        className="col-span-full"
        required
      />
      <RadioInputs
        label="Are there children living in the residence?"
        name="have-kids"
        id="have-kids"
        className={`col-span-full ${haveKids === "yes" ? "md:col-span-1" : ""}`}
        onChange={(e) => {
          setHaveKids(e.target.value);
        }}
        required
      />
      {haveKids === "yes" && (
        <TextInput
          label="How many?"
          placeholder="Enter number of children"
          name="kids-quantity"
          id="kids-quantity"
          className="col-span-full md:col-span-1"
          required
        />
      )}
      <RadioInputs
        label="Are there pets living in the residence?"
        name="have-pets"
        id="have-pets"
        className={`col-span-full ${havePets === "yes" ? "md:col-span-1" : ""}`}
        onChange={(e) => {
          setHavePets(e.target.value);
        }}
        required
      />
      {havePets === "yes" && (
        <TextInput
          label="How many?"
          placeholder="Enter number of pets"
          name="pets-quantity"
          id="pets-quantity"
          className="col-span-full md:col-span-1"
          required
        />
      )}
      <RadioInputs
        label="Are all household members agreeable to adopting a pet?"
        name="members-agree"
        id="members-agree"
        className="col-span-full"
        required
      />
      <RadioInputs
        label="Does anyone in the household have pet allergies?"
        name="member-with-allergies"
        id="member-with-allergies"
        className="col-span-full"
        required
      />
    </div>
  );
}

import TextInput from "../UI/inputs/TextInput";

export default function References() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h3 className="col-span-full text-xl font-semibold">References</h3>
      <TextInput
        label="Personal Reference #1"
        placeholder="Enter reference name"
        name="reference-name-1"
        id="reference-name-1"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Phone"
        placeholder="Enter phone"
        name="reference-phone-1"
        id="reference-phone-1"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Relationship"
        placeholder="Enter relationship"
        name="reference-relationship-1"
        id="reference-relationship-1"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Years known"
        placeholder="Enter years known"
        name="reference-years-1"
        id="reference-years-1"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Personal Reference #2"
        placeholder="Enter reference name"
        name="reference-name-2"
        id="reference-name-2"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Phone"
        placeholder="Enter phone"
        name="reference-phone-2"
        id="reference-phone-2"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Relationship"
        placeholder="Enter relationship"
        name="reference-relationship-2"
        id="reference-relationship-2"
        className="col-span-full md:col-span-1"
        required
      />
      <TextInput
        label="Years known"
        placeholder="Enter years known"
        name="reference-years-2"
        id="reference-years-2"
        className="col-span-full md:col-span-1"
        required
      />
    </div>
  );
}

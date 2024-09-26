import SelectInput from "../UI/inputs/SelectInput";
import TextInput from "../UI/inputs/TextInput";

export default function PersonalInformation() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h3 className="col-span-full text-xl font-semibold">
        Personal Information
      </h3>
      <TextInput
        label="Name"
        placeholder="Enter your full name"
        name="name"
        id="name"
        className="col-span-full sm:col-span-1"
        required
      />
      <TextInput
        label="Age"
        placeholder="Enter your age"
        name="age"
        id="age"
        className="col-span-full sm:col-span-1"
        required
      />
      <TextInput
        label="Address"
        placeholder="Enter your full address"
        name="address"
        id="address"
        className="col-span-full"
        required
      />
      <TextInput
        label="Phone Number"
        placeholder="Enter your phone number"
        name="phone"
        id="phone"
        className="col-span-full sm:col-span-1"
        required
      />
      <TextInput
        label="Occupation"
        placeholder="Enter your occupation"
        name="occupation"
        id="occupation"
        className="col-span-full sm:col-span-1"
        required
      />
      <SelectInput
        label="Marital Status"
        name="marital-status"
        id="marital-status"
        className="col-span-full"
        required
      >
        <option value="">Select one</option>
        <option value="single">Single</option>
        <option value="married">Married</option>
        <option value="divorced">Divorced</option>
        <option value="separated">Separated</option>
        <option value="widowed">Widowed</option>
      </SelectInput>
    </div>
  );
}

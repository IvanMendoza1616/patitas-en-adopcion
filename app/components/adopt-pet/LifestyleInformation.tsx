import TextAreaInput from "../UI/inputs/TextAreaInput";
import TextInput from "../UI/inputs/TextInput";

export default function LifestyleInformation() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Lifestyle Information</h3>
      <TextInput
        label="How many hours per day will the pet be left alone?"
        placeholder="Enter hours"
        name="hours-alone"
        id="hours-alone"
        required
      />
      <TextInput
        label="Who will be primarily responsible for the pet's care?"
        placeholder="Enter primary responsible"
        name="primary-responsible"
        id="primary-responsible"
        required
      />
      <TextAreaInput
        label="What will you do with the pet during vacations or emergencies?"
        placeholder="Enter plan for vacations or emergencies"
        name="plan-vacations-emergencies"
        id="plan-vacations-emergencies"
        rows={3}
        required
      />
      <TextInput
        label="How much time can you dedicate to training, exercise, and socializing
          the pet?"
        placeholder="Enter primary responsible"
        name="time-training"
        id="time-training"
        required
      />
    </div>
  );
}

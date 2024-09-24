export default function LifestyleInformation() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl">Lifestyle Information</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="hours-alone">
          How many hours per day will the pet be left alone?
        </label>
        <input
          className="px-2"
          type="text"
          name="hours-alone"
          id="hours-alone"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="primary-responsible">
          Who will be primarily responsible for the pet&apos;s care?
        </label>
        <input
          className="px-2"
          type="text"
          name="primary-responsible"
          id="primary-responsible"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="plan-vacations-emergencies">
          What will you do with the pet during vacations or emergencies?
        </label>
        <input
          className="px-2"
          type="text"
          name="plan-vacations-emergencies"
          id="plan-vacations-emergencies"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="time-training">
          How much time can you dedicate to training, exercise, and socializing
          the pet?
        </label>
        <input
          className="px-2"
          type="text"
          name="time-training"
          id="time-training"
          required
        />
      </div>
    </div>
  );
}

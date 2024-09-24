export default function PersonalInformation() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl">Personal Information</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Name</label>
        <input className="px-2" type="text" name="name" id="name" required />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="age">Age</label>
        <input className="px-2" type="text" name="age" id="age" required />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address">Address</label>
        <input
          className="px-2"
          type="text"
          name="address"
          id="address"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone">Phone number</label>
        <input className="px-2" type="text" name="phone" id="phone" required />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="occupation">Occupation</label>
        <input
          className="px-2"
          type="text"
          name="occupation"
          id="occupation"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="marital-status">Marital status</label>
        <select
          className="px-2"
          name="marital-status"
          id="marital-status"
          required
        >
          <option value="">Select one</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="separated">Separated</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
    </div>
  );
}

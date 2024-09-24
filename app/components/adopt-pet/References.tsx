export default function References() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl">References</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-name-1">Personal reference #1</label>
        <input
          className="px-2"
          type="text"
          name="reference-name-1"
          id="reference-name-1"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-phone-1">Phone</label>
        <input
          className="px-2"
          type="text"
          name="reference-phone-1"
          id="reference-phone-1"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-relationship-1">Relationship</label>
        <input
          className="px-2"
          type="text"
          name="reference-relationship-1"
          id="reference-relationship-1"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-years-1">Years known</label>
        <input
          className="px-2"
          type="text"
          name="reference-years-1"
          id="reference-years-1"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-name-2">Personal reference #2</label>
        <input
          className="px-2"
          type="text"
          name="reference-name-2"
          id="reference-name-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-phone-2">Phone</label>
        <input
          className="px-2"
          type="text"
          name="reference-phone-2"
          id="reference-phone-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-relationship-2">Relationship</label>
        <input
          className="px-2"
          type="text"
          name="reference-relationship-2"
          id="reference-relationship-2"
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="reference-years-2">Years known</label>
        <input
          className="px-2"
          type="text"
          name="reference-years-2"
          id="reference-years-2"
          required
        />
      </div>
    </div>
  );
}

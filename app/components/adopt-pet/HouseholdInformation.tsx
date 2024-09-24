import { useState } from "react";

export default function HouseholdInformation() {
  const [residenceType, setResidenceType] = useState("");
  const [isOwner, setIsOwner] = useState("");
  const [hasYard, setHasYard] = useState("");
  const [haveKids, setHaveKids] = useState("");
  const [havePets, setHavePets] = useState("");

  return (
    <div className="grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl">Household Information</h2>
      <div className="flex flex-col gap-1">
        <label htmlFor="residence-type">Type of residence</label>
        <select
          className="px-2"
          name="residence-type"
          id="residence-type"
          required
          onChange={(e) => {
            setResidenceType(e.target.value);
          }}
        >
          <option value="">Select one</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhome">Townhome</option>
          <option value="other">Other</option>
        </select>
        {residenceType === "other" && (
          <div>
            <label htmlFor="residence-type-other">Specify</label>
            <input
              name="residence-type-other"
              id="residence-type-other"
              type="text"
              required
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p>Are you the owner of the residence?</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="is-owner"
              id="is-owner-yes"
              value="yes"
              onChange={(e) => {
                setIsOwner(e.target.value);
              }}
              required
            />
            <label htmlFor="is-owner-yes">Yes</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="is-owner"
              id="is-owner-no"
              value="no"
              onChange={(e) => {
                setIsOwner(e.target.value);
              }}
              required
            />
            <label htmlFor="is-owner-no">No</label>
          </div>
        </div>
      </div>

      {isOwner === "no" && (
        <>
          <div className="flex flex-col gap-1">
            <p>Do you have your landlord&apos;s permission to have a pet?</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="landlord-permission"
                  id="landlord-permission-yes"
                  value="yes"
                  required
                />
                <label htmlFor="landlord-permission-yes">Yes</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  name="landlord-permission"
                  id="landlord-permission-no"
                  value="no"
                  required
                />
                <label htmlFor="landlord-permission-no">No</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Landlord&apos;s name</label>
            <input
              className="px-2"
              type="text"
              name="landlord-name"
              id="landlord-name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Landlord&apos;s phone</label>
            <input
              className="px-2"
              type="text"
              name="landlord-phone"
              id="landlord-phone"
              required
            />
          </div>
        </>
      )}

      <div className="flex flex-col gap-1">
        <p>Does your residence have a yard or outdoor space?</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="has-yard"
              id="has-yard-yes"
              value="yes"
              onChange={(e) => {
                setHasYard(e.target.value);
              }}
              required
            />
            <label htmlFor="has-yard-yes">Yes</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="has-yard"
              id="has-yard-no"
              value="no"
              onChange={(e) => {
                setHasYard(e.target.value);
              }}
              required
            />
            <label htmlFor="has-yard-no">No</label>
          </div>
        </div>
      </div>
      {hasYard === "yes" && (
        <div className="flex flex-col gap-1">
          <p>Is the yard fenced?</p>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="yard-fenced"
                id="yard-fenced-yes"
                value="yes"
                required
              />
              <label htmlFor="yard-fenced-yes">Yes</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="yard-fenced"
                id="yard-fenced-no"
                value="no"
                required
              />
              <label htmlFor="yard-fenced-no">No</label>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="number-people-household">
          Number of people in household
        </label>
        <input
          className="px-2"
          type="text"
          name="number-people-household"
          id="number-people-household"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>Are there children living in the residence?</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="have-kids"
              id="have-kids-yes"
              value="yes"
              onChange={(e) => {
                setHaveKids(e.target.value);
              }}
              required
            />
            <label htmlFor="have-kids-yes">Yes</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="have-kids"
              id="have-kids-no"
              value="no"
              onChange={(e) => {
                setHaveKids(e.target.value);
              }}
              required
            />
            <label htmlFor="have-kids-no">No</label>
          </div>
        </div>
        {haveKids === "yes" && (
          <div>
            <label htmlFor="kids-quantity">How many?</label>
            <input
              name="kids-quantity"
              id="kids-quantity"
              type="text"
              required
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <p>Are there pets living in the residence?</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="have-pets"
              id="have-pets-yes"
              value="yes"
              onChange={(e) => {
                setHavePets(e.target.value);
              }}
              required
            />
            <label htmlFor="have-pets-yes">Yes</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="have-pets"
              id="have-pets-no"
              value="no"
              onChange={(e) => {
                setHavePets(e.target.value);
              }}
              required
            />
            <label htmlFor="have-pets-no">No</label>
          </div>
        </div>
        {havePets === "yes" && (
          <div>
            <label htmlFor="pets-quantity">How many?</label>
            <input
              name="pets-quantity"
              id="pets-quantity"
              type="text"
              required
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p>Are all household members agreeable to adopting a pet?</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="members-agree"
              id="members-agree-yes"
              value="yes"
              required
            />
            <label htmlFor="members-agree-yes">Yes</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="members-agree"
              id="members-agree-no"
              value="no"
              required
            />
            <label htmlFor="members-agree-no">No</label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p>Does anyone in the household have pet allergies?</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="member-with-allergies"
              id="member-with-allergies-yes"
              value="yes"
              required
            />
            <label htmlFor="member-with-allergies-yes">Yes</label>
          </div>
          <div className="flex items-center gap-1">
            <input
              type="radio"
              name="member-with-allergies"
              id="member-with-allergies-no"
              value="no"
              required
            />
            <label htmlFor="member-with-allergies-no">No</label>
          </div>
        </div>
      </div>
    </div>
  );
}

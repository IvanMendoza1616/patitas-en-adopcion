"use server";
import client from "@/app/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { s3 } from "./lib/s3";

export async function updateUser(
  prevState: { success: boolean; message: string },
  formData: FormData,
) {
  const session = await auth();
  if (!session) return { success: false, message: "Not signed in." };

  const name = formData.get("name");
  if (!name)
    return { success: false, message: "Please add all required fields" };
  const response = await client
    .db("petsAdoption")
    .collection("users")
    .updateOne(
      {
        email: session.user.email,
      },
      { $set: { name } },
    );
  if (response.modifiedCount === 0 && response.matchedCount === 0)
    return { success: false, message: "The user was not found" };
  revalidatePath("/account");
  return { success: true, message: "Profile updated successfully!" };
}

export async function updateShelter(
  prevState: {
    shelterId: string;
    shelterImageUrl: string;
    shelterAddress: string;
    success: boolean;
    message: string;
  },
  formData: FormData,
) {
  const session = await auth();
  if (!session)
    return { ...prevState, success: false, message: "Not signed in." };

  const name = formData.get("shelter-name");
  const image = formData.get("image") as File;
  const description = formData.get("description");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const facebook = formData.get("facebook");
  const instagram = formData.get("instagram");
  const address = formData.get("address");
  const location = {
    type: "Point",
    coordinates: [
      +(formData.get("longitude") || 0),
      +(formData.get("latitude") || 0),
    ],
  };

  //Validate that all required fields are filled
  if (!name || !description || !phone || !email)
    return {
      ...prevState,
      success: false,
      message: "Please add all required fields",
    };

  //Create update query for $set in mongodb
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFields: any = {
    name,
    description,
    phone,
    email,
    facebook,
    instagram,
    address,
    location,
  };

  //Variable that will be updated if an image has been added
  let updatedShelterImageUrl = prevState.shelterImageUrl;

  if (image.size > 0) {
    const timestamp = new Date().getTime();

    //Delete old image
    if (prevState.shelterImageUrl)
      await s3.deleteObject({
        Bucket: "petadoptionbucket",
        Key: prevState.shelterImageUrl.split(".com/")[1],
      });

    //Upload new image
    const bufferedImage = await image.arrayBuffer(); // Convert to ArrayBuffer
    await s3.putObject({
      Bucket: "petadoptionbucket",
      Key: `shelters/${prevState.shelterId}${timestamp}`,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });

    //New url updated
    updatedShelterImageUrl = `https://petadoptionbucket.s3.us-east-2.amazonaws.com/shelters/${prevState.shelterId}${timestamp}`;
    updateFields.imageUrl = updatedShelterImageUrl;
  }

  await client
    .db("petsAdoption")
    .collection("shelters")
    .updateOne({ ownerId: session.user.email }, { $set: updateFields });

  //If address has changed, all the pets that are owned by the shelter will have their coordinates changed
  if (address !== prevState.shelterAddress) {
    await client
      .db("petsAdoption")
      .collection("pets")
      .updateMany({ ownerId: session.user.email }, { $set: { location } });
  }

  revalidatePath("/account/shelter");
  revalidatePath(`/shelter/${prevState.shelterId}`);

  return {
    ...prevState,
    shelterImageUrl: updatedShelterImageUrl,
    success: false,
    message: "Shelter updated successfully!",
  };
}

export async function updatePet(
  prevState: {
    petId: string;
    petImageUrl: string;
    success: boolean;
    message: string;
  },
  formData: FormData,
) {
  const session = await auth();
  if (!session)
    return { ...prevState, success: false, message: "Not signed in." };

  const name = formData.get("name");
  const image = formData.get("image") as File;
  const species = formData.get("species");
  const sex = formData.get("sex");
  const size = formData.get("size");
  const birthdate = formData.get("birthdate");
  const description = formData.get("description");
  const adopted = formData.get("adopted");

  if (!name || !species || !sex || !size || !birthdate)
    return {
      ...prevState,
      success: false,
      message: "Please add all required fields",
    };

  //If updating pet
  if (prevState.petId) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateFields: any = {
      name,
      species,
      sex,
      size,
      birthdate: new Date(birthdate.toString()),
      description,
      updatedAt: new Date(),
      adopted: adopted ? true : false,
    };

    let newPetImageUrl = prevState.petImageUrl;
    if (image.size > 0) {
      const timestamp = new Date().getTime();

      //Delete old image
      if (prevState.petImageUrl)
        await s3.deleteObject({
          Bucket: "petadoptionbucket",
          Key: prevState.petImageUrl.split(".com/")[1],
        });

      //Upload new image
      const bufferedImage = await image.arrayBuffer(); // Convert to ArrayBuffer
      await s3.putObject({
        Bucket: "petadoptionbucket",
        Key: `pets/${prevState.petId}${timestamp}`,
        Body: Buffer.from(bufferedImage),
        ContentType: image.type,
      });

      newPetImageUrl = `https://petadoptionbucket.s3.us-east-2.amazonaws.com/pets/${prevState.petId}${timestamp}`;
      updateFields.imageUrl = newPetImageUrl;
    }

    const response = await client
      .db("petsAdoption")
      .collection("pets")
      .updateOne(
        {
          _id: new ObjectId(prevState.petId),
          ownerId: session.user.email,
        },
        {
          $set: updateFields,
        },
      );
    if (response.modifiedCount === 0 && response.matchedCount === 0)
      return { ...prevState, success: false, message: "The pet was not found" };
    revalidatePath(`/edit-pet/${prevState.petId}`);
    return {
      ...prevState,
      petImageUrl: newPetImageUrl,
      success: true,
      message: "Pet updated successfully!",
    };
  }
  //If creating pet
  else {
    if (image.size === 0)
      return { ...prevState, success: false, message: "Please add an image" };

    const [shelter] = await client
      .db("petsAdoption")
      .collection("shelters")
      .find({ ownerId: session.user.email })
      .toArray();

    //Create pet in database without image
    const result = await client
      .db("petsAdoption")
      .collection("pets")
      .insertOne({
        name,
        imageUrl: "",
        species,
        sex,
        size,
        birthdate: new Date(birthdate.toString()),
        description,
        ownerId: session.user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        location: {
          type: "Point",
          coordinates: [
            shelter.location.coordinates[0],
            shelter.location.coordinates[1],
          ],
        },
        adopted: false,
      });

    //Upload image
    const bufferedImage = await image.arrayBuffer(); // Convert to ArrayBuffer
    await s3.putObject({
      Bucket: "petadoptionbucket",
      Key: `pets/${result.insertedId}`,
      Body: Buffer.from(bufferedImage),
      ContentType: image.type,
    });

    //Update imageUrl
    await client
      .db("petsAdoption")
      .collection("pets")
      .updateOne(
        {
          _id: new ObjectId(result.insertedId),
        },
        {
          $set: {
            imageUrl: `https://petadoptionbucket.s3.us-east-2.amazonaws.com/pets/${result.insertedId}`,
          },
        },
      );

    revalidatePath("/account/pets");
    redirect("/account/pets");
    return {
      ...prevState,
      success: true,
      message: "Pet created successfully!",
    };
  }
}

export async function adoptPetRequest(
  prevState: {
    success: boolean;
    message: string;
    emailSent: boolean;
    shelterEmail: string;
  },
  formData: FormData,
) {
  const session = await auth();
  if (!session)
    return {
      ...prevState,
      success: false,
      message: "Not signed in.",
      emailSent: false,
    };

  const name = formData.get("name");
  const age = formData.get("age");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const occupation = formData.get("occupation");
  const maritalStatus = formData.get("marital-status");
  const residenceType = formData.get("residence-type");
  const isOwner = formData.get("is-owner");
  const landlordPermission = formData.get("landlord-permission");
  const landlordName = formData.get("landlord-name");
  const landlordPhone = formData.get("landlord-phone");
  const hasYard = formData.get("has-yard");
  const yardFenced = formData.get("yard-fenced");
  const numberPeopleHousehold = formData.get("number-people-household");
  const haveKids = formData.get("have-kids");
  const kidsQuantity = formData.get("kids-quantity");
  const havePets = formData.get("have-pets");
  const petsQuantity = formData.get("pets-quantity");
  const membersAgree = formData.get("members-agree");
  const memberWithAllergies = formData.get("member-with-allergies");
  const hoursAlone = formData.get("hours-alone");
  const primaryResponsible = formData.get("primary-responsible");
  const planVacationsEmergencies = formData.get("plan-vacations-emergencies");
  const timeTraining = formData.get("time-training");
  const referenceName1 = formData.get("reference-name-1");
  const referencePhone1 = formData.get("reference-phone-1");
  const referenceRelationship1 = formData.get("reference-relationship-1");
  const referenceYears1 = formData.get("reference-years-1");
  const referenceName2 = formData.get("reference-name-2");
  const referencePhone2 = formData.get("reference-phone-2");
  const referenceRelationship2 = formData.get("reference-relationship-2");
  const referenceYears2 = formData.get("reference-years-2");
  const whyAdopt = formData.get("why-adopt");
  const petLost = formData.get("pet-lost");
  const budget = formData.get("budget");
  const ifMoving = formData.get("if-moving");
  const giveUpPet = formData.getAll("give-up-pet");
  const anythingElse = formData.get("anything-else");

  const res = {
    name,
    age,
    address,
    phone,
    occupation,
    maritalStatus,
    residenceType,
    isOwner,
    landlordPermission,
    landlordName,
    landlordPhone,
    hasYard,
    yardFenced,
    numberPeopleHousehold,
    haveKids,
    kidsQuantity,
    havePets,
    petsQuantity,
    membersAgree,
    memberWithAllergies,
    hoursAlone,
    primaryResponsible,
    planVacationsEmergencies,
    timeTraining,
    referenceName1,
    referencePhone1,
    referenceRelationship1,
    referenceYears1,
    referenceName2,
    referencePhone2,
    referenceRelationship2,
    referenceYears2,
    whyAdopt,
    petLost,
    budget,
    ifMoving,
    giveUpPet,
    anythingElse,
  };

  console.log(res);

  return {
    ...prevState,
    success: true,
    message: "Email sent",
    emailSent: true,
  };
}

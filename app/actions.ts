"use server";
import client from "@/app/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateUser(
  prevState: { message: string },
  formData: FormData,
) {
  const session = await auth();
  const name = formData.get("name");
  if (!name) return { message: "Please add all required fields" };
  const response = await client
    .db("petsAdoption")
    .collection("users")
    .updateOne(
      {
        email: session?.user.email,
      },
      { $set: { name } },
    );
  if (response.modifiedCount === 0 && response.matchedCount === 0)
    return { message: "The user was not found" };
  revalidatePath("/account");
  return { message: "Profile updated successfully!" };
}

export async function updateShelter(
  prevState: { message: string },
  formData: FormData,
) {
  const session = await auth();
  const name = formData.get("name");
  const description = formData.get("description");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const facebook = formData.get("facebook");
  const instagram = formData.get("instagram");
  if (!name || !description || !phone || !email)
    return { message: "Please add all required fields" };
  const response = await client
    .db("petsAdoption")
    .collection("shelters")
    .updateOne(
      {
        ownerId: session?.user.email,
      },
      { $set: { name, description, phone, email, facebook, instagram } },
    );
  if (response.modifiedCount === 0 && response.matchedCount === 0)
    return { message: "The shelter was not found" };
  revalidatePath("/account/shelter");
  return { message: "Shelter updated successfully!" };
}

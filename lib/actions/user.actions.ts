"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import Database from "../database/mongoose";
import { handleError } from "../utils";

// CONTROLLER FOR CREATING A NEW USER
export async function createUser(user: CreateUserParams) {
  try {
    await Database.connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

// fetching the user data using the user id
export async function getUserById(userId: string) {
  try {
    await Database.connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// updating the user data
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await Database.connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// delete user action
export async function deleteUser(clerkId: string) {
  try {
    await Database.connectToDatabase();

   
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

//for updaitng user credits
export async function updateCredits(userId: string, creditFee: number) {
    try {
      await Database.connectToDatabase();
  
      const updatedUserCredits = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { creditBalance: creditFee }},
        { new: true }
      )
  
      if(!updatedUserCredits) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
      handleError(error);
    }
  }
  


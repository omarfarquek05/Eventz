'use server';

import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { connectToDatabase } from '@/lib/database/index'
import User from '@/lib/database/models/user.model'
import Order from '@/lib/database/models/order.model'
import Event from '@/lib/database/models/event.model'

//create user
export async function createUser(user)  {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

//update user
export async function updateeUser(user, clerkId) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

//get users
export async function getUserById(userId) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));

  } catch (error) {
    handleError(error);
  }
}

//Delete User 
export async function deleteUser(clerkId) {
  try {
    await connectToDatabase();
    //find user to delete
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("User not Found");

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user

      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deleteUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

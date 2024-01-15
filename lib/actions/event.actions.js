"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database/index";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";
import { handleError } from "@/lib/utils";
//import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from "next/server";

//Wrapper Mongo db populate function
const populateEvent = (query) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name " });
};

// Get  category By Name
const getCategoryByName = async (name) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

// CREATE Event
export async function createEvent({ userId, event, path }) {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer is not found");

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    NextResponse.status(500).json({
      error: "Event is not created successfully",
    });
  }
}

//Get Event By Id
export async function getEventById(eventId) {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));
    if (!event) throw new Error("Event is not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    NextResponse.status(500).json({
      error: "Can not Get  Event by This Event ID",
    });
  }
}

//update Event
export async function updateEvent({ userId, event, path }) {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    NextResponse.status(500).json({
      error: "event is not  updated successfully",
    });
  }
}

//Get all Event
export async function getAllEvents({ query, limit = 6, page, category }) {
  try {
    await connectToDatabase();
    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    NextResponse.status(500).json({ error: "Can not Get all Event" });
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}) {
  try {
    await connectToDatabase();

    // Calculate the amount to skip based on the page and limit
    const skipAmount = (Number(page) - 1) * limit;

    // Define conditions for querying the events. It filters events by category and excludes the event with the specified eventId
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    // Use the Event model (assumed to be a MongoDB model) to find events based on the specified conditions
    const eventsQuery = await Event.find(conditions)
      .sort({ createdAt: "desc" }) // Sort the results by the 'createdAt' field in descending order
      .skip(skipAmount) // Skip a certain number of documents based on the skipAmount
      .limit(limit); // Limit the number of documents returned to the specified limit

    // Populate the events by calling a function named populateEvent (assumed to be defined elsewhere)
    const events = await populateEvent(eventsQuery);

    // Count the total number of documents that match the specified conditions
    const eventsCount = await Event.countDocuments(conditions);

    // Return an object with data (events), and totalPages (total number of pages based on the limit and total documents)
    return {
      data: JSON.parse(JSON.stringify(events)), // Convert events to JSON format
      totalPages: Math.ceil(eventsCount / limit), // Calculate the total number of pages
    };
  } catch (error) {
    // If an error occurs during the execution of the try block, handle the error using a function named handleError (assumed to be defined elsewhere)

    return NextResponse.json(
      { error: `Can not Get any releted Events: ${error.message}` },
      {
        status: 500,
      }
    );
  }
}

// DELETE event
export async function deleteEvent({ eventId, path }) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (deletedEvent) revalidatePath(path);
  } catch (error) {
    NextResponse.status(500).json({ error: "Event Deleted Successfully" });
  }
}

//get Events By User
export async function getEventsByUser({ userId, limit = 6, page }) {
  try {
    await connectToDatabase();
    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = await Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
  return NextResponse.json({ error: `Can not find Events By this User: ${error.message}`},{status: 500});
  }
}



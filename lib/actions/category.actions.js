"use server";

import { connectToDatabase } from "@/lib/database";
import Category from "../database/models/category.model";
import { NextResponse } from "next/server";

//create new Category
export async function createCategory({ categoryName }) {
  try {
    await connectToDatabase();
    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    NextResponse.status(500).json({ error: 'Can not create new Category' });
  }
}

//Get all Categories
export const getAllCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    NextResponse.status(500).json({ error: 'Can not Get all Categories' });
  }
};

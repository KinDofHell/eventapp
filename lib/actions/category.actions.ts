"use server";

import { CreateCategoryParams } from "@/types";
import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/mongodb/database";
import Category from "../mongodb/database/models/category.model";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (e) {
    handleError(e);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (e) {
    handleError(e);
  }
};
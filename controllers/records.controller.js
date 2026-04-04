import { and, eq, gte } from "drizzle-orm";
import db from "../config/db.js";
import { records, users } from "../models/db.schema.js";

//get all records
export const getAllRecords = async (req, res) => {
  try {
    const allrecords = await db.select().from(records);
    console.log(records);
    return res
      .status(200)
      .json({ message: "Records retrieved successfully", data: allrecords });
  } catch (error) {
    console.log("catch block executed");
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//create a record
export const createRecord = async (req, res) => {
  const { email, amount, type_of_transaction, category, description } =
    req.body;
  if (!email || !amount || !type_of_transaction || !category || !description) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) {
      return res.status(400).json({
        message: "No user exists with this email , please create a user first",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }

  try {
    const [record] = await db
      .insert(records)
      .values({
        email,
        amount,
        type_of_transaction,
        category,
        date: new Date(),
        description,
      })
      .returning();
    // console.log("try block executed");
    return res
      .status(201)
      .json({ message: "Record created successfully", data: record });
  } catch (error) {
    //console.log("catch block executed");

    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//update a record
export const updateRecord = async (req, res) => {
  const { r_id } = req.params;
  const { email, amount, type_of_transaction, category, date, description } =
    req.body;
  if (!r_id)
    return res.status(400).json({ message: "Provide a valid record ID" });
  const payload = {};
  if (email) payload.email = email;
  if (amount) payload.amount = amount;
  if (type_of_transaction) payload.type_of_transaction = type_of_transaction;
  if (category) payload.category = category;
  if (date) payload.date = date;
  if (description) payload.description = description;

  try {
    const [updateRecord] = await db
      .update(records)
      .set(payload)
      .where(eq(records.r_id, r_id))
      .returning();
    return res
      .status(200)
      .json({ message: "Record updated successfully", data: updateRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//delete a record
export const deleteRecord = async (req, res) => {
  const { r_id } = req.params;
  if (!r_id)
    return res.status(400).json({ message: "Provide a valid record ID" });
  try {
    const [deleteRecord] = await db
      .delete(records)
      .where(eq(records.r_id, r_id))
      .returning();
    return res
      .status(200)
      .json({ message: "Record deleted successfully", data: deleteRecord });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//get filtered records
export const getFilteredRecords = async (req, res) => {
  const { from, to, category, type_of_transaction } = req.query;

  if (!from && !to && !category && !type_of_transaction) {
    return res
      .status(400)
      .json({ message: "At lease one query parameter should be provided" });
  }

  if (
    type_of_transaction &&
    !["income", "expense"].includes(type_of_transaction)
  ) {
    return res
      .status(400)
      .json({
        message: "type_of_transaction should be either income or expense",
      });
  }

  let conditions = [];
  if (from) conditions.push(gte(records.date,new Date(from)));
  if (to) conditions.push(lte(records.date,new Date(to)));
  if (category) conditions.push(eq(records.category, category));
  if (type_of_transaction) conditions.push(eq(records.type_of_transaction , type_of_transaction));

  try {
    const filteredRecords = await db
      .select()
      .from(records)
      .where(and(...conditions));
    return res
      .status(200)
      .json({ message: "Filtered records retrieved", data: filteredRecords });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

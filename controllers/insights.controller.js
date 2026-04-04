import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { records } from "../models/db.schema.js";
import { monthlyInsightPrompt, weeklyInsightPrompt } from "../utils/prompts.js";
import {  generateInsightsGroq } from "../utils/groq.genai.model.js";

//weekly insights
export const getWeeklyInsights = async (req, res) => {
  const {email} = req.query;

  try {
    const recordsData = await db
      .select()
      .from(records)
      .where(eq(records.email, email));

    const stringifiedRecords = JSON.stringify(recordsData);
    const prompt = weeklyInsightPrompt(stringifiedRecords);
    const response = await generateInsightsGroq(prompt);

    return res.status(200).json({
      message: "Weekly insights generated successfully",
      email: email,
      data: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }
};

//monthly insights
export const getMonthlyInsights = async (req, res) => {
  const {email} = req.query;

  try {
    const recordsData = await db
      .select()
      .from(records)
      .where(eq(records.email, email));

    const stringifiedRecords = JSON.stringify(recordsData);
    const prompt = monthlyInsightPrompt(stringifiedRecords);
    const response = await generateInsightsGroq(prompt);

    return res.status(200).json({
      message: "Weekly insights generated successfully",
      email: email,
      data: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }
};

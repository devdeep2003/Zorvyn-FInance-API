import { and, eq , sum , desc } from "drizzle-orm";
import db from "../config/db.js";
import { records } from "../models/db.schema.js";


//get total income
export const getTotalIncome = async (req, res) => {
  const email = req.user.email;
  const role = req.user.role;

  if (role === "admin" || role === "analyst")
    return res
      .status(200)
      .json({ message: `Data consists of all the aggregated data of viewer, ${role} can access the records or through /api/dashboard/:email` });
  try {
    const totalIncomeData = await db
      .select({totalIncome : sum(records.amount)})
      .from(records)
      .where(
        and(
          eq(records.email, email),
          eq(records.type_of_transaction, "income"),
        ),
      )
     

      const totalIncome = totalIncomeData[0]?.totalIncome || 0;

    return res
      .status(200)
      .json({ message: "Total income fetched", data: totalIncome });
  } catch (error) {
    console.log("catch")
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//get total expense
export const getTotalExpense = async (req, res) => {
  const email = req.user.email;
  const role = req.user.role;

  if (role === "admin" || role === "analyst")
    return res
      .status(200)
      .json({ message: "Data consists of all the records of role viewer" });

  try {
    const totalExpenseData = await db
      .select({totalExpense : sum(records.amount)})
      .from(records)
      .where(
        and(
          eq(records.email, email),
          eq(records.type_of_transaction, "expense"),
        ),
      )
      

      const totalExpense = totalExpenseData[0]?.totalExpense || 0;

    return res
      .status(200)
      .json({ message: "Total expense fetched", data: totalExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//get net balance
export const getNetBalance = async (req, res) => {
  const email = req.user.email;
  const role = req.user.role;

  if (role === "admin" || role === "analyst")
    return res
      .status(200)
      .json({ message: "Data consists of all the records of role viewer" });

  try {
    const totalIncomeData =
      await db
        .select({totalIncome : sum(records.amount)})
        .from(records)
        .where(
          and(
            eq(records.email, email),
            eq(records.type_of_transaction, "income"),
          ),
        )

      const totalExpenseData = await db
        .select({totalExpense : sum(records.amount)})
        .from(records)
        .where(
          and(
            eq(records.email, email),
            eq(records.type_of_transaction, "expense"),
          ),
        )

        const netBalance = (parseFloat(totalIncomeData[0]?.totalIncome || 0)) - (parseFloat(totalExpenseData[0]?.totalExpense || 0));

    return res
      .status(200)
      .json({ message: "Net balance fetched", data: netBalance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//get category wise totals
export const getCategoryWiseTotals = async (req, res) => {
  const email = req.user.email;
  const role = req.user.role;

  if (role === "admin" || role === "analyst")
    return res
      .status(200)
      .json({ message: "Data consists of all the records of role viewer" });

  try {
    const categoryWiseTotals = await db
      .select({
        category : records.category,
        categorical_amt : sum(records.amount)
      })
      .from(records)
      .where(eq(records.email, email))
      .groupBy(records.category)
    return res.status(200).json({
      message: "Category wise totals fetched",
      data: categoryWiseTotals,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

//get recent activity
export const getRecentActivity = async (req, res) => {
  const email = req.user.email;
  const role = req.user.role;
  if (role === "admin" || role === "analyst")
    return res
      .status(200)
      .json({ message: "Data consists of all the records of role viewer" });

  try {
    const getRecentActivityData = await db
      .select()
      .from(records)
      .where(eq(records.email, email))
      .orderBy(records.date, desc)
      .limit(5);
    return res
      .status(200)
      .json({
        message: "Recent activities fetched",
        data: getRecentActivityData,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error });
  }
};

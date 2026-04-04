//weekly insights prompt
export const weeklyInsightPrompt = (records) => {
  return `
  You are an expert financial analyst. 
  Analyze the following financial records for the past week and provide a weekly trend report.
  
  Records: ${records}
  
  Provide the following in a clean structured format:
  
  1. WEEKLY SUMMARY
     - Total income this week
     - Total expenses this week
     - Net savings this week
  
  2. SPENDING PATTERN
     - Which days had highest spending
     - Which category was spent the most
     - Any unusual or one time expenses
  
  3. TREND ANALYSIS
     - Is spending increasing or decreasing through the week
     - Best day of the week financially
     - Worst day of the week financially
  
  4. ONE LINE VERDICT
     - A single line summary of how this week went financially
  
  Keep the language simple and easy to understand.`;
};

//monthly insights prompt
export const monthlyInsightPrompt = (records) => {
  return `

     You are an expert financial analyst.
  Analyze the following financial records for the past month and provide a monthly trend report.
  
  Records: ${records}
  
  Provide the following in a clean structured format:
  
  1. MONTHLY SUMMARY
     - Total income this month
     - Total expenses this month
     - Net savings this month
     - Savings percentage of income
  
  2. CATEGORY BREAKDOWN
     - List each spending category with its total
     - Which category consumed the most budget
     - Which category was well controlled
  
  3. WEEKLY COMPARISON WITHIN MONTH
     - Which week of the month had highest spending
     - Which week had lowest spending
     - Was spending consistent or irregular
  
  4. INCOME ANALYSIS
     - Was income stable or variable
     - Did income cover all expenses
  
  5. SUGGESTIONS
     - Top 2 practical suggestions to improve finances next month
     - One category where spending can be reduced
  
  6. OVERALL RATING
     - Rate this month financially out of 10 with a one line reason
  
  Keep the language simple, honest and actionable.
    `;
};

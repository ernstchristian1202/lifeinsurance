var express = require("express");
var router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

(async () => console.log(await pool.query("SELECT * FROM submission")))

function getRecommendation(age, income, dependents, riskTolerance) {
  let coverage = 500000;
  let term = 20;
  let type = "Term Life";

  if (age < 40) {
    if (riskTolerance === "High") {
      coverage = 1000000;
      term = 30;
    } else if (riskTolerance === "Medium") {
      coverage = 750000;
      term = 25;
    }
  } else {
    if (riskTolerance === "Low") {
      type = "Whole Life";
      coverage = 300000;
    } else if (riskTolerance === "Medium") {
      coverage = 500000;
      term = 15;
    }
  }

  if (income > 100000) {
    coverage += 200000;
  }
  if (dependents > 2) {
    coverage += 100000 * (dependents - 2);
  }

  const recommendation = `${type} – $${coverage} for ${term} years`;
  const explanation = `Based on your age (${age}), income ($${income}), number of dependents (${dependents}), and risk tolerance (${riskTolerance}), we recommend this policy to ensure adequate coverage for your needs.`;

  return { recommendation, explanation };
}

router.post('/create-db', async (req, res) => {
  try {

  await pool.query(`CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    age INTEGER NOT NULL,
    income FLOAT NOT NULL,
    dependents INTEGER NOT NULL,
    risk_tolerance VARCHAR(10) NOT NULL,
    recommendation TEXT NOT NULL,
    explanation TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`)
  
    res.json({ message: "Database table created successfully" });
  } catch (error) {
    console.error("Error creating database table:", error);
    res.status(500).json({ error: "Failed to create database table" });
  }
})

router.post("/", async function (req, res, next) {
  const { age, income, dependents, riskTolerance } = req.body;

  if (!age || !income || !dependents || !riskTolerance) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (typeof age !== "number" || age < 18 || age > 100) {
    return res.status(400).json({ error: "Invalid age" });
  }

  if (typeof income !== "number" || income < 0) {
    return res.status(400).json({ error: "Invalid income" });
  }

  if (typeof dependents !== "number" || dependents < 0) {
    return res.status(400).json({ error: "Invalid number of dependents" });
  }

  if (!["Low", "Medium", "High"].includes(riskTolerance)) {
    return res.status(400).json({ error: "Invalid risk tolerance" });
  }

  console.log(await pool.query("SELECT * FROM submission"))

  try {
    const { recommendation, explanation } = getRecommendation(
      age,
      income,
      dependents,
      riskTolerance
    );

    const query = `
      INSERT INTO submissions (age, income, dependents, risk_tolerance, recommendation, explanation)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await pool.query(query, [
      age,
      income,
      dependents,
      riskTolerance,
      recommendation,
      explanation,
    ]);

    res.json({ recommendation, explanation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

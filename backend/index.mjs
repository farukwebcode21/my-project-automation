import express from "express";

import cors from "cors";
import bodyParser from "body-parser";
import puppeteer from "puppeteer";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Swever ok");
});

app.post("/get-title", async (req, res) => {
  const { url } = req.body; // Get the URL from the request body.
  console.log(url);
  let browser;
  try {
    browser = await puppeteer.launch(); // Launch a new instance of Puppeteer.
    const page = await browser.newPage(); // Open a new page.
    await page.goto(url); // Go to the input URL.
    const title = await page.title(); // Get the page title.
    const webURL = await page.url();
    res.json({ title, webURL }); // Return the title as JSON.
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message }); // Handle errors.
  } finally {
    if (browser) {
      await browser.close(); // Ensure the browser closes after fetching the title.
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

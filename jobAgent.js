const puppeteer = require("puppeteer");
const { createObjectCsvWriter } = require("csv-writer");
const fs = require("fs");

(async () => {
  let browser;

  try {
    console.log("Starting Puppeteer...");

    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    console.log("Opening Naukri...");
    await page.goto("https://www.naukri.com/", {
      waitUntil: "networkidle2"
    });

    console.log("Page loaded");

    // Example scraping (basic homepage jobs - placeholder logic)
    const jobs = await page.evaluate(() => {
      let results = [];

      document.querySelectorAll("a.title, a.job-title").forEach(el => {
        results.push({
          title: el.innerText.trim(),
          link: el.href
        });
      });

      return results;
    });

    console.log("Jobs found:", jobs.length);

    if (jobs.length === 0) {
      jobs.push({
        title: "No jobs found (update selectors later)",
        link: "N/A"
      });
    }

    // CSV writer setup
    const csvWriter = createObjectCsvWriter({
      path: "jobs.csv",
      header: [
        { id: "title", title: "Job Title" },
        { id: "link", title: "Job Link" }
      ]
    });

    await csvWriter.writeRecords(jobs);

    console.log("CSV file created: jobs.csv");

    // Optional: show file content
    const fileData = fs.readFileSync("jobs.csv", "utf8");
    console.log("\nCSV Preview:\n", fileData);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    if (browser) await browser.close();
  }
})();
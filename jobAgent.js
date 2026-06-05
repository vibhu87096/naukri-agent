const puppeteer = require("puppeteer");
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });

  const page = await browser.newPage();

  // Load saved cookies
  const cookies = JSON.parse(
    fs.readFileSync("cookies.json", "utf8")
  );

  await page.setCookie(...cookies);

  // Open Node.js jobs page
  await page.goto(
    "https://www.naukri.com/nodejs-developer-jobs",
    {
      waitUntil: "networkidle2"
    }
  );

  console.log("Jobs page opened");

  await new Promise(resolve => setTimeout(resolve, 5000));

  // Extract jobs
  const jobs = await page.evaluate(() => {

    const rows = [];

    document
      .querySelectorAll(".srp-jobtuple-wrapper")
      .forEach(job => {

        const title =
          job.querySelector("a.title")?.innerText?.trim() || "";

        const company =
          job.querySelector("a.comp-name")?.innerText?.trim() || "";

        const experience =
          job.querySelector("span.expwdth")?.innerText?.trim() || "";

        const location =
          job.querySelector("span.locWdth")?.innerText?.trim() || "";

        const link =
          job.querySelector("a.title")?.href || "";

        rows.push({
          title,
          company,
          experience,
          location,
          link
        });
      });

    return rows;
  });

  console.log(`Total Jobs Found: ${jobs.length}`);

  // Filter for 4+ years experience
  const filteredJobs = jobs.filter(job => {

    const exp = job.experience || "";

    return (
      exp.includes("4") ||
      exp.includes("5") ||
      exp.includes("6") ||
      exp.includes("7") ||
      exp.includes("8") ||
      exp.includes("9") ||
      exp.includes("10") ||
      exp.includes("11") ||
      exp.includes("12")
    );
  });

  console.log(`Filtered Jobs: ${filteredJobs.length}`);

  // CSV Writer
  const csvWriter = createObjectCsvWriter({
    path: "nodejs_jobs.csv",
    header: [
      { id: "title", title: "TITLE" },
      { id: "company", title: "COMPANY" },
      { id: "experience", title: "EXPERIENCE" },
      { id: "location", title: "LOCATION" },
      { id: "link", title: "LINK" }
    ]
  });

  await csvWriter.writeRecords(filteredJobs);

  console.log(
    "CSV Created Successfully: nodejs_jobs.csv"
  );

  await browser.close();

})();
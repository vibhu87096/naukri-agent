const puppeteer = require("puppeteer");

(async () => {
  let browser;

  try {
    console.log("Starting Puppeteer...");

    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ]
    });

    const page = await browser.newPage();

    console.log("Opening Naukri...");
    await page.goto("https://www.naukri.com/", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    console.log("Page loaded successfully");

    // Example: Just get page title
    const title = await page.title();
    console.log("Page Title:", title);

    // You can extend logic here:
    // - login
    // - search jobs
    // - scrape listings
    // - save CSV

    console.log("Job Agent completed successfully");

  } catch (error) {
    console.error("Error in jobAgent:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();

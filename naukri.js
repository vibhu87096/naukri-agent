const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });

  const page = await browser.newPage();

  await page.goto("https://www.naukri.com", {
    waitUntil: "networkidle2"
  });

  console.log("Naukri Opened");
  console.log("Please login manually.");

  await new Promise(resolve => setTimeout(resolve, 120000)); // 2 minutes

  console.log("Finished");

})();
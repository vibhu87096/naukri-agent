const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });

  const page = await browser.newPage();

  await page.goto("https://www.naukri.com", {
    waitUntil: "networkidle2"
  });

  console.log("Login manually within 2 minutes...");

  await new Promise(resolve => setTimeout(resolve, 120000));

  const cookies = await page.cookies();

  fs.writeFileSync(
    "cookies.json",
    JSON.stringify(cookies, null, 2)
  );

  console.log("Cookies saved successfully!");

  await browser.close();
})();
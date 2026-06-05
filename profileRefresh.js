const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
  });

  const page = await browser.newPage();

  const cookies = JSON.parse(
    fs.readFileSync("cookies.json", "utf8")
  );

  await page.setCookie(...cookies);

  await page.goto(
    "https://www.naukri.com/mnjuser/profile",
    { waitUntil: "networkidle2" }
  );

  console.log("Profile page opened");

  await page.screenshot({
    path: "profile-check.png",
    fullPage: true
  });

  console.log("Screenshot saved");

  await new Promise(resolve => setTimeout(resolve, 30000));

  await browser.close();
})();
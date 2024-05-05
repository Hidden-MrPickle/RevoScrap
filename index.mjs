import puppeteer from "puppeteer";
const ua =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
var counter = 0;
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    defaultViewport: false,
    //headless: false,
    timeout: 90000,
  });
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto(
    "https://www.revolico.com/search?category=computadoras&subcategory=monitor"
  );
  await page.waitForSelector(".sc-cdff85db-9", { timeout: 60000 });
  let products = await page.$$(".sc-cdff85db-9");
  console.log(products);

  for (products of products) {
    try {
      var title = await page.evaluate(
        (el) => el.querySelector("p").textContent,
        products
      );
    } catch (error) {
      continue;
    }
    try {
      var price = await page.evaluate(
        (el) => el.querySelector("span").textContent,
        products
      );
    } catch (error) {
      if (error instanceof TypeError) {
        continue;
      }
    }
    counter++;
    console.log(
      "Product " + counter + "\n" + title + "\n " + price + "\n ------"
    );
  }
  await browser.close();
})();

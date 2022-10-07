const puppeteer = require("puppeteer");

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function main() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://ithelp.ithome.com.tw/users/20151567/ironman/5529");

  let index = 0;
  while (true) {
    const links = await page.$$(".qa-list .qa-list__title a");

    const link = links[index];

    if (!link) break;

    await Promise.all([
      page.waitForNavigation(),
      link.click(),
      //
    ]);

    await wait(600);

    await page.goBack();

    index += 1;
  }

  const counts = await page.$$(
    ".qa-list .qa-condition--change .qa-condition__count"
  );
  for (const count of counts) {
    console.log(await count.evaluate((el) => el.textContent));
  }
  
  const page2 = await browser.newPage();
  await page2.goto("https://ithelp.ithome.com.tw/users/20151567/ironman/5529?page=2");

  let index2 = 0;
  while (true) {
    const links2 = await page2.$$(".qa-list .qa-list__title a");

    const link2 = links2[index2];

    if (!link2) break;

    await Promise.all([
      page2.waitForNavigation(),
      link2.click(),
      //
    ]);

    await wait(600);

    await page2.goBack();

    index2 += 1;
  }

  const counts2 = await page2.$$(
    ".qa-list .qa-condition--change .qa-condition__count"
  );
  for (const count2 of counts2) {
    console.log(await count2.evaluate((el) => el.textContent));
  }
  
  const page3 = await browser.newPage();
  await page3.goto("https://ithelp.ithome.com.tw/users/20151567/ironman/5529?page=3");

  let index3 = 0;
  while (true) {
    const links3 = await page3.$$(".qa-list .qa-list__title a");

    const link3 = links3[index3];

    if (!link3) break;

    await Promise.all([
      page3.waitForNavigation(),
      link3.click(),
      //
    ]);

    await wait(600);

    await page3.goBack();

    index3 += 1;
  }

  const counts2 = await page2.$$(
    ".qa-list .qa-condition--change .qa-condition__count"
  );
  for (const count2 of counts2) {
    console.log(await count2.evaluate((el) => el.textContent));
  }

  await browser.close();

  console.log("automation process complete");
}

main();

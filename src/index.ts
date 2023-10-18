import "dotenv/config";
import { chromium } from "playwright";
import login from "./functions/login";
import data from "./data";
import WPPostData from "./interfaces/WPPostData";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await login(page);

  const step = async (postData: WPPostData) => {
    const response = await page.goto(postData.url);
    if (response?.status().toString()[0] === "4") return;

    await page.click("#wp-admin-bar-edit");
    await page.waitForNavigation();
    await page.waitForTimeout(3000);

    await page.$$eval("button.switch-html", (elements) =>
      elements.forEach((element) => (element as HTMLButtonElement).click())
    );

    for (const selector of Object.keys(postData)) {
      if (selector === "url") continue;

      await page.evaluate(
        ({ selector, value }) => {
          const input = document.querySelector<HTMLInputElement>(selector);
          if (input) input.value = value;
        },
        { selector, value: postData[selector] }
      );
    }

    await page.click(
      "input[type=submit]#publish,.edit-tag-actions input[type=submit]"
    );
    await page.waitForNavigation({ timeout: 160000 });
    await page.waitForTimeout(3000);
  };

  for (const singlePostData of data) {
    let success = false;
    do {
      await step(singlePostData)
        .then(() => (success = true))
        .catch(() => (success = false));
    } while (!success);
  }
  await browser.close();
})();

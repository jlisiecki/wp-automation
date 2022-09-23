import 'dotenv/config';
import { chromium } from 'playwright';
import login from './functions/login';
import data from './data';
import WPPostData from './interfaces/WPPostData';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await login(page);

    const step = async ({
        url,
        slug,
        yoastTitle,
        yoastDescription
    }: WPPostData) => {
        const response = await page.goto(url);
        if (response?.status().toString()[0] === '4') return;

        await page.click('#wp-admin-bar-edit');
        await page.waitForNavigation();
        await page.waitForTimeout(3000);

        if (slug) {
            await page.evaluate((slug) => {
                const input = document.querySelector<HTMLInputElement>('#slug');
                if (input) input.value = slug;
            }, slug);
        }

        if (yoastTitle) {
            await page.evaluate((yoastTitle) => {
                const input = document.querySelector<HTMLInputElement>(
                    '#hidden_wpseo_title'
                );
                if (input) input.value = yoastTitle;
            }, yoastTitle);
        }

        if (yoastDescription) {
            await page.evaluate((yoastDescription) => {
                const input =
                    document.querySelector<HTMLInputElement>(
                        '#hidden_wpseo_desc'
                    );
                if (input) input.value = yoastDescription;
            }, yoastDescription);
        }

        await page.click('input[type=submit]');
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

import 'dotenv/config';
import { Page } from 'playwright';
import EnvError from '../classes/EnvError';

export default async function login(page: Page) {
    const { ORIGIN, LOGIN, PASSWORD } = process.env;

    if (!ORIGIN) throw new EnvError('ORIGIN');
    if (!LOGIN) throw new EnvError('LOGIN');
    if (!PASSWORD) throw new EnvError('PASSWORD');

    await page.goto(`${ORIGIN}/wp-login.php`);
    await page.type('#user_login', LOGIN);
    await page.type('#user_pass', PASSWORD);

    await page.click('#wp-submit');
    await page.waitForNavigation();
    await page.waitForTimeout(3000);
}

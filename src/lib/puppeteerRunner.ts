import {Browser} from 'puppeteer';
import {nodeCountAll, nodeCountHidden} from "./nodeEval";

const percentage = (w: number, g: number): number => Math.ceil((w * 100) / g);

export default async (browser: Browser, url: string): Promise<(string | number)[]> => {
    try {
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle0'});

        const [all, hidden] = await Promise.all([
            nodeCountAll(page),
            nodeCountHidden(page),
        ]);

        await page.close();

        const visible = all - hidden;
        const hiddenPercentage = percentage(hidden, all);
        const visiblePercentage = 100 - hiddenPercentage;

        return [
            url,
            all,
            hidden,
            hiddenPercentage,
            visible,
            visiblePercentage,
        ];
    } catch (e) {
        console.error('error for: ', url, e);
        return [
            url,
            0,
            0,
            0,
            0,
            0,
        ];
    }
};

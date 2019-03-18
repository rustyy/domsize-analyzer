import {Page} from 'puppeteer';

export const nodeCountAll = async (page: Page) => page.$$eval('body *', x => x.length);

export const nodeCountHidden = async (page: Page): Promise<number> => {
    const pageFunction = (elements: Element[]) => {
        const isHidden = (el: any) => {
            const style = window.getComputedStyle(el);
            return style.opacity === '0' ||
                style.display === 'none' ||
                style.visibility === 'hidden' ||
                el.offsetHeight === 0;
        };

        return Array.from(elements).reduce((acc: number, el: Element) => isHidden(el) ? acc + 1 : acc, 0);
    };

    return page.$$eval('body *', pageFunction);
};

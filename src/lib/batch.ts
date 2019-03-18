import {WriteStream} from 'fs';
import {launch} from 'puppeteer';
import puppeteerRunner from './puppeteerRunner';

export default async (collection: string[], stream: WriteStream, batchSize: number = 20) => {
    const collectionLength = collection.length;
    let counter = 1;
    const batchTotal = Math.ceil(collectionLength / batchSize);
    const browser = await launch();

    while (collection.length) {
        console.log(`>>>> starting batch ${counter} of ${batchTotal}, ${collectionLength} items`);
        console.time('took');

        const batch = collection.splice(0, batchSize);
        const promises = batch.map(item => puppeteerRunner(browser, item));
        const rows = await Promise.all(promises);

        rows.forEach(row => stream.write(row.join(';') + '\n'));

        counter++;
        console.timeEnd('took');
    }

    await browser.close();
};

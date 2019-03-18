import {existsSync, mkdirSync, createWriteStream} from 'fs';
import crawler from './sitemapCrawler';
import batch from './batch';

export default async (options: { siteMapUrl?: string, urls?: string[] }) => {
    const defaults: { siteMapUrl: string, urls: string[] } = {
        siteMapUrl: '',
        urls: [],
    };

    let settings = Object.assign({}, defaults, options);

    if (!settings.urls && !settings.siteMapUrl) {
        throw 'siteMapUrl or urls must be given';
    }

    const dir = `${__dirname}/results/${(new Date().getTime())}`;

    !existsSync(dir)
        ? mkdirSync(dir, {recursive: true})
        : void 0;

    if (settings.siteMapUrl) {
        settings.urls = await crawler(settings.siteMapUrl);
    }

    const resultFile = `${dir}/result.csv`;
    const stream = createWriteStream(resultFile, {flags: 'a'});

    const result = [
        [
            'url',
            'all nodes',
            'hidden nodes',
            'hidden percentage',
            'visible nodes',
            'visible percentage',
        ],
    ];

    stream.write(result[0].join(';') + '\n');
    await batch(settings.urls, stream);
    stream.end();
};

const sitemaps = require('sitemap-stream-parser');

export default async (sitemapUrl: string): Promise<string[]> => {
    const result: string[] = [];

    return new Promise((resolve, reject) => {
        sitemaps.sitemapsInRobots(sitemapUrl, (err: Error, urls: string[]) => {
            if (err || !urls || urls.length === 0) {
                reject('error while parsing sitemap');
            }

            sitemaps.parseSitemaps(urls, (url: string) => result.push(url), () => resolve(result));
        });
    });
};

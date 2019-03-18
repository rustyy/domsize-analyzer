#!/usr/bin/env node

import {readFileSync} from "fs";
import * as commander from 'commander';
import runner from './lib/runner';

commander
    .version('0.0.1')
    .description('Analyze dom-size.')
    .option('--siteMapUrl <siteMapUrl>', 'analyze Urls from sitemap', async (siteMapUrl) => {
        await runner({siteMapUrl});
    })
    .option('--url <url>', 'analyze the given url', async (url) => {
        await runner({urls: [url]});
    })
    .option('--json <file>', 'use urls from json', async (jsonFilePath) => {
        let raw = readFileSync(jsonFilePath);
        const urls = JSON.parse(raw.toString('utf8'));
        await runner({urls});
    });

commander.parse(process.argv);

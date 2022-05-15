require(`module-alias/register`)

import puppeteer from "puppeteer"
import chalk from "chalk"
import scrapeIframeUrl from "@scrapers/scrapeIframeUrl"
import checkIfCuevanaUrl from "@checks/checkIfCuevanaUrl"

const run = async (): Promise<void> => {
	console.log(chalk.green(`Starting browser`))

	const browser = await puppeteer.launch({ headless: true })

	try {
		const args = process.argv.slice(2)
		const movie = args[0]

		if (!movie) {
			throw new TypeError(`Please paste a movie url in terminal`)
		}
		if (!checkIfCuevanaUrl(movie)) {
			throw new TypeError(`Please paste a valid cuevana url in terminal`)
		}
		
		const movieName = movie.split("/pelicula/").pop()
		
		console.log(chalk.magenta(`Scraping ${movieName}`))
		const url = await scrapeIframeUrl(browser, movie)
		
		console.log(chalk.green(`Enjoy ${movieName}!`))
		console.log(chalk.blue(url))

		const { platform } = require('os');
		const { exec } = require('child_process');

		const WINDOWS_PLATFORM = 'win32';
		const MAC_PLATFORM = 'darwin';

		const osPlatform = platform(); 

		let command;

		if (osPlatform === WINDOWS_PLATFORM) {
			command = `start microsoft-edge:${url}`;
		} else if (osPlatform === MAC_PLATFORM) {
			command = `open -a "Google Chrome" ${url}`;
		} else {
			command = `google-chrome --no-sandbox ${url}`;
		}
		console.log(`executing command: ${command}`);

		exec(command);
	} catch (error: any) {
		console.log(chalk.red(error.message))
	} finally {
		await browser.close()
	}
}

run()

require(`module-alias/register`)

import puppeteer from "puppeteer"
import chalk from "chalk"
import scrapeIframeUrl from "@scrapers/scrapeIframeUrl"
import checkIfCuevanaUrl from "@checks/checkIfCuevanaUrl"

const run = async (): Promise<void> => {
	console.log(chalk.green(`Starting browser`))

	try {
		const args = process.argv.slice(2)
		const movie = args[0]

		if (!movie) {
			throw new TypeError(`Please paste a movie url in terminal`)
		}
		if (!checkIfCuevanaUrl(movie)) {
			throw new TypeError(`Please paste a valid cuevana url in terminal`)
		}

		const browser = await puppeteer.launch({ headless: true })
		const url = await scrapeIframeUrl(browser, movie)
		const movieName = new URL(url).pathname.split("/").pop()
		
		console.log(chalk.green(`Enjoy ${movieName}!`))
		console.log(chalk.blue(url))
	} catch (error) {
		return
	}
}

run()

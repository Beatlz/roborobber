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
		
		const movieName = movie.split("/pelicula/").pop()
		
		console.log(chalk.magenta(`Scraping ${movieName}`))

		const browser = await puppeteer.launch({ headless: false })
		const url = await scrapeIframeUrl(browser, movie)
		
		console.log(chalk.green(`Enjoy ${movieName}!`))
		console.log(chalk.blue(url))
	} catch (error: any) {
		console.log(chalk.red(error.message))
	}
}

run()

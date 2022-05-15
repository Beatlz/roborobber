require(`module-alias/register`)

import { Browser } from "puppeteer"
import chalk from "chalk"
import checkIfMovieUrl from "@checks/checkIfMovieUrl"

const scrapeIframeUrl = async (browser: Browser, url: string): Promise<string> => {
    try {
			const page = await browser.newPage()

      await page.goto(url)
      await page.waitForSelector('#cmc')

      const src = await page.evaluate((): string => {
        return document.querySelector('#cmc')?.getAttribute('src') || ``
      })
      
      await page.goto(`https:${src}`)
      await page.waitForSelector('#start')

      page.click('#start')

      await page.waitForSelector(`#PlayerDisplay`)

      const movieUrlList = await page.evaluate((): string[] => {
        const movieListElements = Object.values(document.querySelectorAll(`[onclick*="go_to_player"]`))
        
        return movieListElements.map(movie => movie.getAttribute(`onclick`)!)
      })

      console.log(chalk.magenta(`Found this urls:`))

      movieUrlList.forEach(movieUrl => console.log(chalk.blue(movieUrl)))

      const movieUrl = checkIfMovieUrl(movieUrlList[0])

      console.log(movieUrl)

      if (!movieUrl) {
        throw new TypeError(`No movie url found`)
      }

      const movieUrlMatch = checkIfMovieUrl(movieUrl)

      return movieUrlMatch || `No movie url found`
    } catch (error: any) {
      console.log(chalk.red(error.message))
      
      return error
    }
}

export default scrapeIframeUrl

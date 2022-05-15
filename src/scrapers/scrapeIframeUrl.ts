require(`module-alias/register`)

import { Browser } from "puppeteer"

const scrapeIframeUrl = async (browser: Browser, url: string): Promise<string> => {
    try {
			const page = await browser.newPage()

      await page.goto(url)
      // await page.setRequestInterception(true)
      
      // page.on('request', request => {
      //   console.log(request.url())
      // })
      page.waitForSelector('#cmc')

      const src = await page.evaluate((): string => {
        return document.querySelector('#cmc')?.getAttribute('src') || ``
      })

      return `https:${src}`
    } catch (error) {
      return ``
    }
}

export default scrapeIframeUrl

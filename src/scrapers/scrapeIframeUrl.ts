require(`module-alias/register`)

import { Browser } from "puppeteer"

const scrapeIframeUrl = async (browser: Browser, url: string): Promise<string> => {
    try {
			const page = await browser.newPage()

      await page.goto(url)

      return ``
    } catch (error) {
      return ``
    }
}

export default scrapeIframeUrl

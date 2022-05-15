import chalk from "chalk"

const checkIfMovieUrl = (url: string): string => {
  const regex = /https:\/\/playerc.cuevana2\.io\/ir\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)\/([0-9]+)/gm
  const match = url.match(regex)

  if (!match) {
    throw new TypeError(chalk.red(`No movie url found`))
  }

  return match[0]
}

export default checkIfMovieUrl

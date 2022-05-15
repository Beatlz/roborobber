const checkIfCuevanaUrl = (url: string): boolean => {
  const regex = /^https:\/\/(www\.)?cuevana2\.io\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)\//
  const match = regex.test(url)

  return match
}

export default checkIfCuevanaUrl

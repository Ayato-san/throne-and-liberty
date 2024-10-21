function addQueryParams(key: string, value: string) {
  const url = new URL(window.location.href)
  url.searchParams.delete(key)
  url.searchParams.append(key, value)
  window.history.replaceState(null, '', url)
}

function removeQueryParams(key: string) {
  const url = new URL(window.location.href)
  url.searchParams.delete(key)
  window.history.replaceState(null, '', url)
}

export { addQueryParams, removeQueryParams }

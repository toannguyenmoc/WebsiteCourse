export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) throw new Error(`Error: ${response.status}`)
    return await response.json()
  } catch (error) {
    console.error('Fetch Error:', error)
    return null
  }
}

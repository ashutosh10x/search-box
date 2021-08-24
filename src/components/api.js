export async function fetchData (payload) {
    let res = await fetch(`https://www.omdbapi.com/?apikey=81df2a82&s=${payload}`)
    return res.json()
}

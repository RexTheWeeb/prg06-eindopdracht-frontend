export async function fetchGames() {
    const response = await fetch('http://145.24.237.13:8001/games');

    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }

    return response.json();
}

export async function fetchGameData(url) {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch game data');
    }

    return response.json();
}
import {useEffect, useState} from "react";
import {fetchGames} from "./GameApi";
import GameList from "./components/GameList";

function App() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("");

    const [formData, setFormData] = useState({
        title: '',
        made_by: '',
        genre: '',
        platform: '',
        image: '',
        alt: ''
    });

    async function loadGames() {
        try {
            setLoading(true);
            const data = await fetchGames();
            setGames(data.items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadGames();
    }, []);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function submitGame(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://145.24.237.13:8001/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create game");
            }

            await loadGames();

            setFormData({
                title: '',
                made_by: '',
                genre: '',
                platform: '',
                image: '',
                alt: ''
            });

        } catch (err) {
            setError(err.message);
        }
    }


    const filteredGames = games.filter(game => {
        const matchesSearch = game.title
            ?.toLowerCase()
            .includes(search.toLowerCase());

        const matchesGenre =
            !genreFilter || game.genre === genreFilter;

        return matchesSearch && matchesGenre;
    });

    return (
        <div className="App">
            <h2>Game List</h2>

            {error && <p className="error">{error}</p>}
            {loading && <p>Loading...</p>}


            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                >
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Simulation">Simulation</option>
                </select>
            </div>

            <GameList games={filteredGames}/>

            {!loading && filteredGames.length === 0 && (
                <p>No games match your filters.</p>
            )}
            
            <form className="game-form" onSubmit={submitGame}>
                <h3>Add Game</h3>

                <input
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    name="made_by"
                    placeholder="Developer"
                    value={formData.made_by}
                    onChange={handleChange}
                    required
                />

                <input
                    name="genre"
                    placeholder="Genre"
                    value={formData.genre}
                    onChange={handleChange}
                    required
                />

                <input
                    name="platform"
                    placeholder="Platform"
                    value={formData.platform}
                    onChange={handleChange}
                    required
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                />

                <input
                    name="alt"
                    placeholder="Alt text"
                    value={formData.alt}
                    onChange={handleChange}
                />

                <button>Add Game</button>
            </form>
        </div>
    );
}

export default App;

import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {fetchGameData} from "../GameApi";

function GameDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [game, setGame] = useState(null);
    const [formData, setFormData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function loadGame() {
            try {
                const data = await fetchGameData(`http://145.24.237.13:8001/games/${id}`);
                setGame(data);
                
                setFormData({
                    title: data.title || "",
                    made_by: data.made_by || "",
                    genre: data.genre || "",
                    platform: data.platform || "",
                    image: data.image || "",
                    alt: data.alt || ""
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadGame();
    }, [id]);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    async function updateGame(e) {
        e.preventDefault();
        if (!game || !formData) return;

        try {
            setUpdating(true);

            const response = await fetch(game._links.self.href, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to update game");
            }

            const updated = await response.json();
            setGame(updated);

            alert("Game updated successfully");

        } catch (err) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    }

    async function deleteGame() {
        if (!game) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete "${game.title}"?`
        );

        if (!confirmed) return;

        try {
            setDeleting(true);

            const response = await fetch(game._links.self.href, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete game");
            }

            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setDeleting(false);
        }
    }

    if (loading) return <p>Loading...</p>;

    if (error) {
        return (
            <div>
                <h2>404 — Game Not Found</h2>
                <p>This game does not exist.</p>
                <Link to="/">← Back to Game List</Link>
            </div>
        );
    }

    if (!game || !formData) return null;

    return (
        <div className="game-details">
            <h2>{game.title}</h2>

            {game.image && (
                <img
                    src={game.image}
                    alt={game.alt || game.title}
                    className="game-image"
                />
            )}

            <p><strong>Made by:</strong> {game.made_by}</p>
            <p><strong>Genre:</strong> {game.genre}</p>
            <p><strong>Platform:</strong> {game.platform}</p>

            <h3>Edit Game</h3>

            <form onSubmit={updateGame} className="game-form">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required/>
                <input name="made_by" value={formData.made_by} onChange={handleChange} placeholder="Made by" required/>
                <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required/>
                <input name="platform" value={formData.platform} onChange={handleChange} placeholder="Platform"
                       required/>
                <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL"/>
                <input name="alt" value={formData.alt} onChange={handleChange} placeholder="Alt text"/>

                <button type="submit" disabled={updating}>
                    {updating ? "Updating..." : "Update Game"}
                </button>
            </form>

            <button
                onClick={deleteGame}
                disabled={deleting}
                style={{
                    marginTop: "1rem",
                    backgroundColor: "#b00020",
                    color: "white",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                {deleting ? "Deleting..." : "Delete Game"}
            </button>
        </div>
    );
}

export default GameDetails;
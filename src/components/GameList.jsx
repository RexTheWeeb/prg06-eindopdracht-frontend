import {Link} from "react-router";

export default function GameList({games}) {
    return (
        <ul className="game-list">
            {games.map(game => {
                const selfUrl = game._links?.self?.href;
                const id = selfUrl?.split("/").pop();

                return (
                    <li key={id}>
                        <Link to={`/games/${id}`}>
                            {game.title}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

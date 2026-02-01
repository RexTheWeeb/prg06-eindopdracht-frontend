import {Link} from "react-router";

export default function NotFound() {
    return (
        <div style={{padding: "2rem"}}>
            <h2>404 — Page Not Found</h2>
            <p>The page you’re looking for doesn’t exist.</p>

            <Link to="/">← Back to Game List</Link>
        </div>
    );
}

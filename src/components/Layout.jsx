import {Outlet, Link} from "react-router";

export default function Layout() {
    return (
        <div>
            <header>
                <h1>
                    <Link to="/">🎮 Game Library</Link>
                </h1>
            </header>

            <main>
                <Outlet/>
            </main>
        </div>
    );
}

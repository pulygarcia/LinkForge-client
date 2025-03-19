import { Link } from "react-router-dom";

export default function HomeView() {
    return (
        <header className="w-full flex justify-center py-4 mb-4">
            <Link
                to="/"
                className="text-5xl font-extrabold bg-gradient-to-r from-green-400 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-snug"
            >
                LinkForge
            </Link>
        </header>
    );
}


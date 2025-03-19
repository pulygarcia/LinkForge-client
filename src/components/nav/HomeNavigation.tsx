import { Link } from "react-router-dom";

export default function HomeNavigation() {
    return (
        <Link
        to="/login"
        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-400 transition duration-300"
        >
            Login
        </Link>
    );
  }
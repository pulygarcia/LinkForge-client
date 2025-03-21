import { useNavigate } from "react-router-dom";

export default function HomeView() {
    const navigate = useNavigate();

    const logOut = () => {
        if(confirm('Sure to log out?')){
            localStorage.removeItem('USER_TOKEN');
            navigate('/auth/login');
        }
    }

    return (
        <button
            onClick={logOut}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-red-400 transition duration-300"
        >
            Logout
        </button>
    );
  }
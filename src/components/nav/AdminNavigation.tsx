import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export default function HomeView() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const logOut = () => {
        if(confirm('Sure to log out?')){
            localStorage.removeItem('USER_TOKEN');
            navigate('/auth/login');
            queryClient.invalidateQueries({queryKey:['user']})
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
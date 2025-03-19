import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/LinkForgeApi";
import { useParams, useNavigate } from "react-router-dom";
import { LinkForgeLink } from "../types";

export default function LinkForgeView() {
    const params = useParams();
    const navigate = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getUserByHandle(params.handle!),
        queryKey: ["user", params.handle],
        retry: 1,
        refetchOnWindowFocus: false,
    });

    
    if (isLoading) return <div className="text-white text-center mt-10">Cargando...</div>;
    
    // redirect to 404 if there is an error
    if (isError) {
        navigate("/404");
        return null; // avoid render rest of the component
    }

    return (
        <div className="flex flex-col items-center p-6 text-white min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <img 
                    src={data.user.image || "https://via.placeholder.com/150"} 
                    alt={data.user.name} 
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-700 object-cover" 
                />
                <h2 className="text-2xl font-semibold capitalize">{data.user.name}</h2>
                <p className="text-gray-400 text-sm">@{data.user.handle}</p>
                <p className="mt-4 text-gray-300 capitalize">{data.user.description}</p>
                
                {/* Links */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Links</h3>
                    <ul className="space-y-2">
                        {JSON.parse(data.user.links).filter((link:LinkForgeLink) => link.enabled).map((link:LinkForgeLink) => (
                            <li key={link.name}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline capitalize">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


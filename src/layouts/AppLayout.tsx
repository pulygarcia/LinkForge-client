import { Navigate} from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import { getUser } from "../api/LinkForgeApi";
import LinkForge from "../components/LinkForge";

export default function AppLayout() {
    
    const {data, isLoading, isError} = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
    })
    
    if(isLoading){
        return <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
        </div>
    }
    if(isError){
        return <Navigate to={'/auth/login'}/>
    }
    
    
    if(data) return (
        <LinkForge data={data}/>
    )
}
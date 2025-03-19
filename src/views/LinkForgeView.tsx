import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { User, SocialNetwork } from "../types"
import { social } from "../data/social"
import LinkForgeInput from '../components/LinkForgeInput'
import { isValidURL } from "../lib/helpers"
import { toast } from "sonner"
import { updateUser } from "../api/LinkForgeApi"

export default function LinkForgeView() {
    const[linkForgeLinks, setLinkForgeLinks] = useState(social)

    const queryClient = useQueryClient();
    const user:User = queryClient.getQueryData(['user'])!
    const {mutate} = useMutation({
        mutationFn: updateUser,
        onError: (err:any) => {
            toast.error(err.message);
        },
        onSuccess: () => {
            toast.success('Enlaces cargados');
        }
    })

    useEffect(() => {
        const updatedData = linkForgeLinks.map(item => {
            const userLink = JSON.parse(user.links).find((link:SocialNetwork) => link.name === item.name);
            if(userLink){
                return{...item, url:userLink.url, enabled:userLink.enabled}
            }else{
                return item;
            }
        })

        setLinkForgeLinks(updatedData);
    },[])

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value);
        //console.log(e.target.name);
        const updatedLinks = linkForgeLinks.map(link => link.name === e.target.name ? {...link, url:e.target.value} : link); //{...link, url:e.target.value} => we take the object like it is, and only change the url

        setLinkForgeLinks(updatedLinks); //update the array in the state
    } 

    const handleEnableLink = (socialNetwork:string) => {
        //console.log(socialNetwork) read what social network has been disabled or enabled
        const updatedLinks = linkForgeLinks.map(link => {
            if(link.name === socialNetwork){
                if(isValidURL(link.url)){
                    return {...link, enabled:!link.enabled}   
                }else{
                    toast.error('Invalid Url'); //endpoint response
                }
            };

            return link
        });

        const links:SocialNetwork[] = JSON.parse(user.links);

        //console.log(updatedLinks)

        setLinkForgeLinks(updatedLinks);

        let updatedItems:SocialNetwork[] = [];

        const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork);
        if(selectedSocialNetwork?.enabled){
            //avoid duplicates when disable and enable the same item
            if(links.some(link => link.name === selectedSocialNetwork.name)){
                updatedItems = links.map(link => {
                    if(link.name === selectedSocialNetwork.name){
                        return{
                            ...link,
                            enabled: true,
                            id:links.filter(link => link.id > 0).length + 1
                        }
                    }else{
                        return link
                    }
                })
            }else{
                //create id for the link
                const newItem = {
                    ...selectedSocialNetwork,
                    id:links.filter(link => link.id > 0).length + 1
                }
    
                updatedItems = [...links, newItem];
            }
        }else{
            //disable and organize id's again
            const indexToUpdate = links.findIndex(item => item.name === socialNetwork);

            updatedItems = links.map(link => {
                if(link.name === socialNetwork){
                    return{
                        ...link,
                        id:0,
                        enabled: false
                    }
                //reorder
                }else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){
                    return{
                        ...link,
                        id:link.id - 1
                    }
                }else{
                    return link
                }
            })
        }

        console.log(updatedItems)

        //send the links to the user data and save in Db
        queryClient.setQueryData(['user'], (prevData:User) => {
            return{
                ...prevData,
                links: JSON.stringify(updatedItems)
            };
        });
    } 
    return (
        <div className='mb-5 space-y-5'>
            {linkForgeLinks.map((item) => (
                <LinkForgeInput
                    key={item.name}
                    item={item}
                    handleInputChange={handleInputChange} //send the function via prop
                    handleEnableLink={handleEnableLink}
                />
            ))}

            <button 
                className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md text-white font-bold w-full"
                onClick={()=> mutate(queryClient.getQueryData(['user'])!)}
            >
                Save changes
            </button>
        </div>
    )
}
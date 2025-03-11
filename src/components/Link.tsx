import { SocialNetwork } from "../types";

type LinkForgeLinkProps = {
    link:SocialNetwork
}

export default function Link({link}:LinkForgeLinkProps){
    return(
        <>
            <li className="bg-gray-700 py-2 px-5 rounded-md flex items-center gap-5">
                <div 
                    className="w-12 h-12 bg-cover"
                    style={{backgroundImage:`url(/social/icon_${link.name}.svg)`}}
                ></div>

                <a href={link.url} className="text-white text-md underline hover:text-blue-500">{link.url}</a>
            </li>
        </>
    )
}
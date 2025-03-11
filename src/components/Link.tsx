import { SocialNetwork } from "../types";

type LinkForgeLinkProps = {
    link:SocialNetwork
}

export default function Link({link}:LinkForgeLinkProps){
    return(
        <p className="text-white">{link.name}</p>
    )
}
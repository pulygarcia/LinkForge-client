import { SocialNetwork } from "../types";
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'

type LinkForgeLinkProps = {
    link:SocialNetwork
}

export default function Link({link}:LinkForgeLinkProps){
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id:link.id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition
    }

    return(
        <>
            <li 
                ref={setNodeRef}
                className="bg-gray-700 py-2 px-5 rounded-md flex items-center gap-5"
                style={style}
                {...attributes}
                {...listeners}
            >
                <div 
                    className="w-12 h-12 bg-cover"
                    style={{backgroundImage:`url(/social/icon_${link.name}.svg)`}}
                ></div>

                <a href={link.url} className="text-white text-md underline hover:text-blue-500">{link.url}</a>
            </li>
        </>
    )
}
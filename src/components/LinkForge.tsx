import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "./NavigationTabs";
import { User, SocialNetwork } from "../types";
import LinkForgeLink from "./LinkForgeLink";
import Header from "./Header";
import { useEffect } from "react";
import {DndContext, DragEndEvent, closestCenter} from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy, arrayMove} from '@dnd-kit/sortable';
import { useQueryClient } from "@tanstack/react-query";

type LinkForgeProps = {
    data:User
}

export default function LinkForge({ data }:LinkForgeProps) {

    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item:SocialNetwork) => item.enabled))
    //console.log(enabledLinks)

    //refresh visually when data changes(enable, disable or delete a link)
    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item:SocialNetwork) => item.enabled));
    },[data])

    const queryClient = useQueryClient();

    const handleDragEnd = (e:DragEndEvent) => {
        if(e.over && e.over.id){
            //console.log(e.active.id) //item u're moving
            //console.log(e.over.id)//item has been displaced
    
            const prevIndex = enabledLinks.findIndex(link => link.id === e.active.id);
            const newIndex = enabledLinks.findIndex(link => link.id === e.over?.id);
            const order = arrayMove(enabledLinks, prevIndex, newIndex);

            setEnabledLinks(order);
            //dont forget disabled links before send to caché
            const disabledLinks = JSON.parse(data.links).filter((item:SocialNetwork) => !item.enabled);

            const links = [...order, ...disabledLinks] //save all of them in cache in order to dont lose disabled ones

            queryClient.setQueryData(['user'], (prevData:User) => {
                return{
                    ...prevData,
                    links:JSON.stringify(links)
                }
            })
        }

    }

  return (
    <>
            <Header />
            
            <div className="bg-gray-100  min-h-screen py-10">

                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    
                <NavigationTabs />
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-slate-800 text-right text-2xl"
                            to={`/${data.handle}`}
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            Check my profile!: <span className="text-2xl font-semibold underline text-blue-700">{data.handle}</span>
                        </Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <h2 className="text-center text-white text-2xl font-semibold">{data.handle}</h2>
                            <img src={data.image ? data.image : 'https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg'} alt="image" className="mx-auto max-w-[250px]" />
                            <p className="text-center text-white text-lg capitalize font-bold">{data.description}</p>
                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="flex flex-col mt-20 gap-5">
                                    <SortableContext
                                        items={enabledLinks}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {enabledLinks.map((link) => (
                                            <LinkForgeLink key={link.name} link={link}/>
                                        ))}     
                                    </SortableContext>
                                </div>
                            </DndContext>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
  );
}
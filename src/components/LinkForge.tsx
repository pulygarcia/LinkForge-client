import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "./NavigationTabs";
import { User, SocialNetwork } from "../types";
import Link from "./Link";
import { useEffect } from "react";

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

  return (
    <>
            <header className="bg-slate-800 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-full block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
                            onClick={() => {localStorage.removeItem('USER_TOKEN')}}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100  min-h-screen py-10">

                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    
                <NavigationTabs />

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
                            <h2 className="text-center text-white text-2xl font-semibold">{data.handle}</h2>
                            <img src={data.image ? data.image : 'https://img.freepik.com/premium-vector/user-icons-includes-user-icons-people-icons-symbols-premiumquality-graphic-design-elements_981536-526.jpg'} alt="image" className="mx-auto max-w-[250px]" />
                            <p className="text-center text-white text-lg capitalize font-bold">{data.description}</p>
                            <div className="flex flex-col mt-20 gap-5">
                                {enabledLinks.map((link) => (
                                    <Link key={link.name} link={link}/>
                                ))}     
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
  );
}
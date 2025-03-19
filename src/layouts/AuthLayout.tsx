import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Logo from "../components/Logo";

export default function App() {
  
    return (
      <>
        <div className=" bg-slate-900 min-h-screen">
            <div className="max-w-lg pt-10 mx-auto px-5">
                <Logo />

                <div className="py-10">
                    <Outlet /> {/*router view*/ }
                </div>
            </div>
        </div>

        <Toaster position='top-right' richColors />
      </>
    );
  }
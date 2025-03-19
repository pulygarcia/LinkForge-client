// src/views/HomeView.js

import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function HomeView() {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-green-400 via-blue-300 to-purple-400 bg-clip-text mb-6 text-left">
                        Todas tus <span className="text-green-400">redes sociales</span> en un enlace
                    </h2>
                    <p className="text-xl font-medium leading-relaxed mb-8 text-left">
                        Únete a más de <span className="text-green-500">200.000 developers</span> que comparten sus <span className="text-blue-400">redes sociales</span> con <span className="text-purple-400">LinkForge</span>.
                    </p>
                    <Link
                        to="/register"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-400 transition duration-300"
                    >
                        Regístrate ahora
                    </Link>
                </div>
            </div>
        </div>
    );
}



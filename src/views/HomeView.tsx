import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import { Link } from 'react-router-dom';

export default function HomeView() {
    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2">
                    <h2 className="text-6xl font-extrabold text-transparent bg-gradient-to-r from-green-400 via-blue-300 to-purple-400 bg-clip-text mb-6 text-left">
                        All your <span className="text-green-400">social networks</span> in one link
                    </h2>
                    <p className="text-2xl font-medium leading-relaxed mb-8 text-left">
                        Join over <span className="text-green-500">200,000 developers</span> who share their <span className="text-blue-400">social networks</span> with <span className="text-purple-400">LinkForge</span>.
                    </p>
                    <Link
                        to="/register"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-400 transition duration-300"
                    >
                        Sign up now
                    </Link>

                    <div className='mt-10'>
                        <SearchForm />
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <img
                        src="/people.png"
                        alt="Image"
                        className="w-ful object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}

export default function HomeView() {
    return (
        <button
            onClick={() => console.log('Logging out...')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-red-400 transition duration-300"
        >
            Logout
        </button>
    );
  }
export default function NotFoundView() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-6">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-2">Oops! User not found</p>
        <p className="text-gray-500 mt-1">The page you are looking for doesn’t exist.</p>
        <a
          href="/"
          className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
        >
          Go Home
        </a>
      </div>
    );
  }
  
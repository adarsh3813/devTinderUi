import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Logo / Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-pink-400 mb-4 tracking-tight">
          Find Your Match
        </h1>
        <p className="md:text-xl text-lg mb-2">🧑🏼‍💻💘👩🏼‍💻</p>
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Swipe. Chat. Discuss about technology. Find people with similar
          interests building real connections.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold py-3 px-6 rounded-full shadow-lg transition"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
          <a href="https://github.com/adarsh3813/devTinderUi">
            <button className="bg-transparent border border-pink-400 text-pink-400 hover:bg-pink-600 hover:text-white text-lg font-semibold py-3 px-6 rounded-full transition">
              Learn More
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;

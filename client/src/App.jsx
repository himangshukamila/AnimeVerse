import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Subscription from "./pages/Subscription";
import TopAiring from "./pages/TopAiring";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import NewReleases from "./pages/NewReleases";
import About from "./pages/About";
import Terms from "./pages/Terms";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { X } from "lucide-react";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/top-airing" element={<TopAiring />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/new-releases" element={<NewReleases />} />

          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />

        <Toaster position="bottom-right">
          {(t) => (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
                t.type === "error" ? "border-red-500/30" : "border-white/10"
              } bg-[#18181b] text-white`}
            >
              <span className="text-sm">{t.message}</span>

              <button
                onClick={() => toast.dismiss(t.id)}
                className="ml-auto text-gray-400 hover:text-white transition"
              >
                <X size={16}/>
              </button>
            </div>
          )}
        </Toaster>
      </div>
    </Router>
  );
}

export default App;

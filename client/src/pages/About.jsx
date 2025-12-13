const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
      <h1 className="text-4xl font-bold mb-6 gradient-text">
        About AnimeVerse
      </h1>

      <p className="mb-6 leading-relaxed">
        AnimeVerse is a modern anime discovery and streaming platform built for
        anime fans who want a clean, fast, and reliable way to explore anime
        titles.
      </p>

      <p className="mb-6 leading-relaxed">
        We do <span className="font-semibold text-white">not host</span> any
        copyrighted video content. All anime data, images, and metadata are
        fetched from publicly available APIs and official sources that allow
        free access.
      </p>

      <p className="mb-6 leading-relaxed">
        AnimeVerse is designed for educational, informational, and community
        purposes only. Our goal is to help users discover anime, track
        favorites, and stay updated with trending and currently airing shows.
      </p>

      <div className="mt-10 p-6 rounded-xl bg-dark-200 border border-white/10">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Copyright Notice
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          All anime titles, characters, images, and trademarks belong to their
          respective owners. AnimeVerse does not claim ownership over any
          third-party content.
        </p>
      </div>
    </div>
  );
};

export default About;

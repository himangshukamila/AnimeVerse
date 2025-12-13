const TermsOfService = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
      <h1 className="text-4xl font-bold mb-6 gradient-text">
        Terms of Service
      </h1>

      <p className="mb-6 leading-relaxed">
        These Terms of Service govern your access to AnimeVerse and its
        features.
      </p>

      <p className="mb-6 leading-relaxed">
        AnimeVerse provides anime-related information, discovery tools, and user
        features such as favorites and watchlists. We do not provide illegal or
        pirated content.
      </p>

      <p className="mb-6 leading-relaxed">
        Any misuse of the platform, including attempts to scrape, abuse APIs, or
        disrupt services, may result in account suspension.
      </p>

      <div className="mt-10 p-6 rounded-xl bg-dark-200 border border-white/10">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Service Changes
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          We may update features, pricing, or availability at any time without
          prior notice.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;

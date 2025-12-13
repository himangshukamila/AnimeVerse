const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
      <h1 className="text-4xl font-bold mb-6 gradient-text">
        Terms & Conditions
      </h1>

      <p className="mb-6 leading-relaxed">
        By accessing and using AnimeVerse, you agree to comply with the
        following terms and conditions. If you do not agree, please discontinue
        use of the platform.
      </p>

      <ul className="space-y-4 list-disc list-inside">
        <li>
          AnimeVerse does not host or distribute copyrighted video content.
        </li>
        <li>
          All data shown is sourced from free and publicly available APIs.
        </li>
        <li>
          Users are responsible for how they use the information provided.
        </li>
        <li>
          We reserve the right to modify or discontinue services without notice.
        </li>
      </ul>

      <div className="mt-10 p-6 rounded-xl bg-dark-200 border border-white/10">
        <h2 className="text-xl font-semibold mb-2 text-white">
          Limitation of Liability
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          AnimeVerse shall not be held liable for any damages arising from the
          use or inability to use this platform.
        </p>
      </div>
    </div>
  );
};

export default Terms;

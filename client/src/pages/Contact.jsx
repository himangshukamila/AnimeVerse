const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-gray-300">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Contact Us</h1>

      <p className="mb-10 leading-relaxed">
        Have questions, feedback, or copyright concerns? Reach out to us and
        we’ll get back to you as soon as possible.
      </p>

      <div className="space-y-6">
        <div className="p-6 rounded-xl bg-dark-200 border border-white/10">
          <h2 className="text-lg font-semibold text-white">Email</h2>
          <p className="text-gray-400">support@animeverse.app</p>
        </div>

        <div className="p-6 rounded-xl bg-dark-200 border border-white/10">
          <h2 className="text-lg font-semibold text-white">Copyright Issues</h2>
          <p className="text-gray-400">
            If you believe any content violates copyright laws, please email us
            with proper documentation and we will take prompt action.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

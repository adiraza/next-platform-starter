"use client";

const HomeSection: React.FC = () => {
    return (
        <section
            id="home"
            className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-green-50 to-blue-50"
        >
            <div className="relative z-10 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fadeInUp">
                    Powering the Future with Clean Solar Energy
                </h1>
                <p className="text-lg text-gray-700 mb-8 animate-fadeInUp delay-200">
                    We design, build, and maintain top-tier solar plants for industries,
                    homes, and businesses across India.
                </p>
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
                    Get Free Consultation
                </button>
            </div>
        </section>
    );
};

export default HomeSection;

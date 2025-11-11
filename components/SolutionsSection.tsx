"use client";

interface Solution {
    title: string;
    desc: string;
}

const SolutionsSection: React.FC = () => {
    const solutions: Solution[] = [
        {
            title: "Commercial Solar Plants",
            desc: "End-to-end solar installations for large businesses.",
        },
        {
            title: "Residential Rooftop Solutions",
            desc: "Affordable rooftop systems for sustainable homes.",
        },
        {
            title: "Maintenance & Monitoring",
            desc: "24x7 performance monitoring and fault detection.",
        },
    ];

    return (
        <section id="solutions" className="py-20 bg-white text-center">
            <h2 className="text-4xl font-bold mb-10">Our Solutions</h2>
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                {solutions.map((item, i) => (
                    <div
                        key={i}
                        className="p-8 border border-gray-200 rounded-2xl hover:bg-yellow-400 hover:text-black transition-all duration-300"
                    >
                        <h3 className="font-semibold text-2xl mb-3">{item.title}</h3>
                        <p className="text-gray-700">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SolutionsSection;

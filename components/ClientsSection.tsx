"use client";

interface Client {
    name: string;
    rating: number;
}

const ClientsSection: React.FC = () => {
    const clients: Client[] = [
        { name: "Tata Power", rating: 5 },
        { name: "Adani Solar", rating: 4.8 },
        { name: "NTPC Green", rating: 4.9 },
    ];

    return (
        <section id="clients" className="py-20 bg-gray-50 text-center">
            <h2 className="text-4xl font-bold mb-10">Our Top Clients</h2>
            <div className="flex justify-center flex-wrap gap-8">
                {clients.map((client, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-xl shadow-lg w-60 hover:-translate-y-2 hover:shadow-2xl transition"
                    >
                        <h3 className="font-semibold text-xl mb-2">{client.name}</h3>
                        <p className="text-yellow-500 text-lg">
                            {"★".repeat(Math.floor(client.rating))}
                            {client.rating.toFixed(1)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ClientsSection;

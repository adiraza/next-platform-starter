// export default HomePage;
import HomeSection from "@/components/HomeSection";
import ClientsSection from "@/components/ClientsSection";
import SolutionsSection from "@/components/SolutionsSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        <HomeSection />
        <ClientsSection />
        <SolutionsSection />
      </main>
      <Footer />
    </div>
  );
}

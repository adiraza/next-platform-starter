import EnhancedHomeSection from "@/components/EnhancedHomeSection";
import ClientsSection from "@/components/ClientsSection";
import SolutionsSection from "@/components/SolutionsSection";
import StatsSection from "@/components/StatsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main>
        <EnhancedHomeSection />
        <StatsSection />
        <WhyChooseUsSection />
        <SolutionsSection />
        <ClientsSection />
      </main>
      <Footer />
    </div>
  );
}

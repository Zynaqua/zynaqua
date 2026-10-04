import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { MobileActionBar } from "./MobileActionBar";
import { DemoSheetProvider } from "@/components/home/DemoSheetProvider";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoSheetProvider>
      <div className="public-site flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MobileActionBar />
      </div>
    </DemoSheetProvider>
  );
}
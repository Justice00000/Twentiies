import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* pt accounts for announcement bar (~36px) + navbar (~80px) */}
      <main className="flex-1 pt-[116px] md:pt-[124px]">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;

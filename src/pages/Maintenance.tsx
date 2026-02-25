import logo from "@/assets/logo.png";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <img src={logo} alt="Twentiies" className="h-24 md:h-32 w-auto mb-8" />
      <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
        Under Maintenance
      </h1>
      <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed mb-8">
        We're currently making some improvements to give you a better experience. We'll be back shortly.
      </p>
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-xs tracking-widest uppercase font-medium">Working on it</span>
      </div>
      <div className="mt-12">
        <a
          href="https://wa.me/250792417246"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-foreground/20 text-foreground text-[11px] font-bold tracking-[0.3em] uppercase px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Contact Us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Maintenance;

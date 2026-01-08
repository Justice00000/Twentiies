import { Link } from "react-router-dom";
import { ArrowRight, Scissors, Users, Star, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import HeroSlideshow from "@/components/HeroSlideshow";
import FlowerBloom from "@/components/animations/FlowerBloom";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SlidingGallery from "@/components/animations/SlidingGallery";
import MasonryGallery from "@/components/animations/MasonryGallery";
import HoverCard3D from "@/components/animations/HoverCard3D";
import { useLanguage } from "@/contexts/LanguageContext";

// Model images (for gallery sections)
import model1 from "@/assets/model-1.png";
import model2 from "@/assets/model-2.png";
import model3 from "@/assets/model-3.png";
import model4 from "@/assets/model-4.png";

// Product images (pants)
import pants1 from "@/assets/pants-1.jpg";
import pants2 from "@/assets/pants-2.jpg";
import pants3 from "@/assets/pants-3.jpg";
import pants4 from "@/assets/pants-4.jpg";
import pants5 from "@/assets/pants-5.jpg";
import pants6 from "@/assets/pants-6.jpg";

const Index = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Scissors, title: t("customTailoring") },
    { icon: Shirt, title: "Ready-Made" },
    { icon: Users, title: "Grooms-wear" },
    { icon: Star, title: "Corporate Orders" },
  ];

  const heroImages = [model1, model2, model3, model4];
  const slidingImages1 = [pants1, pants2, pants3, pants4, pants5, pants6];
  const slidingImages2 = [pants6, pants5, pants4, pants3, pants2, pants1];
  const flowerImages = [model1, pants1, model2, pants2, model3, pants3, model4];
  const masonryImages = [pants1, model1, pants2, model2, pants3, model3, pants4, pants5];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center bg-charcoal">
        <HeroSlideshow />

        <div className="container relative z-10 py-16 md:py-20">
          <div className="max-w-2xl text-primary-foreground px-2">
            <ScrollReveal animation="fade-right" duration={1000}>
              <p className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm mb-3 md:mb-4">
                {t("heroTitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200} duration={1000}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-semibold leading-tight mb-4 md:mb-6">
                African Elegance. Modern Style.
              </h1>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400} duration={1000}>
              <p className="text-base md:text-lg text-primary-foreground/80 mb-6 md:mb-8 max-w-lg">
                {t("heroSubtitle")}
              </p>
            </ScrollReveal>
            <ScrollReveal animation="zoom-in" delay={600} duration={800}>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link to="/order">
                  <Button variant="gold" size="lg" className="group w-full sm:w-auto">
                    {t("orderNow")}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="hero-outline" size="lg" className="w-full sm:w-auto text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-charcoal">
                    {t("services")}
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sliding Gallery - Left */}
      <section className="py-6 md:py-8 bg-charcoal overflow-hidden">
        <SlidingGallery images={slidingImages1} direction="left" speed={60} />
      </section>

      {/* Intro Section with 3D Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-4 md:space-y-6">
              <ScrollReveal animation="fade-right">
                <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">
                  {t("aboutTitle")}
                </span>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={100}>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-semibold leading-tight">
                  We Shape Identity.
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {t("aboutDescription")}
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={300}>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="mt-2 md:mt-4 group">
                    {t("learnMore")}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </ScrollReveal>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Link to="/shop">
                <HoverCard3D>
                  <img src={model1} alt="Agbada" className="rounded-lg shadow-xl bg-cream/50" />
                </HoverCard3D>
              </Link>
              <Link to="/shop" className="mt-8 md:mt-12">
                <HoverCard3D>
                  <img src={model2} alt="Kaftan" className="rounded-lg shadow-xl bg-cream/50" />
                </HoverCard3D>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flower Bloom Gallery Section */}
      <section className="py-16 md:py-24 bg-cream overflow-hidden">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-6 md:mb-8">
            <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">
              {t("featuredTitle")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-semibold mt-3 md:mt-4 text-charcoal">
              {t("exploreCollection")}
            </h2>
            <p className="text-muted-foreground mt-3 md:mt-4 max-w-xl mx-auto text-sm md:text-base">
              {t("featuredSubtitle")}
            </p>
          </ScrollReveal>
          
          <FlowerBloom images={flowerImages} />
        </div>
      </section>

      {/* Sliding Gallery - Right */}
      <section className="py-6 md:py-8 bg-brown overflow-hidden">
        <SlidingGallery images={slidingImages2} direction="right" speed={50} />
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-charcoal text-primary-foreground">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-16">
            <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">
              {t("servicesTitle")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-semibold mt-3 md:mt-4">
              {t("services")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.title}
                animation="fade-up"
                delay={index * 100}
              >
                <HoverCard3D>
                  <div className="p-4 md:p-6 border border-primary-foreground/10 rounded-lg hover:border-gold/50 transition-all duration-300 group bg-charcoal-light/20 backdrop-blur-sm">
                    <service.icon className="w-8 h-8 md:w-10 md:h-10 text-gold mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading text-base md:text-xl font-medium">
                      {service.title}
                    </h3>
                  </div>
                </HoverCard3D>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={400} className="text-center mt-8 md:mt-12">
            <Link to="/services">
              <Button variant="gold" size="lg" className="group">
                {t("viewAll")} {t("services")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Masonry Gallery - Featured
      <section className="py-16 md:py-24 bg-cream">
        <div className="container px-4">
          <ScrollReveal animation="fade-up" className="text-center mb-10 md:mb-16">
            <span className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm">
              {t("featuredTitle")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-semibold mt-3 md:mt-4 text-charcoal">
              Style That Speaks
            </h2>
          </ScrollReveal>

          <Link to="/shop">
            <MasonryGallery images={masonryImages} />
          </Link>
          
          <ScrollReveal animation="fade-up" delay={200} className="text-center mt-8 md:mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="group border-charcoal text-charcoal hover:bg-charcoal hover:text-cream">
                {t("viewAll")}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section> */}

      {/* Another Sliding Gallery */}
      <section className="py-6 md:py-8 bg-charcoal overflow-hidden">
        <SlidingGallery images={[...slidingImages1].reverse()} direction="left" speed={55} />
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-brown text-primary-foreground relative overflow-hidden">
        {/* Background decorative images */}
        <div className="absolute inset-0 opacity-10">
          <img src={pants1} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="container text-center relative z-10 px-4">
          <ScrollReveal animation="fade-up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-semibold mb-4 md:mb-6">
                Ready to Define Your Style?
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link to="/order">
                  <Button variant="gold" size="lg" className="group w-full sm:w-auto">
                    {t("orderNow")}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="https://wa.me/250792417246" target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

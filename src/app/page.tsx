import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getProducts } from "@/lib/actions/products";
import { getBanners } from "@/lib/actions/banners";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Discover the authentic taste of Calicut Halwa, reimagined for the modern era. Handcrafted with passion.",
};

export default async function Home() {
  const { data: allProducts } = await getProducts();
  const { data: banners } = await getBanners();
  const featuredProducts = allProducts?.slice(0, 4) || [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden py-12 md:py-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          {/* Background Overlay */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src="/bgchristmas.png"
              alt="Hero Background"
              fill
              className="object-cover opacity-25 mix-blend-multiply dark:mix-blend-screen"
              priority
            />
          </div>

          <div className="container relative z-10 px-6 md:px-12 lg:px-24">
            <div className="grid gap-12 lg:gap-8 items-center md:grid-cols-2">
              {/* Content Column (Bottom on mobile, Left on desktop) */}
              <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
                <div
                  className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6"
                >
                  <Star className="h-3.5 w-3.5 fill-primary mr-2" />
                  <span>Authentic Calicut Halwa</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] select-none text-foreground">
                  INWA
                  <br />
                  <span className="text-primary">HALWA</span>
                </h1>
                <p className="mt-6 max-w-lg text-lg text-muted-foreground sm:text-xl">
                  Experience the perfect fusion of tradition and modern luxury. Handcrafted with the finest ingredients for an unforgettable taste.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button size="lg" className="h-12 px-8 text-base font-bold w-full sm:w-auto" asChild>
                    <Link href="/products">
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base font-bold w-full sm:w-auto" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>

              {/* Ad Column (Top on mobile, Right on desktop) */}
              <div className="order-1 md:order-2 flex justify-center w-full">
                <div className="w-full max-w-md md:max-w-full">
                  <HeroCarousel banners={banners || []} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection Preview */}
        <section className="py-24 sm:py-32">
          <div className="container px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="mb-16 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Collection</h2>
                <p className="mt-4 text-muted-foreground">A glimpse into our premium range.</p>
              </div>
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link href="/products">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.imageUrl})` }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-medium">{product.price}</span>
                      <Button size="sm" variant="secondary" asChild>
                        <Link href="/products">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {featuredProducts.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No products available yet.
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center sm:hidden">
              <Button variant="ghost" asChild>
                <Link href="/products">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-foreground py-24 text-background sm:py-32">
          <div className="container px-8 md:px-16 lg:px-32 xl:px-48">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Tradition, <span className="text-primary">Perfected.</span>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground/80">
                  Inwa brings you the rich, timeless taste of authentic Calicut Halwa. Crafted using traditional Kozhikode recipes and high-quality ingredients, every batch is made with care, purity, and passion.
                  Our mission is simple — to deliver the original flavour of Kozhikode’s famous halwa in its freshest, most premium form.
                  With Inwa, you don’t just taste halwa; you experience a piece of Calicut tradition.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-primary">100%</h3>
                    <p className="mt-2 text-sm text-muted-foreground/80">Authentic Source</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">12+</h3>
                    <p className="mt-2 text-sm text-muted-foreground/80">Varieties of Flavors</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/10 lg:aspect-auto lg:h-[600px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <Image
                      src="/dih.webp"
                      alt="INWA Brand Heritage"
                      fill
                      className="object-cover opacity-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Steps */}
        <section className="py-24 sm:py-32">
          <div className="container px-8 md:px-16 lg:px-32 xl:px-48 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Begin Your Inquiry</h2>
            <p className="mt-4 text-muted-foreground">Three simple steps to order your premium halwa.</p>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {[
                { title: "Browse", desc: "Explore our curated collection of flavors." },
                { title: "Select", desc: "Choose the products you wish to order." },
                { title: "Connect", desc: "Chat with us on WhatsApp to finalize." },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {i + 1}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Button size="lg" className="h-14 gap-2 px-8 text-lg font-bold" asChild>
                <Link href="/products">
                  <MessageCircle className="h-5 w-5" /> Start Inquiry Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

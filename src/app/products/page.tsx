import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { getProducts } from "@/lib/actions/products";

export default async function ProductsPage() {
    const { data: products } = await getProducts();

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="container max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl md:text-6xl">
                            OUR COLLECTION
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                            Select a product to start an inquiry on WhatsApp. Discover our premium collection of artisanal halwa, crafted for the modern palate.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products?.map((product: any) => (
                            <div
                                key={product.id}
                                className="group flex flex-col gap-4 rounded-xl border-2 border-primary p-4 bg-card"
                            >
                                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
                                    <div
                                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${product.imageUrl})` }}
                                        role="img"
                                        aria-label={product.name}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
                                        <span className="text-sm font-medium">{product.price}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                    <Button asChild className="mt-2 w-full gap-2 font-bold">
                                        <Link href={`https://wa.me/918086619029?text=I'm interested in ${product.name}`} target="_blank">
                                            <MessageCircle className="h-4 w-4" />
                                            Inquire via WhatsApp
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                        {(!products || products.length === 0) && (
                            <div className="col-span-full text-center py-12 text-muted-foreground">
                                No products available at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

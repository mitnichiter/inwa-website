import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-md">
                            <Image
                                src="/inwalogo.png"
                                alt="INWA Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight">INWA</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="hover:text-primary transition-colors">
                            Products
                        </Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">
                            Contact Us
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-primary transition-colors">
                            Privacy
                        </Link>
                    </div>

                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">Instagram</span>
                            <Instagram className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">Facebook</span>
                            <Facebook className="h-5 w-5" />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <span className="sr-only">Twitter</span>
                            <Twitter className="h-5 w-5" />
                        </Link>
                    </div>
                </div>

                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} INWA. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

"use client";


import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    {/* Placeholder for Logo */}
                    {/* Logo */}
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                            src="/inwalogo.png"
                            alt="INWA Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold tracking-tight">INWA</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/" ? "text-primary" : "text-muted-foreground")}>Home</Link>
                    <Link href="/products" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/products" ? "text-primary" : "text-muted-foreground")}>Products</Link>
                    <Link href="/contact" className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/contact" ? "text-primary" : "text-muted-foreground")}>Contact</Link>
                    <Button asChild className="rounded-full font-bold">
                        <Link href="https://wa.me/1234567890" target="_blank">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Inquire on WhatsApp
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Nav */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col gap-6 mt-8 px-6">
                            <Link href="/" onClick={() => setIsOpen(false)} className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === "/" ? "text-primary" : "text-muted-foreground")}>Home</Link>
                            <Link href="/products" onClick={() => setIsOpen(false)} className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === "/products" ? "text-primary" : "text-muted-foreground")}>Products</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === "/contact" ? "text-primary" : "text-muted-foreground")}>Contact</Link>
                            <Button asChild className="w-full rounded-full font-bold">
                                <Link href="https://wa.me/1234567890" target="_blank">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Inquire on WhatsApp
                                </Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

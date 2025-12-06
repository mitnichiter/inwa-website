"use client";

import { Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { submitContactForm } from "@/lib/actions/messages";
import { toast } from "sonner";
import { useRef } from "react";

export default function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        const res = await submitContactForm(formData);
        if (res.success) {
            toast.success("Message sent successfully!", {
                description: "We'll get back to you shortly.",
            });
            formRef.current?.reset();
        } else {
            toast.error("Failed to send message", {
                description: "Please try again later.",
            });
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                        {/* Left Column: Info */}
                        <div className="flex flex-col">
                            <h1 className="text-6xl font-bold tracking-tighter text-primary sm:text-7xl lg:text-8xl">
                                REACH OUT
                            </h1>
                            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                                We're here to help with any questions about our products. For fastest response, connect with us directly on WhatsApp for product inquiries.
                            </p>

                            <div className="mt-12 flex flex-col space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-wider">Product Question?</h3>
                                    <Button asChild size="lg" className="mt-4 w-full gap-2 sm:w-auto font-bold">
                                        <Link href="https://wa.me/1234567890" target="_blank">
                                            <MessageCircle className="h-5 w-5" />
                                            Chat on WhatsApp
                                        </Link>
                                    </Button>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-wider">General Contact</h3>
                                    <div className="mt-4 space-y-3 text-muted-foreground">
                                        <p className="flex items-center gap-3">
                                            <Mail className="h-5 w-5 text-primary" />
                                            <span>contact@inwa.com</span>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <span>Mon - Fri, 9:00 AM - 5:00 PM</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="border-2 border-primary p-8 lg:p-12 bg-card rounded-xl">
                            <h2 className="text-3xl font-bold tracking-tight text-primary">Send a Message</h2>
                            <p className="mt-2 text-muted-foreground">
                                For general inquiries, use this form. For product questions, WhatsApp is faster.
                            </p>

                            <form ref={formRef} action={handleSubmit} className="mt-8 space-y-6">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="uppercase tracking-wider">Name</Label>
                                        <Input id="name" name="name" placeholder="Enter your name" className="bg-background" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="uppercase tracking-wider">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="Enter your email address" className="bg-background" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message" className="uppercase tracking-wider">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder="Your message here..."
                                        className="min-h-[120px] bg-background"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full font-bold" size="lg">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

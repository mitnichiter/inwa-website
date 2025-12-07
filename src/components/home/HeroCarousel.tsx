"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Banner = {
    id: number;
    imageUrl: string;
    title: string | null;
    link: string | null;
};

export function HeroCarousel({ banners }: { banners: Banner[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [banners.length]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = banners.length - 1;
            if (next >= banners.length) next = 0;
            return next;
        });
    };

    if (!banners.length) {
        return (
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No active offers.</p>
            </div>
        );
    }

    const currentBanner = banners[currentIndex];

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const ContentWrapper = currentBanner.link ? Link : "div";

    return (
        <div className="relative aspect-[3/2] w-full max-w-[600px] mx-auto overflow-hidden rounded-2xl shadow-xl group">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0 h-full w-full"
                >
                    <ContentWrapper
                        href={currentBanner.link || "#"}
                        className={`block relative h-full w-full ${currentBanner.link ? "cursor-pointer" : ""}`}
                    >
                        <Image
                            src={currentBanner.imageUrl}
                            alt={currentBanner.title || "Offer"}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                        />
                        {currentBanner.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                                <h3 className="text-xl font-bold">{currentBanner.title}</h3>
                            </div>
                        )}
                    </ContentWrapper>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            {banners.length > 1 && (
                <>
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="pointer-events-auto h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                            onClick={() => paginate(-1)}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="pointer-events-auto h-8 w-8 rounded-full bg-background/80 hover:bg-background"
                            onClick={() => paginate(1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                        {banners.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > currentIndex ? 1 : -1);
                                    setCurrentIndex(i);
                                }}
                                className={`h-2 w-2 rounded-full transition-all ${i === currentIndex ? "w-4 bg-white" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with INWA. We're here to answer your questions about our premium halwa.",
};

export default function ContactPage() {
    return <ContactClient />;
}

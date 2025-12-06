"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMessages } from "@/lib/actions/messages";

type Message = {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: string;
    createdAt: Date;
};

export default function MessagesAdminPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadMessages() {
            const res = await getMessages();
            if (res.success && res.data) {
                setMessages(res.data as Message[]);
            }
            setIsLoading(false);
        }
        loadMessages();
    }, []);

    if (isLoading) {
        return <div className="text-center py-8">Loading messages...</div>;
    }

    if (messages.length === 0) {
        return <div className="text-center py-8 text-muted-foreground">No messages found.</div>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
                <p className="text-muted-foreground">View and respond to customer inquiries.</p>
            </div>

            <div className="grid gap-4">
                {messages.map((msg) => (
                    <Card key={msg.id}>
                        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                            <div className="space-y-1">
                                <CardTitle>{msg.subject || "No Subject"}</CardTitle>
                                <CardDescription>
                                    From: <span className="font-medium text-foreground">{msg.name}</span> ({msg.email})
                                </CardDescription>
                            </div>
                            <div className="flex items-center justify-center rounded-md bg-secondary text-secondary-foreground px-2.5 py-0.5 text-xs font-semibold">
                                {msg.status}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 whitespace-pre-wrap">
                                {msg.message}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Mark as Read</Button>
                                    <Button size="sm" asChild>
                                        <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}>Reply</a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

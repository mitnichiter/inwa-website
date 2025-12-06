"use client";

import { useState, useEffect } from "react";
import { Calendar, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getMessages, deleteMessage, markAsRead } from "@/lib/actions/messages";
import { toast } from "sonner";

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

    async function loadMessages() {
        const res = await getMessages();
        if (res.success && res.data) {
            setMessages(res.data as Message[]);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadMessages();
    }, []);

    async function handleDelete(id: number) {
        const res = await deleteMessage(id);
        if (res.success) {
            toast.success("Message deleted");
            loadMessages();
        } else {
            toast.error("Failed to delete message");
        }
    }

    async function handleMarkAsRead(id: number) {
        const res = await markAsRead(id);
        if (res.success) {
            toast.success("Message marked as read");
            loadMessages();
        } else {
            toast.error("Failed to update status");
        }
    }

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
                    <Card key={msg.id} className={msg.status === 'New' ? 'border-primary/50 bg-primary/5' : ''}>
                        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    {msg.status === 'New' && <span className="h-2 w-2 rounded-full bg-primary" />}
                                    {msg.subject || "No Subject"}
                                </CardTitle>
                                <CardDescription>
                                    From: <span className="font-medium text-foreground">{msg.name}</span> ({msg.email})
                                </CardDescription>
                            </div>
                            <div className={`flex items-center justify-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${msg.status === 'New' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
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
                                    {msg.status === 'New' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleMarkAsRead(msg.id)}
                                        >
                                            Mark as Read
                                        </Button>
                                    )}
                                    <Button size="sm" asChild>
                                        <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}>Reply</a>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Message?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently remove this message. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

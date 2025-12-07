"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, ExternalLink, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch"; // Removed as not available
import { toast } from "sonner";
import { createBanner, updateBanner, deleteBanner, reorderBanners } from "@/lib/actions/banners";

type Banner = {
    id: number;
    title: string | null;
    imageUrl: string;
    link: string | null;
    order: number;
    isActive: boolean;
};

export default function BannerManager({ initialBanners }: { initialBanners: Banner[] }) {
    const [banners, setBanners] = useState<Banner[]>(initialBanners);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        imageUrl: "", // Default to placeholder if empty? No, keep empty.
        link: "",
        isActive: true,
    });

    const handleOpenDialog = (banner?: Banner) => {
        if (banner) {
            setEditingBanner(banner);
            setFormData({
                title: banner.title || "",
                imageUrl: banner.imageUrl,
                link: banner.link || "",
                isActive: banner.isActive,
            });
        } else {
            setEditingBanner(null);
            setFormData({
                title: "",
                imageUrl: "https://placehold.co/600x400", // Default placeholder
                link: "",
                isActive: true,
            });
        }
        setIsDialogOpen(true);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            if (editingBanner) {
                const res = await updateBanner(editingBanner.id, formData);
                if (res.success && res.data) {
                    setBanners(banners.map(b => b.id === editingBanner.id ? res.data! : b));
                    toast.success("Banner updated successfully");
                } else throw new Error(res.error);
            } else {
                const res = await createBanner(formData);
                if (res.success && res.data) {
                    setBanners([...banners, res.data!]);
                    toast.success("Banner created successfully");
                } else throw new Error(res.error);
            }
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this banner?")) return;
        try {
            const res = await deleteBanner(id);
            if (res.success) {
                setBanners(banners.filter(b => b.id !== id));
                toast.success("Banner deleted");
            } else throw new Error(res.error);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete banner");
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === banners.length - 1) return;

        const newBanners = [...banners];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap
        [newBanners[index], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[index]];

        // Update local state immediately for responsiveness
        setBanners(newBanners);

        try {
            // Send reorder request with new indices as order
            const reorderData = newBanners.map((b, i) => ({ id: b.id, order: i }));
            await reorderBanners(reorderData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to reorder");
            // Revert on failure technically needed, but omitting for brevity in MVP
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Banner Management</h2>
                <Button onClick={() => handleOpenDialog()}>
                    <Plus className="mr-2 h-4 w-4" /> Add Banner
                </Button>
            </div>

            <div className="grid gap-4">
                {banners.sort((a, b) => a.order - b.order).map((banner, index) => (
                    <div key={banner.id} className="flex items-center gap-4 rounded-lg border p-4 bg-card">
                        <div className="relative h-24 w-36 overflow-hidden rounded-md bg-muted">
                            <Image
                                src={banner.imageUrl || "/placeholder.svg"}
                                alt={banner.title || "Banner"}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold truncate">{banner.title || "Untitled Banner"}</h3>
                                {!banner.isActive && (
                                    <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">Inactive</span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{banner.link}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex flex-col gap-1 mr-2">
                                <Button
                                    variant="ghost" size="icon" className="h-6 w-6"
                                    disabled={index === 0}
                                    onClick={() => handleMove(index, 'up')}
                                >
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost" size="icon" className="h-6 w-6"
                                    disabled={index === banners.length - 1}
                                    onClick={() => handleMove(index, 'down')}
                                >
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(banner)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(banner.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {banners.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
                        No banners found. Add one to get started.
                    </div>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingBanner ? "Edit Banner" : "Add New Banner"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title (Optional)</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="image"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    placeholder="https://..."
                                    className="flex-1"
                                />
                                <div className="relative">
                                    <Input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const uploadData = new FormData();
                                            uploadData.append("file", file);

                                            const toastId = toast.loading("Uploading...");
                                            try {
                                                const res = await fetch("/api/upload", {
                                                    method: "POST",
                                                    body: uploadData,
                                                });
                                                const data = await res.json();
                                                if (data.success) {
                                                    setFormData(prev => ({ ...prev, imageUrl: data.url }));
                                                    toast.success("Image uploaded", { id: toastId });
                                                } else {
                                                    throw new Error(data.message);
                                                }
                                            } catch (error) {
                                                console.error(error);
                                                toast.error("Upload failed", { id: toastId });
                                            }
                                        }}
                                        accept="image/*"
                                    />
                                    <Button variant="outline" size="icon" type="button" onClick={() => document.getElementById("file-upload")?.click()}>
                                        <Upload className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">Or upload from computer</p>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="link">Link URL (Optional)</Label>
                            <Input
                                id="link"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="/products/..."
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.isActive}
                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="active">Active</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

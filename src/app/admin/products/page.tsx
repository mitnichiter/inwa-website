"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { getProducts, createProduct, deleteProduct, updateProduct } from "@/lib/actions/products";
import { toast } from "sonner";

// Define Product type based on Prisma model
type Product = {
    id: number;
    name: string;
    price: string;
    stock: number;
    status: string;
    imageUrl: string;
    description: string;
};

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Fetch products on load
    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setIsLoading(true);
        const res = await getProducts();
        if (res.success && res.data) {
            setProducts(res.data as Product[]);
        }
        setIsLoading(false);
    }

    function handleOpenDialog(product?: Product) {
        if (product) {
            setEditingProduct(product);
            setImageUrl(product.imageUrl);
        } else {
            setEditingProduct(null);
            setImageUrl("");
        }
        setIsDialogOpen(true);
    }

    async function handleSubmit(formData: FormData) {
        if (!imageUrl) {
            toast.error("Please upload an image");
            return;
        }
        formData.append("imageUrl", imageUrl);

        let res;
        if (editingProduct) {
            res = await updateProduct(editingProduct.id, formData);
        } else {
            res = await createProduct(formData);
        }

        if (res.success) {
            setIsDialogOpen(false);
            setEditingProduct(null);
            setImageUrl("");
            loadProducts(); // Reload list
            toast.success(editingProduct ? "Product updated" : "Product created");
        } else {
            toast.error(res.error || (editingProduct ? "Failed to update product" : "Failed to create product"));
        }
    }

    async function handleDelete(id: number) {
        // Confirmation is now handled by AlertDialog
        const res = await deleteProduct(id);
        if (res.success) {
            loadProducts();
            toast.success("Product deleted");
        } else {
            toast.error("Failed to delete product");
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your product catalog.</p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                            <DialogDescription>
                                {editingProduct ? "Update product details." : "Create a new product for your store."} Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">Image</Label>
                                <div className="col-span-3">
                                    <ImageUpload
                                        value={imageUrl}
                                        onChange={setImageUrl}
                                        onRemove={() => setImageUrl("")}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={editingProduct?.name}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">Price</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    defaultValue={editingProduct?.price}
                                    className="col-span-3"
                                    placeholder="$0.00"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="stock" className="text-right">Stock</Label>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    defaultValue={editingProduct?.stock}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Desc</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={editingProduct?.description}
                                    className="col-span-3"
                                    required
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Product</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">No products found.</TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <div className="h-10 w-10 overflow-hidden rounded-md">
                                            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium whitespace-nowrap">{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleOpenDialog(product)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete the product
                                                            "{product.name}" from your database.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(product.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

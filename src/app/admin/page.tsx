import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MessageSquare, TrendingUp, Users } from "lucide-react";
import { getDashboardStats } from "@/lib/actions/stats";

export default async function AdminDashboard() {
    const { data: stats } = await getDashboardStats();

    const statCards = [
        {
            title: "Total Products",
            value: (stats?.products ?? 0).toString(),
            description: "Active products in catalog",
            icon: Package,
        },
        {
            title: "New Messages",
            value: (stats?.messages ?? 0).toString(),
            description: "Total inquiries received",
            icon: MessageSquare,
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your store's performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

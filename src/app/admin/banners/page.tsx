import { getAllBanners } from "@/lib/actions/banners";
import BannerManager from "@/components/admin/BannerManager";

export const dynamic = "force-dynamic";

export default async function BannersPage() {
    const { data: banners } = await getAllBanners();

    return (
        <div className="w-full max-w-5xl mx-auto">
            <BannerManager initialBanners={banners || []} />
        </div>
    );
}

import { fetchAllCommodities } from "@/app/lib/data";
import CommoditiesGrid from "@/app/ui/commodities/commodities-grid";

export default async function Page() {
    return (
        <main>
            <h2>Commodities</h2>
            <p>Commodities are materials/minerals that are collected by resource projects. They can be assigned to the projects as the primary or secondary commodity.</p><br />

            <CommoditiesGrid />
            <br /> <br />
        </main>
    );
}
"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LineGraph from "@/components/ui/line-graph"

export default function ItemPriceHistory({ itemPriceHistory }: { itemPriceHistory: number[] }) {
    return (
        <Card className="relative py-6 h-[450px] w-full col-span-1 md:col-span-3">
            <CardHeader className="pb-0">
                <CardTitle>Price History</CardTitle>
                <CardDescription>
                    This graph shows the price history of the item. You can see the price changes over time.
                </CardDescription>
                {itemPriceHistory.length === 0 && (
                    <div className="text-amber-400/80 text-xs mt-4">
                        These are demo prices as the item does not have any price history.
                    </div>
                )}
            </CardHeader>
            <LineGraph
                curve="monotoneX"
                height="290px"
                enableSlices="x"
                data={[
                    {
                        id: "Price",
                        data: itemPriceHistory.map((price, index) => ({ x: index, y: price })),
                    },
                ]}
                enableArea
            />
        </Card>
    )
}

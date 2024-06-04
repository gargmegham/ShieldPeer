import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AddPriceRangeDialog } from "./AddPriceRangeDialog";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const priceRanges = [
  {
    source_price_min: 0,
    source_price_max: 100,
    listing_price_min: 0,
    listing_price_max: 100,
    listing_price_if_no_one_to_undercut: 0,
    when_no_one_to_undercut_list_at: "listing_price_max",
    always_undercut_by_percentage_if_listing_price_is_greater_than: 0,
  },
  {
    source_price_min: 101,
    source_price_max: 200,
    listing_price_min: 101,
    listing_price_max: 200,
    listing_price_if_no_one_to_undercut: 101,
    when_no_one_to_undercut_list_at: "listing_price_max",
    always_undercut_by_percentage_if_listing_price_is_greater_than: 0,
  },
  {
    source_price_min: 201,
    source_price_max: 300,
    listing_price_min: 201,
    listing_price_max: 300,
    listing_price_if_no_one_to_undercut: 201,
    when_no_one_to_undercut_list_at: "listing_price_if_no_one_to_undercut",
    always_undercut_by_percentage_if_listing_price_is_greater_than: 0,
  },
];

export default function PriceRanges() {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Price Ranges</CardTitle>
      </CardHeader>
      <AddPriceRangeDialog
        trigger={
          <Button size={"xs"} className="absolute top-4 right-4">
            <AiOutlinePlusCircle className="size-4" />
          </Button>
        }
      />
      <CardContent>
        <Table>
          <TableCaption>
            You can set parameters for different price ranges separately.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Source Price Min.</TableHead>
              <TableHead>Source Price Max.</TableHead>
              <TableHead>Listing Price Min.</TableHead>
              <TableHead>Listing Price Max.</TableHead>
              <TableHead>Listing Price If No One To Undercut</TableHead>
              <TableHead className="w-">
                When No One To Undercut List At
              </TableHead>
              <TableHead>Undercut By Percentage Threshold</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceRanges.map((priceRange, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {priceRange.source_price_min}
                </TableCell>
                <TableCell className="font-medium">
                  {priceRange.source_price_max}
                </TableCell>
                <TableCell className="font-medium">
                  {priceRange.listing_price_min}%
                </TableCell>
                <TableCell className="font-medium">
                  {priceRange.listing_price_max}%
                </TableCell>
                <TableCell className="font-medium">
                  {priceRange.listing_price_if_no_one_to_undercut}%
                </TableCell>
                <TableCell className="font-medium">
                  {priceRange.when_no_one_to_undercut_list_at
                    .split("_")
                    .join(" ")}
                </TableCell>
                <TableCell className="font-medium">
                  {
                    priceRange.always_undercut_by_percentage_if_listing_price_is_greater_than
                  }
                  %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PriceRange } from "@/types/database";
import { Button } from "@/components/ui/button";
import { AddPriceRangeDialog } from "./AddPriceRangeDialog";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * @description PriceRanges are used for granular control over the listing parameters.
 */
export default function PriceRanges() {
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  useEffect(() => {
    fetch("/api/price-ranges")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        setPriceRanges(data);
      });
  }, []);
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
            {priceRanges.map((priceRange) => (
              <TableRow key={priceRange.id}>
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
            {priceRanges.length === 0 && (
              <>
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    -
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No price ranges found.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    -
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

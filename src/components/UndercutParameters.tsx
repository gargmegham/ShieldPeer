"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiOutlineEdit } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sources } from "@/constants/sources";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  price_empire_source: z.enum(sources as any),
  undercut_by_price: z.number(),
  undercut_by_percentage: z.number(),
  undercut_by: z.enum(["price", "percentage"]),
});

export default function UndercutParameters() {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    disabled: !isEditing,
    defaultValues: {
      price_empire_source: "buff",
      undercut_by_price: 0.01,
      undercut_by_percentage: 1,
      undercut_by: "price",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsEditing(false);
  }
  return (
    <Card className="w-full relative">
      <CardHeader>
        <CardTitle>Undercut Parameters</CardTitle>
        <CardDescription>
          Set your PriceEmpire source and parameters for undercutting here.
        </CardDescription>
      </CardHeader>
      <Button
        disabled={isEditing}
        size={"icon"}
        className="absolute top-4 right-4"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        <AiOutlineEdit className="size-7" />
      </Button>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="price_empire_source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PriceEmpire Source</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {sources.map((source) => (
                              <SelectItem key={source} value={source}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="undercut_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Undercut By</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="price">Price</SelectItem>
                            <SelectItem value="percentage">
                              Percentage
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="undercut_by_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Undercut By Price</FormLabel>
                  <FormDescription>
                    This price will be used to undercut other sellers if
                    undercut by price is selected above.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="undercut_by_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Undercut By Percentage</FormLabel>
                  <FormDescription>
                    This percentage will be used to undercut other sellers if
                    undercut by percentage is selected above.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!isEditing}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
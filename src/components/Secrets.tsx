"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  price_empire_key: z.string().min(5),
  waxpeer_key: z.string().min(5),
});

export default function Secrets() {
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    disabled: !isEditing,
    defaultValues: {
      price_empire_key: "",
      waxpeer_key: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsEditing(false);
  }
  return (
    <Card className="max-w-xl relative">
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>Manage your API keys and secrets.</CardDescription>
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
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="price_empire_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PriceEmpire</FormLabel>
                  <FormControl>
                    <Input placeholder="8dqw30*****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waxpeer_key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waxpeer</FormLabel>
                  <FormControl>
                    <Input placeholder="31hkw30*****" {...field} />
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
      <CardFooter></CardFooter>
    </Card>
  );
}

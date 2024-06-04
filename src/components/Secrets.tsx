"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
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
import toast from "react-hot-toast";
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
import type { Setting } from "@/types/database";

const FormSchema = z.object({
  price_empire_key: z.string().min(5),
  waxpeer_key: z.string().min(5),
});

export default function Secrets({ setting }: { setting: Setting }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    disabled: !isEditing,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSaving(true);
    fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        setIsEditing(false);
        toast.success("API keys updated successfully.");
      })
      .catch(() => {
        toast.error("Failed to update API keys.");
      })
      .finally(() => {
        setSaving(false);
      });
  }

  useEffect(() => {
    form.reset(setting);
  }, [setting]);

  return (
    <Card className="w-full relative">
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
            className="w-full space-y-6"
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
            <Button type="submit" disabled={!isEditing || saving}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

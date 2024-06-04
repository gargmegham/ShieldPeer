"use client";

import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { z } from "zod";

const FormSchema = z.object({
  source_price_min: z.number(),
  source_price_max: z.number(),
  price_range_min: z.number(),
  price_range_max: z.number(),
});

export function AddPriceRangeDialog({ trigger }: { trigger: ReactNode }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {}
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Price Range</DialogTitle>
          <DialogDescription>
            Specify the parameters for a new price range.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="source_price_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Price Min</FormLabel>
                  <FormDescription>
                    The source price of item must be greater than this value.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source_price_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Price Max</FormLabel>
                  <FormDescription>
                    The source price of item must be less than this value.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

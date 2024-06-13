"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export function DeletionConfirmationDialog({
    title,
    open,
    setOpen,
    description,
    confirm,
    buttonText,
}: {
    confirm: () => void
    title: string
    description: string
    buttonText: string
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" onClick={confirm}>
                            {buttonText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

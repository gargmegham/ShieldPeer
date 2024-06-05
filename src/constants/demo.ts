import type { Log } from "@/types/database"

const logs: Log[] = [
    {
        id: "m5gr84i9",
        item_id: "i5gr84i9",
        user_id: "u5gr84i9",
        created_at: "2021-08-10T10:10:10",
        type: "success",
        message: "Item price fetched successfully",
    },
    {
        id: "m5gr84i8",
        item_id: "i5gr84i8",
        user_id: "u5gr84i8",
        created_at: "2021-12-10T10:10:10",
        type: "failure",
        message: "Could not fetch item price",
        meta_data: {
            error: "Item not found",
        },
    },
    {
        id: "m5gr84i7",
        item_id: "i5gr84i7",
        user_id: "u5gr84i7",
        created_at: "2021-10-10T10:10:10",
        type: "success",
        message: "Listed item for sale",
        meta_data: {
            listing_id: "l5gr84i7",
        },
    },
    {
        id: "m5gr84i6",
        item_id: "i5gr84i6",
        user_id: "u5gr84i6",
        created_at: "2021-10-10T10:10:10",
        type: "failure",
        message: "Failed to list item for sale",
        meta_data: {
            error: "Insufficient funds",
        },
    },
    {
        id: "m5gr84i5",
        item_id: "i5gr84i5",
        user_id: "u5gr84i5",
        created_at: "2021-06-10T10:10:10",
        type: "caution",
        message: "Item can not be listed due to specified parameters",
    },
    {
        id: "m5gr84i4",
        item_id: "i5gr84i4",
        user_id: "u5gr84i4",
        created_at: "2021-10-10T10:10:10",
        type: "success",
        message: "Item price fetched successfully",
    },
    {
        id: "m5gr84i3",
        item_id: "i5gr84i3",
        user_id: "u5gr84i3",
        created_at: "2021-10-10T10:10:10",
        type: "success",
        message: "Item price fetched successfully",
    },
    {
        id: "m5gr84i2",
        item_id: "i5gr84i2",
        user_id: "u5gr84i2",
        created_at: "2021-10-10T10:10:10",
        type: "success",
        message: "Item price fetched successfully",
    },
    {
        id: "m5gr84i1",
        item_id: "i5gr84i1",
        user_id: "u5gr84i1",
        created_at: "2021-10-10T10:10:10",
        type: "success",
        message: "Item price fetched successfully",
    },
    {
        id: "m5gr84i0",
        item_id: "i5gr84i0",
        user_id: "u5gr84i0",
        created_at: "2021-10-10T10:10:10",
        type: "success",
        message: "Item price fetched successfully",
    },
]

export { logs }

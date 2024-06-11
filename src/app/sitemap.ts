import { MetadataRoute } from "next"

import config from "@/utils/config"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            // this is for landing page
            url: `${config.domainName}/home`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        {
            // this is for demo page
            url: `${config.domainName}/demo`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
    ]
}

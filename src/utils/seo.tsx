import type { Metadata } from "next"

import config from "@/utils/config"

export const getSEOTags = ({
    title,
    description,
    keywords,
    openGraph,
    canonicalUrlRelative,
    extraTags,
}: Metadata & {
    canonicalUrlRelative?: string
    extraTags?: Record<string, any>
} = {}) => {
    return {
        title: title || config.appName,
        description: description || config.appDescription,
        keywords: keywords || [config.keywords],
        applicationName: config.appName,
        metadataBase: new URL(
            process.env.NODE_ENV === "development" ? "http://localhost:3000/" : `https://${config.domainName}/`
        ),
        openGraph: {
            title: openGraph?.title || config.appName,
            description: openGraph?.description || config.appDescription,
            url: openGraph?.url || `https://${config.domainName}/`,
            siteName: openGraph?.title || config.appName,
            locale: "en_US",
            type: "website",
        },
        twitter: {
            title: openGraph?.title || config.appName,
            description: openGraph?.description || config.appDescription,
            card: "summary_large_image",
            creator: "@garg_megham",
        },
        ...(canonicalUrlRelative && {
            alternates: { canonical: canonicalUrlRelative },
        }),
        ...extraTags,
    }
}

// https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
// https://developers.google.com/search/docs/appearance/structured-data/search-gallery
// https://search.google.com/test/rich-results
export const renderSchemaTags = () => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "http://schema.org",
                    "@type": "SoftwareApplication",
                    name: config.appName,
                    description: config.appDescription,
                    image: `https://${config.domainName}/icon.png`,
                    url: `https://${config.domainName}/`,
                    author: {
                        "@type": "Person",
                        name: "Megham Garg",
                    },
                    datePublished: "2024-05-03",
                    applicationCategory: "BusinessApplication",
                    aggregateRating: {
                        "@type": "AggregateRating",
                        ratingValue: "4.9",
                        ratingCount: "12",
                    },
                    offers: [
                        {
                            "@type": "Offer",
                            price: "0",
                            priceCurrency: "USD",
                        },
                    ],
                }),
            }}
        ></script>
    )
}

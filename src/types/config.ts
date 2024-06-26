export interface ConfigProps {
    appName: string
    appDescription: string
    domainName: string
    crisp: {
        id?: string
        onlyShowOnRoutes?: string[]
    }
    socials: {
        twitter?: string
        linkedin?: string
        facebook?: string
        instagram?: string
        youtube?: string
        github?: string
        telegram?: string
    }
    supportEmail?: string
    colors: {
        main: string
    }
    keywords: string
    auth: {
        loginUrl: string
        callbackUrl: string
    }
}

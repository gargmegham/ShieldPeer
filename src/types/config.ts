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
    mailgun: {
        subdomain: string
        fromNoReply: string
        fromAdmin: string
        supportEmail?: string
        forwardRepliesTo?: string
    }
    colors: {
        main: string
    }
    keywords: string
    auth: {
        loginUrl: string
        callbackUrl: string
    }
}

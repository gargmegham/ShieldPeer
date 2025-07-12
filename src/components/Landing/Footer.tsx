"use client"

import Image from "next/image"
import Link from "next/link"

import { AiFillInstagram, AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai"
import { FaTelegram } from "react-icons/fa6"

import config from "@/utils/config"

// The support link is connected to the config.js file.
// If there's no config.supportEmail, the link won't be displayed.
const Footer = () => {
    return (
        <footer className="bg-neutral-900">
            <div className="max-w-7xl mx-auto px-8 py-24">
                <div className="flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <Link
                            href="/#"
                            aria-current="page"
                            className="flex gap-2 justify-center md:justify-start items-center"
                        >
                            <Image
                                src="/logo.png"
                                alt={`${config.appName} logo`}
                                priority={true}
                                className="w-6 h-6"
                                width={24}
                                height={24}
                            />
                            <strong className="font-extrabold tracking-tight text-base md:text-lg">
                                {config.appName}
                            </strong>
                        </Link>
                        <p className="mt-3 text-sm text-base-content/80">{config.appDescription}</p>
                        <p className="mt-3 text-sm text-base-content/60">
                            Copyright © {new Date().getFullYear()} - All rights reserved
                        </p>
                        {/* socials */}
                        <div className="mt-2 flex gap-4 justify-center md:justify-start">
                            {config.socials.twitter && (
                                <Link href={config.socials.twitter} target="_blank" className="hover:text-amber-500">
                                    <AiFillTwitterCircle className="size-6" />
                                </Link>
                            )}
                            {config.socials.instagram && (
                                <Link href={config.socials.instagram} target="_blank" className="hover:text-amber-500">
                                    <AiFillInstagram className="size-6" />
                                </Link>
                            )}
                            {config.socials.youtube && (
                                <Link href={config.socials.youtube} target="_blank" className="hover:text-amber-500">
                                    <AiFillYoutube className="size-6" />
                                </Link>
                            )}
                            {config.socials.linkedin && (
                                <Link href={config.socials.linkedin} target="_blank" className="hover:text-amber-500">
                                    <AiFillLinkedin className="size-6" />
                                </Link>
                            )}
                            {config.socials.telegram && (
                                <Link href={config.socials.telegram} target="_blank" className="hover:text-amber-500">
                                    <FaTelegram className="size-6" />
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                                LINKS
                            </div>

                            <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                                {config.supportEmail && (
                                    <Link
                                        href={`mailto:${config.supportEmail}`}
                                        target="_blank"
                                        className="link link-hover"
                                        aria-label="Contact Support"
                                    >
                                        Support
                                    </Link>
                                )}
                                <Link href="/#pricing" className="link link-hover">
                                    Pricing
                                </Link>
                                <Link href="https://servcy.com/" className="link link-hover">
                                    Servcy
                                </Link>
                                <Link href="https://meghamgarg.com/" className="link link-hover">
                                    Founder
                                </Link>
                                <Link href="https://launchbit.in/" className="link link-hover">
                                    Agency
                                </Link>
                                <Link href="https://jotlify.com/" className="link link-hover">
                                    Jotlify
                                </Link>
                            </div>
                        </div>

                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <div className="footer-title font-semibold text-base-content tracking-widest text-sm md:text-left mb-3">
                                LEGAL
                            </div>

                            <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                                <Link href="/tos" className="link link-hover">
                                    Terms of services
                                </Link>
                                <Link href="/privacy-policy" className="link link-hover">
                                    Privacy policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

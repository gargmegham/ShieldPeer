"use client"

import { useRef, useState } from "react"
import type { JSX } from "react"

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
    question: string
    answer: JSX.Element
}

const faqList: FAQItemProps[] = [
    {
        question: "How does the ShieldPeer bot determine the best selling price for my steam assets?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                ShieldPeer uses user-defined settings, the bot identifies the optimal price point for your skins by
                analyzing current market rates and undercutting other sellers in a strategic manner. This ensures you
                get the best price possible, without significantly affecting your profits.
            </div>
        ),
    },
    {
        question: "What makes ShieldPeer a secure platform for steam asset trading?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                At ShieldPeer, we prioritize the security of our users. We leverage the security framework provided by
                Waxpeer and add an extra layer of protection, ensuring the highest levels of safety and integrity during
                all transactions. Moreover, ShieldPeer does not store any user sensitive data like Steam login
                credentials.
            </div>
        ),
    },
    {
        question: "How can ShieldPeer help me maximize my steam asset trading earnings?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                ShieldPeer was designed with the main goal to make your trading more profitable. The bot works
                tirelessly for you, making precise and timely price adjustments based on market fluctuations. This
                superb efficiency not only gives you an edge over manual trading but helps you earn more in a shorter
                time on the Waxpeer marketplace.
            </div>
        ),
    },
]

const FaqItem = ({ item }: { item: FAQItemProps }) => {
    const accordion = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    return (
        <li>
            <button
                className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-neutral-100/50"
                onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(!isOpen)
                }}
                aria-expanded={isOpen}
            >
                <span className={`flex-1 text-neutral-100 ${isOpen ? "text-primary" : ""}`}>{item?.question}</span>
                <svg
                    className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${isOpen && "rotate-180"}`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                            isOpen && "rotate-180 hidden"
                        }`}
                    />
                </svg>
            </button>
            <div
                ref={accordion}
                className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                style={
                    isOpen
                        ? // @ts-ignore
                          { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
                        : { maxHeight: 0, opacity: 0 }
                }
            >
                <div className="pb-5 leading-relaxed">{item?.answer}</div>
            </div>
        </li>
    )
}

const FAQ = () => {
    return (
        <section id="faq" className="bg-black">
            <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col text-left basis-1/2">
                    <p className="inline-block font-semibold font-bricolage text-amber-500 mb-4">FAQ</p>
                    <p className="sm:text-4xl text-3xl font-extrabold font-bricolage">Frequently Asked Questions</p>
                </div>

                <ul className="basis-1/2">
                    {faqList.map((item, i) => (
                        <FaqItem key={i} item={item} />
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default FAQ

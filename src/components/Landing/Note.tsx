"use client"

const Note = () => {
    return (
        <section id="pricing" className="bg-grid-white/[0.1] bg-black">
            <div className="py-24 px-8 max-w-5xl mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <p className="font-medium text-amber-500 mb-8 font-bricolage">Founders Note</p>
                    <h2 className="font-bricolage font-bold text-3xl lg:text-5xl tracking-tight">
                        Hi, I'm Megham Garg
                    </h2>
                    <h3 className="mt-2 text-xs font-extrabold text-servcy-cream md:text-lg flex justify-center items-center">
                        I created ShieldPeer out of guilt, and as a way to give back to the community.
                    </h3>
                    <p className="text-base mt-4 max-w-lg mx-auto text-servcy-cream">
                        This is a software which I was supposed to deliver to a client. But due to miss-communication,
                        the client was not satisfied with the product. And it left a sour taste in my mouth.
                    </p>
                    <p className="text-base mt-4 max-w-lg mx-auto text-servcy-cream">
                        So I decided to make a version which is upto my standards and give it to the community for free.
                    </p>
                    <p className="text-base mt-4 max-w-lg mx-auto text-servcy-cream">
                        However I understand, this may not be for everyone. So if you need a customised version, feel
                        free to reach out to me.
                    </p>
                    <p className="text-base mt-4 max-w-lg mx-auto text-servcy-cream">
                        I've a software development agency called{" "}
                        <a href="https://launchbit.in" className="text-amber-500 underline">
                            LaunchBit
                        </a>{" "}
                        and I'm always looking for new projects to work on.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Note

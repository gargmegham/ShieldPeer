export default function Loader() {
    return (
        <main className="flex justify-center items-center h-screen bg-black bg-grid-small-white/30" id="loader">
            <div className="loader-wrapper">
                <div className="loader-circle"></div>
                <div className="loader-circle"></div>
                <div className="loader-circle"></div>
                <div className="loader-shadow"></div>
                <div className="loader-shadow"></div>
                <div className="loader-shadow"></div>
            </div>
        </main>
    )
}

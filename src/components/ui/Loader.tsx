export default function Loader() {
  return (
    <main className="flex justify-center items-center h-screen" id="loader">
      <div className="loader-wrapper">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-shadow"></div>
        <div className="loader-shadow"></div>
        <div className="loader-shadow"></div>
      </div>
    </main>
  );
}

import Header from "./Header";

function NotFound() {
  return (
    <div className="pt-16 grid justify-center items-center h-screen">
      <Header item={{ item: "404" }} />
      <div>
        <h1 className="mt-7 font-semibold text-3xl flex justify-center items-center">
          404
        </h1>
        <div> page not found</div>
      </div>
    </div>
  );
}

export default NotFound;

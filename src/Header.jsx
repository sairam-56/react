import { Link } from "react-router";

function Header({ item }) {
  return (
    <div className="bg-stone-100 fixed pl-10 top-0 left-0 right-0 z-10 flex justify-items-start items-center h-16 ">
      <nav className="flex space-x-8 justify-center items-center  h-full">
        <Link
          to="/"
          className={`font-medium ${
            item.item === "tailwind"
              ? "font-bold text-black-900"
              : "hover:text-black text-gray-500"
          }`}
        >
          tailwind
        </Link>
        <Link
          to="/ant"
          className={`font-medium ${
            item.item === "ant"
              ? "font-bold text-black-900"
              : "hover:text-black text-gray-500"
          }`}
        >
          ant
        </Link>{" "}
        <Link
          to="/query"
          className={`font-medium ${
            item.item === "query"
              ? "font-bold text-black-900"
              : "hover:text-black text-gray-500"
          }`}
        >
          query
        </Link>
      </nav>
    </div>
  );
}

export default Header;

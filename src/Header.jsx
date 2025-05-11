import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router";

function Header({ item }) {
  const [darkMode, setDarkMode] = useState(false);
  const pages = ["tailwind", "ant", "query"];

  useLayoutEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
      setDarkMode(true);
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  function variableClass(page) {
    return `font-medium ${
      item.item == page
        ? "font-bold text-black-900 dark:text-white"
        : "hover:text-black dark:hover:text-white dark:text-gray-400 text-gray-500"
    }`;
  }

  function DisplayLinks() {
    return (
      <nav className="flex space-x-8 justify-center items-center  h-full">
        {pages.map((page) => {
          return (
            <Link
              to={page === "tailwind" ? "/" : `/${page}`}
              className={variableClass(page)}
            >
              {page}
            </Link>
          );
        })}
      </nav>
    );
  }
  function Mode() {
    return (
      <div>
        <label
          class="inline-flex items-center me-5 cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        >
          <input
            type="checkbox"
            value=""
            class="sr-only peer"
            checked={darkMode}
          />
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600 dark:peer-checked:bg-purple-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {darkMode ? "dark" : "light"} mode
          </span>
        </label>
      </div>
    );
  }
  return (
    <div className="bg-stone-100 dark:bg-black fixed pl-10 top-0 left-0 right-0 z-10 flex justify-between items-center h-16 ">
      <DisplayLinks />
      <Mode />
    </div>
  );
}

export default Header;

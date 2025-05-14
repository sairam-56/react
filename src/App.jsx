import react, { useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import "tailwindcss/tailwind.css";
import "./index.css";
import { Add, Clear, Remove } from "./redux/actions";
import { ADD, REMOVE } from "./redux/type";

function App() {
  const [data, setData] = useState("");
  const list = useSelector((state) => state?.counter?.list);
  const dispatch = useDispatch();

  return (
    <div className="pt-16 grid justify-items-center">
      <Header item={{ item: "tailwind" }} />
      <div className="mt-4 space-y-1">
        <h1 className="text-3xl flex align-middle justify-center w-full  font-bold">
          made using tailwind
        </h1>
        <p className=" flex align-middle justify-center w-full  ">
          using redux store to manage state
        </p>
      </div>
      <div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (data.length > 0) {
                dispatch(Add({ type: ADD, payload: data }));
                setData("");
              }
            }}
            className=" p-4 flex space-x-2 items-center max-w-xl"
          >
            <input
              autoFocus
              placeholder="type something"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
            />
            <button
              type="submit"
              className="bg-stone-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              onClick={() => {
                dispatch(Clear());
                setData("");
              }}
              type="button"
              className=" shrink-0 bg-stone-500 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              clear all
            </button>
          </form>
          <div className=" p-4 space-y-4">
            {Object.keys(list).length > 0 &&
              Object.keys(list).map((key, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center h-full "
                >
                  <div
                    key={index}
                    className="bg-gray-100 px-2  mr-4 flex items-end  justify-between w-full rounded "
                  >
                    <p className="pl-2 py-2 my-0 flex items-center">{key} </p>
                    {list[key] > 1 ? (
                      <button className="text-gray-400 my-0 py-2 pr-2 border-gray-600 border-solid  mx-2 rounded-full">
                        count {list[key]}
                      </button>
                    ) : null}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(Remove(key));
                      setData("");
                    }}
                    type="button"
                    className=" bg-black hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

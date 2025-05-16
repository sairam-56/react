import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import Header from "./Header";

function Query() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header item={{ item: "query" }} />
      <QueryFunction />
    </QueryClientProvider>
  );
}

export default Query;

async function getData(param) {
  const res = await fetch(`https://www.reddit.com/r/${param}.json`);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  return res.json();
}

function QueryFunction() {
  const [param, setParam] = React.useState("reactjs");
  const [inputValue, setInputValue] = React.useState("");
  const [cashedList, setCashedList] = React.useState([]);

  const { data, error, isPending, isSuccess, isFetching } = useQuery({
    queryKey: ["fetch", param],
    queryFn: () => getData(param),
  });
  React.useEffect(() => {
    if (isSuccess && data) {
      if (!cashedList.includes(param)) {
        setCashedList([...cashedList, param]);
      }
    }
  }, [isSuccess, data]);

  if (isPending)
    return (
      <p className=" flex h-screen justify-center items-center text-3xl">
        Loading...
      </p>
    );

  if (error)
    return (
      <div className=" flex flex-col h-screen justify-center items-center space-y-4">
        <p className=" text-3xl">An error has occurred: {error.message}</p>
        <button
          className="bg-black text-white border rounded px-5 py-3"
          onClick={() => setParam("reactjs")}
        >
          Go Back
        </button>
      </div>
    );
  else {
    return (
      <div>
        <div className="  mt-20">
          <h1 className="text-3xl flex align-middle justify-center w-full   mt-20">
            React Query
          </h1>
          <div className="p-4 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setParam(inputValue);

                setInputValue("");
              }}
              className="space-x-3 mx-2"
            >
              <lable>enter data to search</lable>

              <input
                autoFocus
                className="py-2 border rounded-lg px-3"
                placeholder="type something"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="bg-black text-white px-5 py-2  rounded"
              >
                submit
              </button>
            </form>
            {cashedList.length > 1 ? (
              <div>
                <div className="mx-2 flex flex-row space-x-1">
                  <h2>chashed data</h2>
                  <h2 className="text-stone-400">
                    --- click the items below to get cashed data
                  </h2>
                </div>
                <div className="flex flex-row space-x-5 items-center">
                  <div className="space-x-3">
                    {" "}
                    {cashedList.map((item, i) => (
                      <button
                        key={i}
                        className="  px-2 py-2 font-bold "
                        onClick={() => setParam(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div>
                    {isFetching ? <p> Background Fetching....</p> : null}
                  </div>
                </div>
              </div>
            ) : null}
            {data?.data?.children.map((item, i) => (
              <h1
                key={i}
                className=" flex align-middle justify-center w-full  "
              >
                {item.data.selftext}
              </h1>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

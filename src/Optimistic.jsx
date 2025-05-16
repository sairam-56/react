import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";

function Optimistic() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Header item={{ item: "optimistic" }} />
      <Child />
    </QueryClientProvider>
  );
}
export default Optimistic;

function Child() {
  const [Data, setData] = useState({
    title: "optimistic",
    body: "data added by me",
    userId: 1,
  });

  async function getData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return error.message;
    }
  }

  let { data, error, isPending, isError, isFetching } = useQuery({
    queryKey: ["fetch"],
    queryFn: getData,
  });

  function post() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((json) => console.log(json));
  }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: post,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["fetch"] });
      const prevData = queryClient.getQueryData(["fetch"]);
      queryClient.setQueryData(["fetch"], (oldData) => [Data, ...oldData]);
      return { prevData };
    },
    onError: (context) => {
      queryClient.setQueryData(["fetch"], context.prevData);
    },

    onSettled: () => {
      queryClient.setQueryData(["fetch"], (oldData) => [...oldData]);
    },
  });
  if (isPending)
    return (
      <p className=" flex h-screen justify-center items-center text-3xl">
        Loading...
      </p>
    );

  if (isError)
    return (
      <div className=" flex flex-col h-screen justify-center items-center space-y-4">
        <p className=" text-3xl">An error has occurred: {error.message}</p>
      </div>
    );
  return (
    <div className="flex flex-col space-y-4 mt-24 mx-5  items-center">
      <h1 className="font-bold">Optimistic</h1>
      <div className="flex flex-col w-64 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <p> title: </p>
          <input
            className="py-2 border rounded-lg px-3"
            onChange={(e) => {
              let d = { ...Data };
              d.title = e.target.value;
              setData(d);
            }}
            placeholder={Data.title}
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <p> body: </p>
          <input
            className="py-2 border rounded-lg px-3"
            onChange={(e) => {
              let d = { ...Data };
              d.body = e.target.value;
              setData(d);
            }}
            placeholder={Data.body}
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <p> id: </p>
          <input
            className="py-2 border rounded-lg px-3"
            onChange={(e) => {
              let d = { ...Data };
              d.id = e.target.value;
              setData(d);
            }}
            placeholder={Data.userId}
          />
        </div>
      </div>
      <button
        className="bg-black text-white border rounded px-5 py-3"
        onClick={mutation.mutate}
      >
        add it
      </button>
      <div>
        {console.log(mutation.isPending)}
        <ul>
          {data.map((item, i) => (
            <li
              key={item.id}
              className={
                i === 0 && mutation.isPending ? "text-stone-400" : "text-black"
              }
            >
              <strong>{item.title}</strong>: {item.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

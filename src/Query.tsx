import * as React from "react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import Header from "./Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

type Post = {
  id: number;
  title: string;
  body: string;
};

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
  });
}

function Posts({
  setPostId,
}: {
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div className="">
      <h1 className="my-5 font-bold text-2xl">click the links below</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    className=" hover:underline"
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return await response.json();
};

function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}

function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div className="my-5">
        <a
          onClick={() => setPostId(-1)}
          className="bg-amber-200 hover:bg-amber-400 px-5 py-2 my-10 rounded-md"
          href="#"
        >
          Back
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default function Query() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Header item={{ item: "query" }} />

      <div className="m-8 mt-10 ">
        <div className="flex flex-col items-center justify-center mt-20 h-auto">
          <p className="font-bold my-0   text-xl text-black ">
            Made using React-query
          </p>

          <p className="mt-1.5 text-xl text-black ">
            cashing and background updates
          </p>
        </div>

        <p className="text-center mt-5 ">
          You may need to throttle your network speed to simulate longer loading
          sequences
        </p>

        {postId > -1 ? (
          <Post postId={postId} setPostId={setPostId} />
        ) : (
          <Posts setPostId={setPostId} />
        )}
      </div>
    </PersistQueryClientProvider>
  );
}

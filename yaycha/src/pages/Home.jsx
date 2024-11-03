import { useEffect, useState } from "react";

import { Box, Alert, Button, Typography } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { queryClient, useApp } from "../ThemedApp";
import { useMutation, useQuery } from "react-query";
import { fetchFollowingPosts, fetchPosts, postPost } from "../libs/fetcher";
const api = import.meta.env.VITE_API;

export default function Home() {
  //Chapter12 - React Query
  //   const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(false);

  //   useEffect(() => {
  //     fetch(`${api}/content/posts`)
  //       .then(async (res) => {
  //         if (res.ok) {
  //           setData(await res.json());
  //           setLoading(false);
  //         } else {
  //           setError(true);
  //         }
  //       })
  //       .catch(() => {
  //         setError(true);
  //       });
  //   }, []);

  const [showLatest, setShowLatest] = useState(true);

  const { isLoading, isError, error, data } = useQuery(
    ["posts", showLatest],
    () => {
      if (showLatest) return fetchPosts();
      else return fetchFollowingPosts();
    }
  );

  const remove = useMutation(async (id) => deletePost(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData(["posts", showLatest], (old) =>
        old.filter((item) => item.id !== id)
      );
      setGlobalMsg("A post deleted");
    },
  });

  const add = useMutation((content) => postPost(content), {
    onSuccess: async (post) => {
      await queryClient.cancelQueries("posts");
      await queryClient.setQueryData(["posts", showLatest], (old) => [
        post,
        ...old,
      ]);
      setGlobalMsg("A post added");
    },
  });

  const { showForm, setGlobalMsg, auth } = useApp();

  //   const [data, setData] = useState([
  //     { id: 3, content: "Yay, interesting.", name: "Chris" },
  //     { id: 2, content: "React is fun.", name: "Bob" },
  //     { id: 1, content: "Hello, World!", name: "Alice" },
  //   ]);

  //   const remove = (id) => {
  //     setData(data.filter((item) => item.id !== id));
  //     setGlobalMsg("An item deleted");
  //   };

  // const add = (content, name) => {
  //   const id = data[0].id + 1;
  //   setData([{ id, content, name }, ...data]);
  //   setGlobalMsg("An item added");
  // };

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  return (
    <Box>
      {showForm && auth && <Form add={add} />}
      {auth && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Button disabled={showLatest} onClick={() => setShowLatest(true)}>
            Latest
          </Button>
          <Typography sx={{ color: "text.fade", fontSize: 15 }}>|</Typography>
          <Button disabled={!showLatest} onClick={() => setShowLatest(false)}>
            Following
          </Button>
        </Box>
      )}
      {data.map((item) => {
        return <Item key={item.id} item={item} remove={remove.mutate} />;
      })}
    </Box>
  );
}

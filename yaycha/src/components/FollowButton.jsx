import PropTypes from "prop-types";

import { queryClient, useApp } from "../ThemedApp";
import { useMutation } from "react-query";
import { deleteFollow, postFollow } from "../libs/fetcher";
import { Button } from "@mui/material";
export default function FollowButton({ user }) {
  const { auth } = useApp();
  if (!auth) return <></>;

  function isFollowing() {
    return user.following.find((item) => item.followerId == auth.id);
  }

  const follow = useMutation(
    (id) => {
      return postFollow(id);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("users");
        await queryClient.refetchQueries("user");
        await queryClient.refetchQueries("search");
      },
    }
  );

  const unfollow = useMutation(
    (id) => {
      return deleteFollow(id);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries("users");
        await queryClient.refetchQueries("user");
        await queryClient.refetchQueries("search");
      },
    }
  );

  return auth.id === user.id ? (
    <></>
  ) : (
    <Button
      size="small"
      edge="edge"
      variant={isFollowing() ? "outlined" : "contained"}
      sx={{ borderRadius: 5 }}
      onClick={(e) => {
        if (isFollowing()) {
          unfollow.mutate(user.id);
        } else {
          follow.mutate(user.id);
        }
        e.stopPropagation();
      }}
    >
      {isFollowing() ? "Following" : "Follow"}
    </Button>
  );
}
FollowButton.propTypes = { user: PropTypes };

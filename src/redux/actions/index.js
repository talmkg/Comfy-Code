export const FETCH_GROUPS = "FETCH_GROUPS";
export const FETCH_HASHTAGS = "FETCH_HASHTAGS";
export const TOKEN = "TOKEN";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const JOIN_TEAM = "JOIN_TEAM";
export const LOADING = "LOADING";
export const LOGIN = "LOGIN";
export const SAVE_USERS_POSTS = "SAVE_USERS_POSTS";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";

//get all groups
export const getGroups = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      const response = await fetch("http://localhost:3002/groups");
      if (response.ok) {
        let groups = await response.json();
        console.log("groups updated.");
        dispatch({
          type: FETCH_GROUPS,
          payload: groups,
        });
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getToken = (email, password, setErrorMessage) => {
  console.log("Fetching");
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const data = {
      email: email,
      password: password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      fetch("http://localhost:3002/auth/login", options)
        .then((response) => response.json())
        .then((token) => {
          if (token.token !== undefined) {
            if (token.token.length > 0) {
              dispatch({
                type: TOKEN,
                payload: token.token,
              });
              dispatch(fetchLoginnedUser());
            } else {
              setErrorMessage(true);
            }
          } else {
            setErrorMessage(true);
          }
        });
    } catch (error) {
      setErrorMessage(true);
      console.log(error);
    }
  };
};
export const fetchAllUsers = () => {
  console.log("Fetching users...");
  return async (dispatch, getState) => {
    try {
      fetch(`http://localhost:3002/users`)
        .then((response) => response.json())

        .then((users) => {
          if (users.users.length > 0) {
            dispatch({
              type: FETCH_ALL_USERS,
              payload: users.users,
            });
          } else {
            console.log("Error fetching all users.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchUserById = (userid, setUser) => {
  console.log("Fetching");
  return async (dispatch, getState) => {
    try {
      fetch(`http://localhost:3002/users/${userid}`)
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            setUser(user);
          } else {
            console.log("Error fetching user.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchUsersGroups = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const token = dispatch(getTokenFromStore());
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      fetch(`http://localhost:3002/users/profile/groups`, options)
        .then((response) => response.json())
        .then((groups) => {
          if (groups) {
            dispatch({
              type: SAVE_USERS_POSTS,
              payload: groups,
            });
            dispatch({
              type: LOADING,
              payload: false,
            });
            console.log("users groups are fetched <3");
          } else {
            console.log("Error fetching user.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
//WE NEED A FUNCTION TO FETCH SOMEONES GROUPS
export const fetchSomeonesGroups = (userId, setSomeonesGroups) => {
  return async (dispatch, getState) => {
    try {
      // fetch(`http://localhost:3002/users/${userId}/groups`)
      //   .then((response) => response.json())
      //   .then((groups) => {
      //     console.log(groups);
      //     if (groups.length > 0) {
      //       setSomeonesGroups(groups);
      //       console.log("users groups are fetched <3");
      //     } else {
      //       console.log("Error fetching specific user.");
      //     }
      //   });
    } catch (error) {
      console.log(error);
    }
  };
};
export const createGroup = (title, description, hashtags, onHide) => {
  console.log("Fetching");
  const postUrl = `http://localhost:3002/groups/`;
  const dataToSendForPost = {
    title: title,
    description: description,
    hashtags: hashtags,
  };
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());
    dispatch({
      type: LOADING,
      payload: true,
    });
    const optionsPost = {
      method: "POST",
      body: JSON.stringify(dataToSendForPost),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(postUrl, optionsPost);
      if (response.ok) {
        console.log("Succesfully posted <3");
        dispatch(getGroups());
        onHide();
      } else {
        console.log(
          "sorry, an error occured while trying to create this post."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const putUserById = (userid, data) => {
  console.log("Fetching");

  return async (dispatch, getState) => {
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log("putUserById is sending this data:", options);

      fetch(`http://localhost:3002/users/${userid}`, options)
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            console.log("user edited succesfully");
          } else {
            console.log("Error fetching user.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
export const joinTheGroup = (group_id, onHide) => {
  console.log("Joining");
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());
    dispatch({
      type: LOADING,
      payload: true,
    });
    const optionsJoinTeam = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const link = `http://localhost:3002/groups/join/${group_id}`;
    const teamResponse = await fetch(link, optionsJoinTeam);
    if (teamResponse.ok) {
      console.log("You joined <3");
      dispatch(getGroups());
      dispatch(getNotifications());
      dispatch(fetchUsersGroups());
      dispatch(fetchLoginnedUser(token));
    } else {
      console.log("huh?!");
    }
  };
};
export const leaveTheGroup = (group_id, onHide) => {
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());
    dispatch({
      type: LOADING,
      payload: true,
    });
    const optionsJoinTeam = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const link = `http://localhost:3002/groups/leave/${group_id}`;
    const teamResponse = await fetch(link, optionsJoinTeam);
    if (teamResponse.ok) {
      console.log("You left <3");
      dispatch(getGroups());
      dispatch(fetchLoginnedUser());
      dispatch(fetchUsersGroups());
      dispatch(getNotifications());
    } else {
      console.log("huh?!");
    }
  };
};
export const inviteToGroup = (group_id, user_id) => {
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());
    dispatch({
      type: LOADING,
      payload: true,
    });
    const optionsJoinTeam = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const link = `http://localhost:3002/groups/${group_id}/invite/${user_id}`;
    const teamResponse = await fetch(link, optionsJoinTeam);
    if (teamResponse.ok) {
      console.log("You invited someone <3");
      dispatch({
        type: LOADING,
        payload: false,
      });
    } else {
      console.log("huh?!");
    }
  };
};
export const fetchLoginnedUser = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const token = dispatch(getTokenFromStore());
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (token.length > 0) {
        fetch(`http://localhost:3002/users/me/profile`, options)
          .then((response) => response.json())
          .then((LoggedInUser) => {
            if (LoggedInUser) {
              console.log("User fetched.");
              dispatch({
                type: LOGIN,
                payload: LoggedInUser,
              });

              dispatch({
                type: LOADING,
                payload: false,
              });
            } else {
              console.log("Error fetching user.");
            }
          });
      } else {
        console.log("no token");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteGroup = (group_id) => {
  console.log("Deleting...");
  const Url = `http://localhost:3002/groups/${group_id}/`;

  return async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    const token = dispatch(getTokenFromStore());
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: LOADING,
      payload: true,
    });
    try {
      let response = await fetch(Url, deleteOptions);

      if (response.ok) {
        dispatch(getGroups());
        console.log("DELETED");
      } else {
        console.log("en error occured while fetching the experiences");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
//get the token from the store
export function getTokenFromStore() {
  return (dispatch, getState) => {
    const token = getState().token;
    return token;
  };
}
//FOLLOW SOMEONE
export const follow = (userid) => {
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const link = `http://localhost:3002/users/follow/${userid}`;
    const teamResponse = await fetch(link, options);
    if (teamResponse.ok) {
      console.log("You followed this user <3");
      dispatch(fetchLoginnedUser());
    } else {
      console.log("huh?!");
    }
  };
};
//UNFOLLOW
export const unfollow = (userid) => {
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const link = `http://localhost:3002/users/unfollow/${userid}`;
    const teamResponse = await fetch(link, options);
    if (teamResponse.ok) {
      console.log("You unfollowed this user <3");
      dispatch(fetchLoginnedUser());
    } else {
      console.log("huh?!");
    }
  };
};
//get notifications
export const getNotifications = () => {
  return async (dispatch, getState) => {
    const token = dispatch(getTokenFromStore());
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log("Loading notifications...");
    try {
      // const response = await fetch(
      //   "http://localhost:3002/notifications",
      //   options
      // );
      // if (response.ok) {
      //   let notifications = await response.json();
      //   console.log("notifications updated.");
      //   dispatch({
      //     type: FETCH_NOTIFICATIONS,
      //     payload: notifications,
      //   });
      // } else {
      //   console.log("Error fetching data");
      // }
      console.log("Notifications fetch --- empty");
    } catch (error) {
      console.log(error);
    }
  };
};
// export const getHashtags = () => {
//   return async (dispatch, getState) => {
//     try {
//       const response = await fetch("http://localhost:3002/hashtags");
//       if (response.ok) {
//         let hashtags = await response.json();
//         dispatch({
//           type: FETCH_HASHTAGS,
//           payload: hashtags,
//         });
//       } else {
//         console.log("Error fetching data");
//       }
//       console.log("Hashtags fetched");
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

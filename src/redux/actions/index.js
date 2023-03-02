import { io } from "socket.io-client";

import sound from "../../Sounds/notification.mp3";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const FETCH_HASHTAGS = "FETCH_HASHTAGS";
export const TOKEN = "TOKEN";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const JOIN_TEAM = "JOIN_TEAM";
export const LOADING = "LOADING";
export const LOGIN = "LOGIN";
export const SAVE_USERS_POSTS = "SAVE_USERS_POSTS";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const CONNECTED_TO_SOCKET = "CONNECTED_TO_SOCKET";
export const GENERAL_CHAT_HISTORY = "GENERAL_CHAT_HISTORY";
export const SOCKET_USERS_LIST = "SOCKET_USERS_LIST";

const socket = io("http://localhost:3002", { transports: ["websocket"] });

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
export const createGroup = (title, description, hashtags, formData, onHide) => {
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
        if (formData) {
          console.log("uploading cover...");
          const uploadCover = async () => {
            const res = await response.json();
            console.log("RES 217", res);
            const cover = fetch(
              `http://localhost:3002/groups/${res._id}/cover`,
              {
                method: "PUT",
                body: formData,
              }
            );
            const cover_res = await cover;
            if (cover_res) {
              console.log(cover_res);
              console.log("succ uploaded the cover");
              dispatch(getGroups());
              onHide();
            }
          };
          uploadCover();
          onHide();
        } else {
          dispatch(getGroups());
          onHide();
        }
        console.log("Succesfully posted <3");
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
  return async (dispatch, getState) => {
    const token = dispatch(getTokenFromStore());
    const LoggedInUser = getState().LoggedInUser[0];

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
      dispatch(
        sendNotification(userid, `${LoggedInUser.username} followed you`)
      );
    } else {
      console.log("huh?!");
    }
  };
};
//UNFOLLOW
export const unfollow = (userid) => {
  return async (dispatch, getState) => {
    const token = dispatch(getTokenFromStore());
    const LoggedInUser = getState().LoggedInUser[0];

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
      dispatch(
        sendNotification(userid, `${LoggedInUser.username} unfollowed you`)
      );
    } else {
      console.log("huh?!");
    }
  };
};
//get notifications
export const getNotifications = () => {
  return async (dispatch, getState) => {
    const token = getState().token;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        "http://localhost:3002/notifications/me",
        options
      );
      if (response.ok) {
        let notifications = await response.json();
        console.log("notifications updated.");
        dispatch({
          type: FETCH_NOTIFICATIONS,
          payload: notifications,
        });
        console.log(notifications);
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendMessage = (LoggedInUser, message) => {
  return async (dispatch, getState) => {
    const general_chat_history = getState().general_chat_history;
    console.log(general_chat_history);
    const newMessage = {
      username: LoggedInUser.username,
      pfp: LoggedInUser.pfp,
      user_id: LoggedInUser._id,
      text: message,
    };
    socket.emit("sendMessage", newMessage);
    dispatch({
      type: GENERAL_CHAT_HISTORY,
      payload: [general_chat_history[0].concat(newMessage)],
    });
  };
};

export const connectToSocketFunction = (LoggedInUser) => {
  console.log("check1");
  return async (dispatch, getState) => {
    console.log("check1.5");
    const general_chat_history = getState().general_chat_history;
    const notifications = getState().notifications;
    try {
      console.log("check2");
      socket.emit("setUsername", LoggedInUser);

      //
      //
      socket.on("welcome", (welcomeMessage) => {
        console.log("welcome message");
        socket.on("loggedIn", (onlineUsersList) => {
          console.log("connected");

          dispatch({
            type: CONNECTED_TO_SOCKET,
            payload: true,
          });
          dispatch({
            type: SOCKET_USERS_LIST,
            payload: onlineUsersList,
          });
        });
        socket.on("updateOnlineUsersList", (onlineUsersList) => {
          console.log("users list updated");
          dispatch({
            type: SOCKET_USERS_LIST,
            payload: onlineUsersList,
          });
        });
        socket.on("notification", (notification) => {
          const audio = new Audio(sound);
          audio.play();
          console.log("you've got new notification");
          dispatch({
            type: FETCH_NOTIFICATIONS,
            payload: [...notifications, notification],
          });
        });
      });

      socket.on("newMessage", (newMessage) => {
        dispatch({
          type: GENERAL_CHAT_HISTORY,
          payload: [general_chat_history[0].concat(newMessage)],
        });
      });
      socket.emit("requestChatHistory");
      socket.on("chatHistory", (chatHistory) => {
        dispatch({
          type: GENERAL_CHAT_HISTORY,
          payload: [chatHistory],
        });
      });
    } catch (error) {
      console.log(error);
      console.log("oopsie");
    }
  };
};

export const sendNotification = (userid, text) => {
  console.log("sending the notification");
  return async (dispatch, getState) => {
    const LoggedInUser = getState().LoggedInUser[0];
    const socket_users_list = getState().socket_users_list;

    const toSockedIdFilter = socket_users_list.filter(
      (user) => user._id === userid
    );
    console.log("right user", toSockedIdFilter);

    const newMessage = {
      from: socket.id,
      from_mongo: LoggedInUser,
      to_mongo: userid,
      to: toSockedIdFilter[0].socketId,
      text: text,
    };

    socket.emit("notification", newMessage);
  };
};

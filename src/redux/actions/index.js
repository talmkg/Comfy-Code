import { io } from "socket.io-client";

import sound from "../../Sounds/notification.mp3";
import { loadAllData, LOADING_RESULT } from "./loaderActions";

export const FETCH_FEED = "FETCH_FEED";
export const FETCH_HASHTAGS = "FETCH_HASHTAGS";
export const TOKEN = "TOKEN";
export const FETCH_ALL_USERS = "FETCH_ALL_USERS";
export const JOIN_TEAM = "JOIN_TEAM";
export const LOADING = "LOADING";
export const LOGIN = "LOGIN";
export const SAVE_USERS_GROUPS = "SAVE_USERS_GROUPS";
export const FETCH_NOTIFICATIONS = "FETCH_NOTIFICATIONS";
export const CONNECTED_TO_SOCKET = "CONNECTED_TO_SOCKET";
export const GENERAL_CHAT_HISTORY = "GENERAL_CHAT_HISTORY";
export const SOCKET_USERS_LIST = "SOCKET_USERS_LIST";
export const FETCH_BADGES = "FETCH_BADGES";
export const SAVE_MY_POSTS = "SAVE_MY_POSTS";

const socket = io("http://localhost:3002", { transports: ["websocket"] });

//get all groups
export const getFeed = (limit) => {
  return async (dispatch, getState) => {
    let local_limit = limit;
    if (local_limit === undefined || 0 || null) {
      local_limit = 10;
    }
    const token = dispatch(getTokenFromStore());

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `http://localhost:3002/feed/${local_limit}`,
        options
      );
      if (response.ok) {
        let feed = await response.json();
        console.log("feed updated.");
        dispatch({
          type: FETCH_FEED,
          payload: feed,
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
          console.log("token:", token);
          if (token.token !== undefined) {
            dispatch({
              type: TOKEN,
              payload: token.token,
            });
            // dispatch(fetchLoginnedUser());
            dispatch(loadAllData());
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
              type: SAVE_USERS_GROUPS,
              payload: groups,
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
export const createGroup = (
  // title, description, hashtags, formData, onHide
  title,
  description,
  hashtags,
  privacySetting,
  maxMembers,
  language,
  githubRepoLink,
  formData,
  onHide
) => {
  const postUrl = `http://localhost:3002/groups/`;
  const dataToSendForPost = {
    type: "Group",
    title: title,
    description: description,
    hashtags: hashtags,
    privacySetting: privacySetting,
    teamSize: maxMembers,
    language: language,
    githubRepoLink: githubRepoLink,
  };
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());

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
              dispatch(getFeed());
              onHide();
            }
          };
          uploadCover();
          dispatch(getFeed());
          onHide();
        } else {
          dispatch(getFeed());
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
      dispatch(getFeed());
      dispatch(fetchUsersGroups());
    } else {
      console.log("huh?!");
    }
  };
};
export const leaveTheGroup = (group_id, onHide) => {
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());

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
      dispatch(getFeed());
    } else {
      console.log("huh?!");
    }
  };
};
export const inviteToGroup = (group_id, userid) => {
  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());

    const optionsJoinTeam = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const link = `http://localhost:3002/groups/${group_id}/invite/${userid}`;
    const teamResponse = await fetch(link, optionsJoinTeam);
    if (teamResponse.ok) {
      console.log("inviteToGroup done");
      let type = "invite";
      dispatch(sendNotification({ userid, type, group_id }));
    } else {
      console.log("huh?!");
    }
  };
};
export const fetchLoginnedUser = () => {
  return async (dispatch, getState) => {
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
    const token = dispatch(getTokenFromStore());
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response = await fetch(Url, deleteOptions);
      if (response.ok) {
        dispatch(getFeed());
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
    const token = getState().main.token;
    return token;
  };
}
//FOLLOW SOMEONE
export const follow = (userid) => {
  return async (dispatch, getState) => {
    const token = dispatch(getTokenFromStore());
    const LoggedInUser = getState().main.LoggedInUser[0];

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
      const text = "followed you";
      const type = "follow";
      dispatch(sendNotification({ userid, text, type }));
    } else {
      console.log("huh?!");
    }
  };
};
//UNFOLLOW
export const unfollow = (userid) => {
  return async (dispatch, getState) => {
    const token = dispatch(getTokenFromStore());
    const LoggedInUser = getState().main.LoggedInUser[0];

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
    const general_chat_history = getState().main.general_chat_history;
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
  return async (dispatch, getState) => {
    const general_chat_history = getState().main.general_chat_history;
    try {
      socket.emit("setUsername", LoggedInUser);
      socket.on("welcome", (welcomeMessage) => {
        socket.on("loggedIn", (onlineUsersList) => {
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
          dispatch({
            type: SOCKET_USERS_LIST,
            payload: onlineUsersList,
          });
        });
        socket.on("notification", (notification) => {
          console.log("u've got notification");
          const audio = new Audio(sound);
          audio.play();
          const notifications = getState().main.notifications;
          dispatch({
            type: FETCH_NOTIFICATIONS,
            payload: [...notifications, notification],
          });
        });
      });

      socket.on("newMessage", (newMessage) => {
        console.log(general_chat_history);
        const freshhistory = getState().general_chat_history;
        dispatch({
          type: GENERAL_CHAT_HISTORY,
          payload: [freshhistory[0].concat(newMessage)],
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

export const sendNotification = (props) => {
  const { userid, text, type, group_id } = props;
  return async (dispatch, getState) => {
    const LoggedInUser = getState().main.LoggedInUser[0];
    const socket_users_list = getState().main.socket_users_list;
    // console.log("socket_users_list: ", socket_users_list);
    //find right recipient
    const toSockedIdFilter = socket_users_list.filter(
      (user) => user._id === userid
    );
    const identifier =
      toSockedIdFilter[0]?.socketId === undefined ? false : true;
    //found, if not = undefined

    if (type === "invite") {
      console.log(userid, group_id);
      const newMessage = {
        from: socket.id,
        type: type,
        from_mongo: LoggedInUser,
        to_mongo: userid,
        to: identifier ? toSockedIdFilter[0].socketId : undefined,
        text: "invited you to the group",
        groupID: group_id,
      };
      console.log("newMessage", newMessage);
      socket.emit("notification", newMessage);
      console.log("You invited someone <3");
    }

    //if type === "follow"
    if (type === "follow") {
      const newMessage = {
        from: socket.id,
        type: type,
        from_mongo: LoggedInUser,
        to_mongo: userid,
        to: identifier ? toSockedIdFilter[0].socketId : undefined,
        text: text,
      };
      console.log("newMessage", newMessage);
      socket.emit("notification", newMessage);
    }
  };
};
export const fetchBadges = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:3002/badges");
      if (response.ok) {
        let badges = await response.json();
        console.log("badges updated.");
        dispatch({
          type: FETCH_BADGES,
          payload: badges,
        });
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateMyProfile = (data) => {
  console.log("Fetching");
  return async (dispatch, getState) => {
    const token = getState().main.token;
    const user = getState().main.LoggedInUser[0];
    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      fetch(`http://localhost:3002/users/${user._id}`, options)
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            console.log("user edited succesfully");
            dispatch(fetchLoginnedUser());
          } else {
            console.log("Error fetching user.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateMyProfilePicture = (data) => {
  console.log("changing pfp");

  return async (dispatch, getState) => {
    const token = getState().main.token;
    const user = getState().main.LoggedInUser[0];
    console.log("token check", token);
    const options = {
      method: "PUT",
      body: data,
    };
    try {
      fetch(`http://localhost:3002/users/${user._id}/pfp`, options).then(
        (user) => {
          if (user) {
            console.log("user edited succesfully");
            dispatch(fetchLoginnedUser());
          } else {
            console.log("Error fetching user.");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateMyProfileBackground = (data) => {
  console.log("Fetching");
  return async (dispatch, getState) => {
    const token = dispatch(getTokenFromStore());

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      fetch(`http://localhost:3002/users/background`, options)
        .then((response) => response.json())
        .then((user) => {
          if (user) {
            console.log("user edited succesfully");
            dispatch(fetchLoginnedUser());
          } else {
            console.log("Error fetching user.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchUsersPosts = (id, setPosts) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`http://localhost:3002/posts/${id}`);
      if (response.ok) {
        let posts = await response.json();
        setPosts(posts);
        console.log("posts fetched.");
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchLoggedInUsersPosts = () => {
  return async (dispatch, getState) => {
    try {
      const token = dispatch(getTokenFromStore());

      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(`http://localhost:3002/posts/me`, options);
      if (response.ok) {
        let posts = await response.json();
        dispatch({
          type: SAVE_MY_POSTS,
          payload: posts,
        });
        console.log("posts fetched.");
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const createPost = (formData, onHide) => {
  console.log("Fetching");
  const postUrl = `http://localhost:3002/posts/`;
  console.log(formData);

  return async (dispatch) => {
    const token = dispatch(getTokenFromStore());

    const optionsPost = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(postUrl, optionsPost);
      if (response.ok) {
        console.log("Succesfully posted <3");
        dispatch(getFeed());
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
export const getChatMessages = (chatid, setMessages) => {
  return async (dispatch, getState) => {
    try {
      const token = dispatch(getTokenFromStore());
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `http://localhost:3002/direct-messages/${chatid}`,
        options
      );
      if (response.ok) {
        let messages = await response.json();
        setMessages(messages);

        //find right chat in redux
        const allChats = getState().main.chats;
        console.log("chats: ", allChats)
        //append messages to it
        console.log("posts fetched.");
      } else {
        console.log("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

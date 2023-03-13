import {
  connectToSocketFunction,
  fetchLoggedInUsersPosts,
  fetchLoginnedUser,
  fetchUsersGroups,
  FETCH_FEED,
  FETCH_NOTIFICATIONS,
  getFeed,
  getNotifications,
  getToken,
  LOGIN,
  SAVE_MY_POSTS,
  SAVE_USERS_GROUPS,
  TOKEN,
} from ".";
export const LOADING_RESULT = "LOADING_RESULT";
export const LOADING_PROGRESS = "LOADING_PROGRESS";
export const SAVE_MY_CHATS = "SAVE_MY_CHATS";

//------------------ LOAD ALL DATA ----------------------//
export const loadAllData = () => {
  return async (dispatch, getState) => {
    const token = getState().main.token;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: LOADING_PROGRESS,
      payload: 0,
    });
    dispatch({
      type: LOADING_RESULT,
      payload: true,
    });
    try {
      let localProgress = 0;

      const fetchUsersGroupsFunc = async () => {
        fetch(`http://localhost:3002/users/profile/groups`, options)
          .then((response) => response.json())
          .then((groups) => {
            if (groups) {
              dispatch({
                type: SAVE_USERS_GROUPS,
                payload: groups,
              });
              localProgress = localProgress + 20;
              dispatch({
                type: LOADING_PROGRESS,
                payload: localProgress,
              });
              console.log(localProgress);
              ifReady();
            }
          });
      };
      const getFeed = (limit) => {
        return async (dispatch, getState) => {
          let local_limit = limit;
          if (local_limit === undefined || 0 || null) {
            local_limit = 10;
          }

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
      const fetchLoginnedUserFunc = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/users/me/profile`,
            options
          );
          if (response.ok) {
            let LoggedInUser = await response.json();
            dispatch({
              type: LOGIN,
              payload: LoggedInUser,
            });
            localProgress = localProgress + 20;
            dispatch({
              type: LOADING_PROGRESS,
              payload: localProgress,
            });
            console.log(localProgress);
            ifReady();
          } else {
            console.log("Error fetching data");
          }
        } catch (error) {
          console.log(error);
        }
      };
      const fetchLoggedInUsersPostsFunc = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/posts/me`,
            options
          );
          if (response.ok) {
            let posts = await response.json();
            dispatch({
              type: SAVE_MY_POSTS,
              payload: posts,
            });
            localProgress = localProgress + 20;
            dispatch({
              type: LOADING_PROGRESS,
              payload: localProgress,
            });
            console.log(localProgress);
            ifReady();
          } else {
            console.log("Error fetching data");
          }
        } catch (error) {
          console.log(error);
        }
      };
      const getNotificationsFunc = async () => {
        try {
          const response = await fetch(
            "http://localhost:3002/notifications/me",
            options
          );
          if (response.ok) {
            let notifications = await response.json();

            dispatch({
              type: FETCH_NOTIFICATIONS,
              payload: notifications,
            });
            localProgress = localProgress + 20;
            dispatch({
              type: LOADING_PROGRESS,
              payload: localProgress,
            });
            ifReady();
          } else {
            console.log("Error fetching data");
          }
        } catch (error) {
          console.log(error);
        }
      };
      const fetchMyChats = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/chats/me`,
            options
          );
          if (response.ok) {
            let chats = await response.json();
            dispatch({
              type: SAVE_MY_CHATS,
              payload: chats,
            });
            localProgress = localProgress + 20;
            dispatch({
              type: LOADING_PROGRESS,
              payload: localProgress,
            });
            console.log(localProgress);
            ifReady();
          } else {
            console.log("Error fetching data");
          }
        } catch (error) {
          console.log(error);
        }
      };

      const tokenCheck = async () => {
        try {
          const response = await fetch(
            `http://localhost:3002/auth/token-check`,
            options
          );

          if (response.ok) {
            console.log("token is valid");
          } else {
            console.log("token expired");
            dispatch({
              type: LOADING_RESULT,
              payload: false,
            });
            dispatch({
              type: LOGIN,
              payload: [],
            });
            dispatch({
              type: TOKEN,
              payload: [],
            });
            dispatch({
              type: LOADING_RESULT,
              payload: false,
            });
            window.location.replace("/login");
          }
        } catch (error) {
          console.log("huh");
        }
      };
      tokenCheck();
      fetchUsersGroupsFunc();
      dispatch(getFeed(30));
      fetchLoginnedUserFunc();
      fetchLoggedInUsersPostsFunc();
      getNotificationsFunc();
      fetchMyChats();

      const ifReady = () => {
        const final_progress = getState().loader.loadingProgress;
        if (final_progress === 100) {
          console.log("finished!");
          dispatch({
            type: LOADING_RESULT,
            payload: false,
          });
          dispatch({
            type: LOADING_PROGRESS,
            payload: 0,
          });
        }
      };
    } catch (error) {
      console.log(error);
    }
  };
};

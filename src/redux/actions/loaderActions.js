import {
  connectToSocketFunction,
  fetchLoggedInUsersPosts,
  fetchLoginnedUser,
  fetchUsersGroups,
  FETCH_NOTIFICATIONS,
  getFeed,
  getNotifications,
  LOGIN,
  SAVE_MY_POSTS,
  SAVE_USERS_GROUPS,
} from ".";
export const LOADING_RESULT = "LOADING_RESULT";
export const LOADING_PROGRESS = "LOADING_PROGRESS";
//------------------ LOAD ALL DATA ----------------------//
export const loadAllData = () => {
  //1. fetch all data
  //2. if all fetches, and only IF all fetches are done - use callback (via props) to mark as done
  return async (dispatch, getState) => {
    const LoggedInUser = getState().main.LoggedInUser[0];
    const token = getState().main.token;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({
      type: LOADING_RESULT,
      payload: true,
    });
    //
    //
    //
    //
    //
    try {
      let localProgress = 0;
      //move to redux?
      // every time func finishes, we add +25
      // when it reaches 100, we fire false for LOADING_RESULT
      //
      //
      //===fetchUsersGroups
      const fetchUsersGroupsFunc = () => {
        fetch(`http://localhost:3002/users/profile/groups`, options)
          .then((response) => response.json())
          .then((groups) => {
            console.log("groups fetched.");

            if (groups) {
              dispatch({
                type: SAVE_USERS_GROUPS,
                payload: groups,
              });
              localProgress = localProgress + 25;
              console.log(localProgress);
            }
          });
      };
      //===fetchLoginnedUser
      const fetchLoginnedUserFunc = () => {
        try {
          fetch(`http://localhost:3002/users/me/profile`, options)
            .then((response) => response.json())
            .then((LoggedInUser) => {
              if (LoggedInUser) {
                console.log("User fetched.");
                dispatch({
                  type: LOGIN,
                  payload: LoggedInUser,
                });
                localProgress = localProgress + 25;
                console.log(localProgress);
              } else {
                console.log("Error fetching user.");
              }
            });
        } catch (error) {
          console.log(error);
        }
      };
      //===fetchLoggedInUsersPosts
      const fetchLoggedInUsersPostsFunc = () => {
        return async (dispatch, getState) => {
          try {
            const response = await fetch(
              `http://localhost:3002/posts/me`,
              options
            );
            if (response.ok) {
              console.log("posts fetched.");

              let posts = await response.json();
              dispatch({
                type: SAVE_MY_POSTS,
                payload: posts,
              });
              localProgress = localProgress + 25;
              console.log(localProgress);
              console.log("posts fetched.");
            } else {
              console.log("Error fetching data");
            }
          } catch (error) {
            console.log(error);
          }
        };
      };
      const getNotificationsFunc = () => {
        return async (dispatch, getState) => {
          try {
            const response = await fetch(
              "http://localhost:3002/notifications/me",
              options
            );
            if (response.ok) {
              console.log("notifications updated.");
              let notifications = await response.json();

              dispatch({
                type: FETCH_NOTIFICATIONS,
                payload: notifications,
              });
              localProgress = localProgress + 25;
              console.log(localProgress);
            } else {
              console.log("Error fetching data");
            }
          } catch (error) {
            console.log(error);
          }
        };
      };

      fetchUsersGroupsFunc();
      fetchLoginnedUserFunc();
      fetchLoggedInUsersPostsFunc();
      getNotificationsFunc();
      console.log(localProgress);
      if (localProgress === 100) {
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
    } catch (error) {
      console.log(error);
    }
  };
};

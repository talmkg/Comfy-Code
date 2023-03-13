import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalTopNav from "../../components/GlobalTopNav/GlobalTopNav";
import Notification from "../../components/Mini_Components/Notification";
import { fetchUsersGroups } from "../../redux/actions";

import "./styles.css";

const Notifications = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUsersGroups());
  // }, []);

  const Notifications = useSelector((state) => state?.main.notifications);
  return (
    <>
      <div
        className="flex-fill text-light overflow-hidden"
        style={{
          width: "100%",
          backgroundColor: "#191724",
        }}
      >
        <GlobalTopNav identifier={"notifications"} />
        <div className="w-100 h-100 d-flex justify-content-center mt-4">
          <div
            className="h-100 rounded-top"
            style={{ width: "850px", backgroundColor: "#1d1b2a" }}
          >
            {Notifications[0] ? (
              Notifications?.map((notification, i) => {
                return (
                  <div
                    key={i}
                    className="p-1"
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.192)",
                    }}
                  >
                    {notification.type === "invite" ? (
                      <Notification
                        {...notification}
                        key={i}
                        currentPage={"notifications"}
                      />
                    ) : (
                      <></>
                    )}
                    {notification.type === "follow" ? (
                      <Notification
                        {...notification}
                        key={i}
                        currentPage={"notifications"}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
            ) : (
              <div id="center" className="text-center text-color">
                You have no notifications yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Notifications;

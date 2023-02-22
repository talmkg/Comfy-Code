import React from "react";

const Notifications = () => {
  const [scroller, initScroller] = React.useState(0);
  const handleScroll = (event) => {
    const height = event.currentTarget.clientHeight;
    const barHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;
    const scrollBottom = event.currentTarget.scrollBottom;
    initScroller(((scrollTop + height) / barHeight) * 100);
  };
  return (
    <>
      <div className="bg-dark w-100">
        <div className="position-fixed" style={{ top: 0 }}>
          <div
            className="rounded-3 position-relative"
            style={styles.progressBar}
          >
            <div
              className="rounded-3"
              style={{
                ...styles.scrolled,
                width: `${scroller}%`,
              }}
            >
              <p
                className="centeredItem text-center position-absolute"
                style={{ left: 0, right: 0 }}
              >
                <strong className="text-light">{scroller.toFixed(2)}%</strong>
              </p>
            </div>
          </div>
        </div>

        <div style={styles.postBlock} onScroll={handleScroll}>
          <div style={styles.post}>
            <div style={{ height: "400vh" }}></div>
          </div>
        </div>
        <div onScroll={handleScroll}>
          {" "}
          <div
            className="bg-dark w-100"
            style={{ height: "400vh" }}
            onScroll={handleScroll}
          ></div>
        </div>
      </div>
    </>
  );
};
const styles = {
  postBlock: {
    width: 555,
    height: 410,
    margin: "0 auto",
    overflowY: "auto",
    background: "rgb(202 216 255)",
    overflowX: "hidden",
  },
  post: {
    color: "#fff",
    fontSize: "22px",
    textAlign: "center",
    margin: "12px 20px",
    padding: "28px 28px",
    background: "#3f51b5",
    borderBottom: "1px solid white",
  },
  progressBar: {
    width: 555,
    height: 32,
    margin: "auto",
    backgroundColor: "#2A273D",
    border: "1px solid lightgray",
    position: "sticky",
    top: 0,
  },
  scrolled: {
    height: "100%",
    backgroundColor: "#FFC0B7",
  },
  centeredItem: {
    textAlign: "center",
  },
};
export default Notifications;

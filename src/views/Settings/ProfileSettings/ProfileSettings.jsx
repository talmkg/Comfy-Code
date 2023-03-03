import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { MdDone } from "react-icons/md";
import { useSelector } from "react-redux";
import "./styles.css";
//datepicker
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
//

const css = `

  .my-selected:not([disabled]) {
    font-weight: #c4a7e7;
    border: 2px solid #c4a7e7;

  }

  .my-selected:hover:not([disabled]) {
    border-color: #7b6696;
  }
  .my-selected:hover {
    background-color: red;
  }
  .my-today {
    font-size: 140%;
  }

`;

const ProfileSettings = () => {
  const LoggedInUser = useSelector((state) => state.LoggedInUser[0]);
  const [username, setUsername] = useState(LoggedInUser.username);
  const [location, setLocation] = useState(LoggedInUser?.location);
  const [birthday, setBirthday] = useState(LoggedInUser?.birthday);
  const [bio, setBio] = useState(LoggedInUser?.bio);
  //datepicker
  const [selected, setSelected] = useState(undefined);
  //
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (selected) {
      setBirthday(selected.toLocaleDateString("en-US"));
    }
  }, [selected]);

  const setBirthdayFunc = () => {
    if (active === false) {
      setActive(true);
      let elem = document.getElementById("datePicker");
      let elem_input = document.getElementById("birthday-input");
      elem_input.classList.add("rounded-0");
      elem.classList.remove("d-none");
      elem.classList.add("d-block");
    } else {
      setActive(false);
      let elem = document.getElementById("datePicker");
      let elem_input = document.getElementById("birthday-input");
      elem_input.classList.remove("rounded-0");
      elem.classList.remove("d-block");
      elem.classList.add("d-none");
    }
  };
  return (
    <>
      <style>{css}</style>
      <div className="text-light w-100 pb-5 ">
        <div>
          <div
            className="w-100 rounded-2 position-relative"
            style={{
              height: "200px",
              backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%), url(${LoggedInUser.background})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              backgroundSize: "cover",
            }}
          >
            <div
              className="position-absolute h-100 w-25 d-flex align-items-center"
              style={{ left: 0 }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  src={LoggedInUser.pfp}
                  style={{ borderRadius: "50%" }}
                  className="w-75 pb-2"
                />
                <Button className="edit-prof-buttons">Change avatar</Button>
              </div>
            </div>
            <div className="position-absolute p-3" style={{ top: 0, right: 0 }}>
              <Button className="edit-prof-buttons">Change background</Button>
            </div>
          </div>
        </div>
        <div className="h-50">
          <Form.Group className="pt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              className="custom-input-settings"
              placeholder="Enter your new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              className="custom-input-settings"
              style={{ border: "none", minHeight: "120px" }}
              placeholder="What's on your mind?"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="username"
              className="custom-input-settings"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="username"
              id="birthday-input"
              className="custom-input-settings"
              placeholder="Enter your birthday, month/day/year"
              value={birthday}
              onClick={setBirthdayFunc}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Form.Group>
          <div
            className="w-100 d-flex justify-content-center d-none"
            id="datePicker"
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              onChange={setBirthday}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
              styles={{}}
              // modifiersStyles={{
              //   disabled: { fontSize: "75%" },
              // }}
            />
          </div>
        </div>
        {username !== LoggedInUser.username ||
        bio !== LoggedInUser?.bio ||
        location !== LoggedInUser?.location ||
        birthday !== LoggedInUser?.birthday ? (
          <div className="position-fixed bottom-center d-flex align-items-end justify-content-center">
            <Button className="gradient-button rounded-3 d-flex align-items-center">
              <span className="pe-1">Save</span> <MdDone size={20} />
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default ProfileSettings;

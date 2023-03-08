import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
//datepicker
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect } from "react";
import {
  updateMyProfile,
  updateMyProfilePicture,
} from "../../../redux/actions";
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
  const LoggedInUser = useSelector((state) => state.main.LoggedInUser[0]);
  const [username, setUsername] = useState(LoggedInUser?.username);
  const [location, setLocation] = useState(LoggedInUser?.location);
  const [birthday, setBirthday] = useState(LoggedInUser?.birthday);
  const [name, setName] = useState(LoggedInUser?.name);
  const [surname, setSurname] = useState(LoggedInUser?.surname);
  const [bio, setBio] = useState(LoggedInUser?.bio);
  const [pfp, setPfp] = useState(LoggedInUser?.pfp);
  const [pfpchangeindicator, setpfpchangeindicator] = useState(false);
  //datepicker
  const [selected, setSelected] = useState(undefined);
  //
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selected) {
      setBirthday(selected.toLocaleDateString("en-US"));
    }
  }, [selected]);
  const updateUsersData = () => {
    const data = {};
    if (username !== LoggedInUser?.username) {
      data["username"] =
        username !== LoggedInUser.username ? username : LoggedInUser.username;
    }
    if (location !== LoggedInUser?.location) {
      data["location"] =
        location !== LoggedInUser.location ? location : LoggedInUser.location;
    }
    if (birthday !== LoggedInUser?.birthday) {
      data["birthday"] =
        birthday !== LoggedInUser.birthday ? birthday : LoggedInUser.birthday;
    }
    if (bio !== LoggedInUser?.bio) {
      data["bio"] = bio !== LoggedInUser.bio ? bio : LoggedInUser.bio;
    }
    if (name !== LoggedInUser?.name) {
      data["name"] = name !== LoggedInUser.name ? name : LoggedInUser.name;
    }
    if (surname !== LoggedInUser?.surname) {
      data["surname"] =
        surname !== LoggedInUser.surname ? surname : LoggedInUser.surname;
    }

    if (pfp !== LoggedInUser?.pfp) {
      const formData = new FormData();
      formData.append("pfp", pfp);
      dispatch(updateMyProfilePicture(formData));
      setpfpchangeindicator(false);
    }
    if (
      username !== LoggedInUser.username ||
      bio !== LoggedInUser?.bio ||
      location !== LoggedInUser?.location ||
      birthday !== LoggedInUser?.birthday ||
      name !== LoggedInUser?.name ||
      surname !== LoggedInUser?.surname
    ) {
      dispatch(updateMyProfile(data));
      console.log(data);
    }
  };
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
  const selectPFP = () => {
    document.getElementById("choosePFP").click();
  };

  const setStatePFP = (e) => {
    setpfpchangeindicator(true);
    setPfp(e.target.files[0]);
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
              className="position-absolute h-100 d-flex align-items-center"
              style={{ left: 0, width: "max-content" }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center mx-3">
                <img
                  src={LoggedInUser.pfp}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    width: "100px",
                    height: "100px",
                  }}
                  className="mb-2"
                />
                <Button
                  size="sm"
                  className="edit-prof-buttons"
                  onClick={selectPFP}
                >
                  Change avatar
                </Button>
                <Form.Control
                  style={{ display: "none" }}
                  onChange={(e) => setStatePFP(e)}
                  type="file"
                  id="choosePFP"
                  accept=".jpg, .jpeg, .png"
                />
              </div>
            </div>
            <div className="position-absolute p-2" style={{ top: 0, right: 0 }}>
              <Button size="sm" className="edit-prof-buttons">
                Change background
              </Button>
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
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              className="custom-input-settings"
              placeholder="Enter your new username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="surname"
              className="custom-input-settings"
              placeholder="Enter your new username"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
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
        birthday !== LoggedInUser?.birthday ||
        name !== LoggedInUser?.name ||
        surname !== LoggedInUser?.surname ||
        pfpchangeindicator === true ? (
          <div className="position-fixed bottom-center d-flex align-items-end justify-content-center">
            <Button
              className="gradient-button rounded-3 d-flex align-items-center"
              onClick={updateUsersData}
            >
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

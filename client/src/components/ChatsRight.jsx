import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import ChairIcon from "@mui/icons-material/Chair";

import Tooltip from "@mui/material/Tooltip";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const ChatsRight = ({ countRooms, socket }) => {
  // const [position, setPosition] = useState({
  //   // top: false,
  //   // left: false,
  //   // bottom: false,
  //   rooms: false,
  // });

  const [position, setPosition] = useState({});

  const [rooms, setRooms] = useState([]);

  const serverUrl = process.env.REACT_APP_BE_URL;

  const passedSocket = socket;
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setPosition({ ...position, [anchor]: open });
  };

  // fetch the rooms
  const baseEndpoint = process.env.BE_URL;
  console.log("baseendpoint: ", baseEndpoint);
  const fetchRooms = async () => {
    try {
      const endpoint = ` ${serverUrl}/rooms`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Network response was not ok. Failed to get the available chat rooms");
      }

      const fetchedRooms = await response.json();
      console.log("the fetched rooms are: ", rooms);
      setRooms(fetchedRooms);
    } catch (error) {
      console.log(error);
    }
  };

  // join dynamic room
  const joinRoom = (roomId) => {
    passedSocket.emit("join-room", { roomId: roomId });
    navigate(`/rooms/${roomId}`);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [countRooms]);

  useEffect(() => {
    if (!passedSocket) return;

    passedSocket.on("new-room-created", ({ roomId }) => {
      console.log(`RECEIVING NEW ROOM  - ${roomId}`);
      setRooms([...rooms, roomId]);
    });
  }, [passedSocket]);

  const list = (anchor) => (
    <Box
      sx={{ width: 450 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary={`Available Rooms: ${rooms.length === 0 ? "0" : rooms.length}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      {/* LISTING ALL THE ROOMS IN THE DATABASE */}
      <List sx={{ overflow: "auto", maxHeight: 400, color: "#90caf9", fontSize: "0.55" }}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <ListItem key={room.roomId} disablePadding onClick={() => joinRoom(room.roomId)}>
              <ListItemButton>
                <ListItemIcon>
                  <ChairIcon sx={{ color: "#90caf9" }} />
                </ListItemIcon>
                <ListItemText primary={`Room: ${room.roomId.slice(-4)}`} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ChairIcon sx={{ color: "#90caf9" }} />
              </ListItemIcon>
              <ListItemText primary="No rooms in the db at the moment" />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider />
      {/* <List>
        {["Clear Rooms"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ClearIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>View Rooms</Button> */}
          <Tooltip title="See all rooms" placement="top">
            <Button onClick={toggleDrawer(anchor, true)}>
              <VisibilityIcon />
            </Button>
          </Tooltip>

          <SwipeableDrawer
            anchor={anchor}
            open={position[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ChatsRight;

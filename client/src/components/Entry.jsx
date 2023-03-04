import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";

import { useState } from "react";
import EntryEditModal from "./EntryEditModal";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { setSelectedJournalAction } from "../redux/actions";
import EntryDeleteModal from "./EntryDeleteModal";

const Entry = ({ title, topic, content, count, setCount }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        <ListItemAvatar>
          <Avatar sx={{ display: "flex", justifyContent: "center", alignItems: "center", color: "black" }}>
            {/* <CreateIcon onClick={() => console.log("Delete clicked")} /> */}
            <EntryEditModal
              handleOpenEdit={handleOpenEdit}
              handleCloseEdit={handleCloseEdit}
              openEdit={openEdit}
              content={content}
              topic={topic}
              title={title}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${title}`}
          secondaryTypographyProps={{ color: "rgba(255, 255, 255, 0.6)" }}
          secondary={`${topic}`}
        />
      </Box>

      <EntryDeleteModal
        handleOpenDelete={handleOpenDelete}
        handleCloseDelete={handleCloseDelete}
        openDelete={openDelete}
        count={count}
        setCount={setCount}
      />
    </>
  );
};
export default Entry;

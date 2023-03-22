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
import { Typography } from "@mui/material";

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
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ListItemAvatar>
            <Avatar sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "1rem", textOverflow: "ellipsis", overflow: "hidden" }} noWrap>
                  {title.length > 8 ? title.substring(0, 8) + "..." : title}
                </Typography>
              }
              secondaryTypographyProps={{ color: "rgba(255, 255, 255, 0.6)" }}
              secondary={
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "rgba(255, 255, 255, 0.6)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  noWrap
                >
                  {topic.length > 8 ? topic.substring(0, 8) + "..." : topic}
                </Typography>
              }
            />
          </Box>
        </Box>

        <EntryDeleteModal
          handleOpenDelete={handleOpenDelete}
          handleCloseDelete={handleCloseDelete}
          openDelete={openDelete}
          count={count}
          setCount={setCount}
        />
      </Box>
    </>
  );
};
export default Entry;

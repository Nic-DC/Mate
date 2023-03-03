import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

const Entry = ({ title, topic }) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar>
          <CreateIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${title}`}
        secondaryTypographyProps={{ color: "rgba(255, 255, 255, 0.6)" }}
        secondary={`${topic}`}
      />
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon sx={{ color: "rgba(255, 255, 255, 0.6)" }} />
      </IconButton>
    </>
  );
};
export default Entry;

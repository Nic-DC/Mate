import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logo from "./Logo";
import { Stack } from "@mui/system";
import { Button, Divider, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CreateIcon from "@mui/icons-material/Create";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const HomeCard = () => {
  const [expanded, setExpanded] = React.useState(false);

  const navigate = useNavigate();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 1000, bgcolor: "rgba(0, 0, 0, 0.8)", color: "#90caf9", marginBottom: 0 }}>
      <CardHeader
        avatar={<Logo />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        // title="Welcome home!"
        // subheader="We're helping you to help yourself"
      />

      <CardContent>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", marginBottom: 2 }} />
        <Typography variant="body2" color="#90caf9" fontSize={45}>
          {/* Welcome home! */}
          Welcome <span style={{ fontSize: 47, fontWeight: "bold", color: deepOrange[500] }}>home</span> !
        </Typography>
        <Typography variant="body2" color="#90caf9" fontSize={27}>
          {/* What do you want to do? */}
          What do you want to <span style={{ fontSize: 29, fontWeight: "bold", color: deepOrange[500] }}>write</span> ?
        </Typography>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", marginTop: 3 }} />
      </CardContent>

      <CardActions disableSpacing>
        <Stack direction="row" spacing={2}>
          <Tooltip title="My chat">
            <Button onClick={() => navigate("/chat")}>
              <ChatIcon sx={{ fontSize: "2.5rem", marginRight: 3 }} />
            </Button>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Tooltip title="My journal">
            <Button onClick={() => navigate(`/journal`)}>
              <CreateIcon sx={{ fontSize: "2.5rem", marginRight: 3 }} />
            </Button>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Tooltip title="My Mate">
            <Button onClick={() => navigate(`/aimate`)}>
              <Diversity2Icon sx={{ fontSize: "2.5rem" }} />
            </Button>
          </Tooltip>
        </Stack>
        {/* <Register
          handleCloseRegister={handleCloseRegister}
          handleOpenRegister={handleOpenRegister}
          openRegister={openRegister}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Login
          handleCloseLogin={handleCloseLogin}
          handleOpenLogin={handleOpenLogin}
          openLogin={openLogin}
          setIsAuthenticated={setIsAuthenticated}
        /> */}
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon sx={{ color: "#90caf9" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color="#90caf9">
            Method:
          </Typography>
          <Typography paragraph color="#90caf9">
            Heat 1/2 cup of the broth .
          </Typography>
          <Typography paragraph color="#90caf9">
            Heat oil in a
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
export default HomeCard;

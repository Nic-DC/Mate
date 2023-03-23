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

const WelcomeCard = ({
  handleCloseRegister,
  handleOpenRegister,
  openRegister,
  handleCloseLogin,
  handleOpenLogin,
  openLogin,
  setIsAuthenticated,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 1000, bgcolor: "rgba(0, 0, 0, 0.5)", color: "#90caf9" }}>
      <CardMedia component="img" height="250" image="/AI.svg" alt="Paella dish" />

      <CardContent>
        <Typography variant="body2" color="#90caf9" fontSize={40}>
          Write your path!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Register
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
        />
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon sx={{ color: "#90caf9" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color="#90caf9">
            Tech Overview: MERN stack, JWT Refresh Tokens, Socket.io, REST API CRUD, Blockchain,
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
export default WelcomeCard;

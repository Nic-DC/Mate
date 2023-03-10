import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
}));
const BlockExplorer = () => {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const getBlocks = async () => {
      try {
        const response = await fetch("/api/blocks");
        const data = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error(error);
      }
    };
    getBlocks();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4">Block Explorer</Typography>
      <List className={classes.list}>
        {blocks.map((block) => (
          <ListItem key={block.hash}>
            <ListItemText primary={`Block hash: ${block.hash}`} secondary={`Timestamp: ${block.timestamp}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default BlockExplorer;

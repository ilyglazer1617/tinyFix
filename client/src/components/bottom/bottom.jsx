import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import TableRowsIcon from "@mui/icons-material/TableRows";
import MailIcon from "@mui/icons-material/Mail";
import MapIcon from "@mui/icons-material/Map";
import { useNavigate } from "react-router-dom";
const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Bottom = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar
        position="fixed"
        color=""
        sx={{ top: "auto", bottom: 0, background: "rgb(255, 136, 0)" }}
      >
        <Toolbar className="homeHead">
          <IconButton color="inherit" aria-label="open drawer">
            <MailIcon />
          </IconButton>
          <MapIcon />
          <StyledFab
            sx={{
              backgroundColor: "#b71c1c",
              color: "wheat",
            }}
            aria-label="add"
          >
            <AddIcon onClick={() => navigate("/Posts")} />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <PersonIcon onClick={() => navigate("/PrsonalInfo")} />
          </IconButton>
          <IconButton color="inherit">
            <TableRowsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Bottom;

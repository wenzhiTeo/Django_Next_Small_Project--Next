import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { blue } from "@material-ui/core/colors";
import { Container, Link, List, ListItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainAppBar: {
    backgroundColor: "#f2f2f2",
    color: "#00ace6",
  },
  mainToolBar: {
    padding: "0px",
    minHeight: 60,
  },
  desktopAppBar: {
    backgroundColor: "black",
    color: "white",
  },
  desktopToolBar: {
    padding: "0px",
    minHeight: 30,
  },
  secondAppBar: {
    backgroundColor: "#525050",
    color: "#fff",
  },
  secondToolBar: {
    padding: "0px",
    minHeight: 50,
  },
  menuList: {
    display: "flex",
    flexDirection: "row",
    padding: "0",
  },
  promotionAppBar: {
    backgroundColor: "#2d2d2d",
    color: "#fff",
    margin: theme.spacing(0, 0, 8),
    ["@media (max-width:600px)"]: {
      margin: theme.spacing(0, 0, 2),
    },
  },
  promotionToolBar: {
    padding: "0px",
    minHeight: 50,
  },
  menuListItem: {
    padding: 0,
    paddingRight: 20,
    textTransform: "capitalize",
  },
  listItemLink: {
    fontSize: 13,
    color: "#fff",
    textDecoration: "none",
  },
}));

export default function Header({ data }) {
  const classes = useStyles();

  return (
    <nav>
      <AppBar
        position="relative"
        elevation={0}
        className={classes.desktopAppBar}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.desktopToolBar}></Toolbar>
        </Container>
      </AppBar>

      <AppBar position="static" className={classes.mainAppBar}>
        <Container maxWidth="lg">
          <Toolbar className={classes.mainToolBar}>
            <a href={`/`} style={{ height: 30 }}>
              <svg
                viewBox="0 0 400 50"
                xmlns="http://www.w3.org/2000/svg"
                height="25"
                width="200"
              >
                <text
                  style={{
                    fill: "rgb(51, 51, 51)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 50,
                    fontStyle: "italic",
                    fontWeight: 700,
                    whiteSpace: "pre",
                  }}
                  x={0}
                  y={40}
                >
                  {"Hello Logo"}
                </text>
              </svg>
            </a>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar
        position="relative"
        elevation={0}
        className={classes.secondAppBar}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.secondToolBar}>
            <List className={classes.menuList}>
              {data.map((category) => (
                <ListItem key={category.name} className={classes.menuListItem}>
                  <Link href={`/category/${encodeURIComponent(category.slug)}`}>
                    <a className={classes.listItemLink}>{category.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar
        position="relative"
        elevation={0}
        className={classes.promotionAppBar}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.promotionToolBar}></Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}

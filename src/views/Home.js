import React from "react";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import SearchBar from "material-ui-search-bar";
import shallow from "zustand/shallow";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Collapse,
  Container,
  Box,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: 8,
  },
});

function MyButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

export default function Home() {
  const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return { width };
  };
  const { width } = useViewport();
  const classes = useStyles();
  return (
    <Box height="90vh" display="flex" flexDirection="column">
      <Box
        marginBottom="auto"
        component={Paper}
        bgcolor="rgb(0,172,193)"
        width="100%"
      >
        <Box display="flex">
          <Typography
            variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
            // variant="h1"
            style={{ color: "#ffffff", margin: "auto" }}
          >
            <span style={{ color: "black" }}>SEU</span>ALLEN
          </Typography>
        </Box>
      </Box>
      <GridContainer justify="center" >
        <GridItem xs={6}>
          <SearchBar
          // value={content}
          // placeholder={placeholder}
          // onChange={(v) => {
          //   setContent(v);
          //   console.log(content);
          // }}
          // onCancelSearch={() => {
          //   setContent("");
          // }}
          // onRequestSearch={() => {
          //   if (content === "") console.log(placeholder);
          //   else console.log(content);
          // }}
          />
        </GridItem>
      </GridContainer>
      <span style={{ marginTop: "1vh", marginBottom: "1vh" }} />
      <GridContainer justify="center" >
        <GridItem xs={2}>
          <Link to="/admin/search">
            <MyButton color="red" fullWidth>
              Browse
            </MyButton>
          </Link>
        </GridItem>
        {/* <GridItem xs={1} /> */}
        <GridItem xs={2}>
          <Link to="/admin/workbench">
            <MyButton color="blue" fullWidth>
              Advanced
            </MyButton>
          </Link>
        </GridItem>
      </GridContainer>
      <Box width="100%" marginTop="auto" marginRight="auto">
        <Box marginLeft="2rem">
          <Typography
            variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
            style={{ color: "#f44336"  }}
          >
            Functional
          </Typography>
          <Typography
            variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
            style={{ color: "#ff9800" }}
          >
            Mouse
          </Typography>
          <Typography
            variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
            style={{ color: "#2196f3" }}
          >
            Connectome
          </Typography>
          <Typography
            variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
            style={{ color: "#4caf50" }}
          >
            Database
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

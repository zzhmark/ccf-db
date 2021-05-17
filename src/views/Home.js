import React from "react";

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import SearchBar from "material-ui-search-bar";
import {
  Box,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Zoom,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PaletteIcon from "@material-ui/icons/Palette";
import { useSearch } from "hooks";
import shallow from "zustand/shallow";
import ReplayIcon from "@material-ui/icons/Replay";
import { get_collection_es } from "utils";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CardFooter from "components/Card/CardFooter";
import { atom, useAtom } from "jotai";

import { useViewport } from "utils";

const advPan = atom(0);
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [tog, setTog] = useAtom(advPan);
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const { width } = useViewport();
  const [
    content,
    setContent,
    placeholder,
    setResults,
    advancedContent,
    addAdvancedContent,
    delAdvancedContent,
    setAdvancedContent,
    clearAdvancedContent,
  ] = useSearch(
    (state) => [
      state.content,
      state.setContent,
      state.placeholder,
      state.setResults,
      state.advancedContent,
      state.addAdvancedContent,
      state.delAdvancedContent,
      state.setAdvancedContent,
      state.clearAdvancedContent,
    ],
    shallow
  );

  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <PaletteIcon style={{ marginRight: theme.spacing(1) }} />,
      label: "Advanced",
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <ReplayIcon style={{ marginRight: theme.spacing(3) }} />,
      label: <span style={{ marginRight: theme.spacing(2) }}>Basic</span>,
    },
  ];

  const Title = () => (
    <Box
      marginBottom="auto"
      component={Paper}
      bgcolor="rgb(0,172,193)"
      width="100%"
    >
      <Box display="flex">
        <Typography
          variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
          style={{ color: "#ffffff", margin: "auto" }}
        >
          <span style={{ color: "black" }}>SEU</span>ALLEN
        </Typography>
      </Box>
    </Box>
  );

  const Name = () => (
    <Box width="100%" marginTop="auto" marginRight="auto">
      <Box marginLeft="2rem">
        <Typography
          variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
          style={{ color: "#f44336" }}
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
  );

  const BasicSearch = () => (
    <SearchBar
      value={content}
      placeholder={placeholder}
      onChange={(v) => {
        setContent(v);
      }}
      onCancelSearch={() => {
        setContent("");
      }}
      onRequestSearch={async () => {
        let result;
        if (content === "")
          result = await get_collection_es({
            target: placeholder,
          });
        else
          result = await get_collection_es({
            target: content,
          });
        setResults(result);
        props.history.push("/admin/search");
      }}
    />
  );

  const AdvancedSearch = () => (
    <Card>
      <CardHeader color="primary">
        <Typography variant="h6">Advanced Search</Typography>
      </CardHeader>
      <CardBody>
        <List>
          {advancedContent.map((v, i) => (
            <ListItem key={i}>
              <Grid container justify="space-evenly">
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel id={"inputLabel" + i}>Field</InputLabel>
                    <Select
                      labelId={"inputLabel" + i}
                      id="demo-controlled-open-select"
                      value={v[0]}
                      onChange={(e) => {
                        setAdvancedContent(
                          i,
                          e.target.value,
                          advancedContent[i][1]
                        );
                      }}
                    >
                      <MenuItem value={"title"}>Title</MenuItem>
                      <MenuItem value={"abstract"}>Abstract</MenuItem>
                      <MenuItem value={"assay_type"}>Assay Type</MenuItem>
                      <MenuItem value={"author"}>Author</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    value={v[1]}
                    autoFocus
                    onChange={(e) =>
                      setAdvancedContent(
                        i,
                        advancedContent[i][0],
                        e.target.value
                      )
                    }
                  />
                </Grid>
              </Grid>
              <ListItemSecondaryAction>
                {i > 0 && (
                  <IconButton
                    color="secondary"
                    onClick={() => delAdvancedContent(i)}
                  >
                    <HighlightOffOutlinedIcon />
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <Grid container justify="center">
              <IconButton
                color="primary"
                onClick={() => addAdvancedContent(["", ""])}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>
          </ListItem>
        </List>
      </CardBody>
      <CardFooter>
        <Grid container justify="space-evenly">
          <GridItem xs={6} md={4}>
            <Button
              fullWidth
              color="primary"
              onClick={async () => {
                const result = await get_collection_es({
                  target: advancedContent,
                  mode: "advanced",
                });
                setResults(result);
                props.history.push("/admin/search");
              }}
            >
              Submit
            </Button>
          </GridItem>
          <GridItem xs={6} md={4}>
            <Button
              fullWidth
              color="secondary"
              onClick={() => clearAdvancedContent()}
            >
              Clear
            </Button>
          </GridItem>
        </Grid>
      </CardFooter>
    </Card>
  );

  return (
    <Box height="80vh" display="flex" flexDirection="column">
      <Title />
      <Box margin />
      <GridContainer justify="center">
        <GridItem xs={10} sm={8} md={6} lg={8} xl={6}>
          {tog === 0 ? <BasicSearch /> : <AdvancedSearch />}
        </GridItem>
      </GridContainer>
      <Name />
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={tog === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${tog === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab
            variant="extended"
            aria-label={fab.label}
            className={fab.className}
            color={fab.color}
            onClick={() => setTog(1 - tog)}
          >
            {fab.icon}
            {fab.label}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}

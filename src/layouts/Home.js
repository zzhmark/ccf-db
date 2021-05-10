import React from "react";
import SearchBar from "material-ui-search-bar";
import useSearch from "../hooks/search";
import shallow from "zustand/shallow";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import Viewer from "components/Viewer/BasicViewer";
import routes from "routes.js";
import bgimage from "assets/img/seu_big.jpg";
import { NavLink } from "react-router-dom";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/home" to="/home/welcome" />
  </Switch>
);

export default function Home() {
  const [content, placeholder, setContent, setPlaceholder] = useSearch(
    (state) => [
      state.content,
      state.placeholder,
      state.setContent,
      state.setPlaceholder,
    ],
    shallow
  );
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
  const [advanced, setAdvanced] = React.useState(false);
  const [fd, setFd] = React.useState("");
  return (
    <>
      <Grid container spacing={2} style={{ height: "100vh" }}>
        <Grid
          item
          container
          direction="column"
          justify="space-around"
          style={{ backgroundColor: "rgb(26,30,33)" }}
          xl={4}
          lg={5}
          md={6}
          sm={12}
        >
          <Box margin component={Paper} bgcolor="rgb(0,172,193)">
            <Box display="flex">
              <Typography
                variant={width >= 960 ? (width >= 1280 ? "h1" : "h2") : "h3"}
                style={{ color: "#ffffff", margin: "auto" }}
              >
                <span style={{ color: "black" }}>SEU</span>ALLEN
              </Typography>
            </Box>
          </Box>
          {width >= 960 && (
            <Grid container justify="center">
              <Grid
                item
                style={{ height: width >= 1920 ? "40vh" : "35vh" }}
                xs={11}
              >
                <Viewer />
              </Grid>
            </Grid>
          )}
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="stretch"
          >
            <Box padding>
              <SearchBar
                value={content}
                placeholder={placeholder}
                onChange={(v) => {
                  setContent(v);
                }}
                onCancelSearch={() => {
                  setContent("");
                }}
                onRequestSearch={() => {
                }}
              />
            </Box>
            <Box padding>
              <Grid container spacing={2} justify="center">
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    style={{ padding: "0.7rem" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setAdvanced(!advanced);
                    }}
                  >
                    advanced
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <NavLink
                    to={'/admin/search'}
                    activeClassName="active"
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      style={{ padding: "0.7rem" }}
                      onClick={() => {
                        setAdvanced(!advanced);
                      }}
                    >
                      Browse
                    </Button>
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Box width="100%">
            <Box marginLeft="2rem">
              <Typography
                variant={width >= 960 ? (width >= 1280 ? "h3" : "h4") : "h5"}
                style={{ color: "#eeeeee" }}
              >
                <span style={{ color: "#f44336" }}>F</span>unctional
              </Typography>
              <Typography
                variant={width >= 960 ? (width >= 1280 ? "h3" : "h4") : "h5"}
                style={{ color: "#eeeeee" }}
              >
                <span style={{ color: "#ff9800" }}>M</span>ouse
              </Typography>
              <Typography
                variant={width >= 960 ? (width >= 1280 ? "h3" : "h4") : "h5"}
                style={{ color: "#eeeeee" }}
              >
                <span style={{ color: "#2196f3" }}>C</span>onnectome
              </Typography>
              <Typography
                variant={width >= 960 ? (width >= 1280 ? "h3" : "h4") : "h5"}
                style={{ color: "#eeeeee" }}
              >
                <span style={{ color: "#4caf50" }}>D</span>atabase
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundImage: "url(" + bgimage + ")",
            backgroundPositionY: "45%",
            backgroundSize: "cover",
          }}
          direction="column"
          // spacing={3}
          xl={8}
          lg={7}
          md={6}
          sm={12}
          justify="center"
        >
          {advanced && (
            <Grid container justify="space-around">
              <Grid item md={8}>
                <Card
                  style={{
                    backgroundColor: "#dddddddd",
                  }}
                >
                  <CardHeader
                    title="Advanced Search"
                    titleTypographyProps={{ variant: "h4" }}
                  ></CardHeader>
                  <CardContent>
                    <Grid container justify="space-around">
                      <Grid item xs={2}>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel id="demo-controlled-open-select-label">
                            Field
                          </InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={fd}
                            onChange={setFd}
                          >
                            <MenuItem value="">
                              <em>Title</em>
                            </MenuItem>
                            <MenuItem value={10}>Assay Type</MenuItem>
                            <MenuItem value={20}>Contributor</MenuItem>
                            <MenuItem value={30}>Region</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl style={{ width: "100%" }}>
                          <InputLabel id="demo-controlled-open-select-label">
                            Field
                          </InputLabel>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={fd}
                            onChange={setFd}
                          >
                            <MenuItem value="">
                              <em>Title</em>
                            </MenuItem>
                            <MenuItem value={10}>Assay Type</MenuItem>
                            <MenuItem value={20}>Contributor</MenuItem>
                            <MenuItem value={30}>Region</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}

Home.defaultProps = {
  placeholder: "Search",
};

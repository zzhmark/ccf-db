import React from "react";
import CardBody from "components/Card/CardBody";
import {
  CardActions,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";

// date
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import { useSearch } from "hooks";

export default function FilterCard({ filter }) {
  const [open, setOpen] = React.useState(true);
  let initValue;
  switch (filter.type) {
    case "range[]":
      if (filter.field === "date") {
        initValue = {
          gte: new Date().toJSON().split("T")[0],
          lse: new Date().toJSON().split("T")[0],
        };
        break;
      }
      initValue = { gte: 0, lse: 0 };
      break;
    case "cat":
      initValue = Object.fromEntries(filter.values.map((v) => [v, false]));
      break;
  }
  const [value, setValue] = React.useState(initValue);
  const addChip = useSearch((state) => state.addChip);
  return (
    <>
      <List>
        <ListItem>
          <ListItemText>
            <Typography variant="h6">{filter.title}</Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <Collapse in={open} timeout="auto">
        <CardBody>
          <List>
            {filter.type === "range[]" && (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ListItem>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      id="date-picker-from"
                      label="From"
                      value={value.gte}
                      onChange={(date) => {
                        setValue({
                          ...value,
                          gte: date.toJSON().split("T")[0],
                        });
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      variant="inline"
                      format="yyyy-MM-dd"
                      margin="normal"
                      id="date-picker-to"
                      label="To"
                      value={value.lse}
                      onChange={(date) => {
                        setValue({
                          ...value,
                          lse: date.toJSON().split("T")[0],
                        });
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </ListItem>
              </MuiPickersUtilsProvider>
            )}
            {filter.type === "cat" &&
              filter.values.map((v) => (
                <ListItem>
                  <ListItemText>{v}</ListItemText>
                  <ListItemSecondaryAction>
                    <Checkbox
                      checked={value[v]}
                      name={v}
                      onChange={(e) => {
                        setValue({
                          ...value,
                          [e.target.name]: e.target.checked,
                        });
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </CardBody>
        <CardActions>
          <Grid container justify="flex-end">
            <IconButton
              color="primary"
              onClick={() => {
                addChip(filter.title, filter.type, filter.field, value);
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </CardActions>
      </Collapse>
      <Divider />
    </>
  );
}

import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card";

import styles from "assets/jss/material-kit-react/components/navPillsStyle";
import { atom, useAtom } from "jotai";

// custom components
import ScrollDiv from "components/Custom/ScrollDiv.js";

const useStyles = makeStyles(styles);

const activePill = atom(0);

export default function NavPills(props) {
  const [active, setActive] = useAtom(activePill);
  const handleChange = (event, active) => {
    setActive(active);
  };
  const handleChangeIndex = (index) => {
    setActive(index);
  };
  const classes = useStyles();
  const { tabs, direction, color, horizontal, alignCenter } = props;
  const flexContainerClasses = classNames({
    [classes.flexContainer]: true,
    [classes.horizontalDisplay]: horizontal !== undefined,
  });
  const tabButtons = (
    <Tabs
      classes={{
        root: classes.root,
        fixed: classes.fixed,
        flexContainer: flexContainerClasses,
        indicator: classes.displayNone,
      }}
      value={active}
      onChange={handleChange}
      centered={alignCenter}
    >
      {tabs.map((prop, key) => {
        var icon = {};
        if (prop.tabIcon !== undefined) {
          icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
        }
        const pillsClasses = classNames({
          [classes.pills]: true,
          [classes.horizontalPills]: horizontal !== undefined,
          [classes.pillsWithIcons]: prop.tabIcon !== undefined,
        });
        return (
          <Tab
            label={prop.tabButton}
            key={key}
            {...icon}
            classes={{
              root: pillsClasses,
              selected: classes[color],
              wrapper: classes.tabWrapper,
            }}
          />
        );
      })}
    </Tabs>
  );
  const tabContent = (
    <div className={classes.contentWrapper}>
      <SwipeableViews
        axis={direction === "rtl" ? "x-reverse" : "x"}
        index={active}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((prop, key) => {
          return (
            <Card
              key={key}
              style={{
                backgroundColor: "#ffffff55",
                boderWidth: 2,
                marginTop: "1rem",
              }}
            >
              <CardBody
                style={
                  prop.thinPadding
                    ? {
                        padding: 0,
                      }
                    : {
                        paddingRight: 0,
                      }
                }
              >
                <ScrollDiv
                  className={classes.tabContent}
                  style={{ position: "relative", overflow: "auto" }}
                  key={key}
                >
                  <CardBody
                    style={
                      prop.thinPadding
                        ? {
                            padding: 0,
                          }
                        : {
                            paddingTop: 0,
                            paddingLeft: 0,
                            paddingBottom: 0,
                          }
                    }
                  >
                    {prop.tabContent}
                  </CardBody>
                </ScrollDiv>
              </CardBody>
            </Card>
          );
        })}
      </SwipeableViews>
    </div>
  );
  return horizontal !== undefined ? (
    <GridContainer>
      <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
      <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
    </GridContainer>
  ) : (
    <div>
      {tabButtons}
      {tabContent}
    </div>
  );
}

NavPills.defaultProps = {
  active: 0,
  color: "primary",
};

NavPills.propTypes = {
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node,
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object,
  }),
  alignCenter: PropTypes.bool,
};

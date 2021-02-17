/*
用于查询数据地页面，有两种排列模式
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import ItemCard from "components/Shopping/ItemCard";
import FilterCard from "components/Shopping/FilterCard";
import Container from "@material-ui/core/Container";

let shoppingList = [
  { title: "lkaflk", content: "2019389014809184" },
  { title: "lk222", content: "2019389014809184" },
  { title: "lffffk", content: "2019389014809184" },
  { title: "bbbbbb", content: "2019389014809184" },
  { title: "keimimimim", content: "2019389014809184" },
  { title: "zzhjj", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
  { title: "mei", content: "2019389014809184" },
];

let gridMode = false;

export default function DataBrowse() {
  return (
    <GridContainer>
      {gridMode ? (
        <>
          <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
            <FilterCard title={"Filter"} content={"TODO"}></FilterCard>
          </GridItem>
          {shoppingList.map((prop, key) => {
            return (
              <GridItem xs={12} sm={6} md={6} lg={4} xl={3}>
                <ItemCard title={prop.title} content={prop.content}></ItemCard>
              </GridItem>
            );
          })}
        </>
      ) : (
        <>
          <GridItem xs={12} sm={12} md={7} lg={8} xl={9}>
            <Container maxWidth="lg">
              <GridContainer>
                {shoppingList.map((prop, key) => {
                  return (
                    <GridItem xs={12} sm={12} md={12} lg={12} xl={12}>
                      <ItemCard
                        title={prop.title}
                        content={prop.content}
                      ></ItemCard>
                    </GridItem>
                  );
                })}
              </GridContainer>
            </Container>
          </GridItem>
          <GridItem xs={0} sm={0} md={5} lg={4} xl={3}>
            <Container maxWidth="sm">
              <FilterCard title={"Filter"} content={"TODO"}></FilterCard>
            </Container>
          </GridItem>
        </>
      )}
    </GridContainer>
  );
}

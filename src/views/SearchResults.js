/*
    该页面用于数据库搜索
*/

import React from "react";

// core components
import { List, ListItem } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import SearchBar from "material-ui-search-bar";

// custom components
import ChipsArray from "components/Custom/ChipsArray";
import ItemCard from "components/Custom/ItemCard";
import FilterCard from "components/Custom/FilterCard";

import { useData, useSearch, useStore } from "hooks";
import shallow from "zustand/shallow";

import img from "assets/img/example1.jpg";
import { esGetCollection, getCollection, pushIngredient, searchFilter } from "utils";

export default function SearchResults(props) {
  const setData = useData((state) => state.set);
  const setStore = useStore((state) => state.set);
  const [
    content,
    setContent,
    placeholder,
    setReportId,
    results,
    setResults,
    chips
  ] = useSearch(
    (state) => [
      state.content,
      state.setContent,
      state.placeholder,
      state.setReportId,
      state.results,
      state.setResults,
      state.chips
    ],
    shallow
  );

  return (
    <GridContainer justify="space-evenly">
      <GridContainer item xs={12} sm={4} lg={3} justify="center">
        <GridItem xs={12} xl={10}>
          {searchFilter.map((v, i) => (
            <FilterCard filter={v} key={i} />
          ))}
        </GridItem>
      </GridContainer>
      <GridItem xs={12} sm={8} lg={9}>
        <GridContainer item xs={12} justify="center">
          <GridItem xs={12}>
            <List style={{ width: "100%" }}>
              <ListItem />
              <ListItem>
                <SearchBar
                  style={{ width: "100%" }}
                  value={content}
                  placeholder={placeholder}
                  onChange={(v) => {
                    setContent(v);
                  }}
                  onCancelSearch={() => {
                    setContent("");
                  }}
                  onRequestSearch={() => {
                    if (content === "")
                      esGetCollection({ setResults, target: placeholder });
                    else esGetCollection({ setResults, target: content });
                  }}
                />
              </ListItem>
              <ListItem>
                <ChipsArray />
              </ListItem>
            </List>
          </GridItem>
        </GridContainer>
        <GridContainer>
          {chips
            .reduce((a, b) => a.filter(b.func), results)
            .map((v, i) => (
              <GridItem xs={12} lg={6} xl={4} key={i}>
                <ItemCard
                  title={v["_source"]["title"]}
                  content={v["_source"]["abstract"]}
                  img={img}
                  handleEnter={() => {
                    setReportId(v["_source"]["collection_id"]);
                    props.history.push("/admin/report");
                  }}
                  handleVis={async () => {
                    const { recipe_res } = await getCollection(
                      v["_source"]["collection_id"]
                    );
                    recipe_res.forEach((v) => {
                      v.data["ingredient_id"].forEach((v) =>
                        pushIngredient(v["$oid"], setData)
                      );
                    });
                  }}
                  handleStore={async () => {
                    const { df_res } = await getCollection(
                      v["_source"]["collection_id"]
                    );
                    df_res.forEach((v) => {
                      setStore(v.data.["_id"]["$oid"], v.data);
                    });
                  }}
                />
              </GridItem>
            ))}
        </GridContainer>
      </GridItem>
    </GridContainer>
  );
}

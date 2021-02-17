/*
    该页面用于数据库搜索
*/

import React from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Container from "@material-ui/core/Container";
import SearchBar from "material-ui-search-bar";

export default function DataBrowse() {
  return (
    <GridContainer>
      <GridItem>
        <SearchBar></SearchBar>
      </GridItem>
    </GridContainer>
  );
}

import React from "react";
import styled from "styled-components";
/*
const styles = StyleSheet.create({
  startBtn: {},
});
*/
const Image = styled.img`
  source: {
  }
`;

function Home() {
  return (
    <div id="page-wrapper">
      <div id="coin"></div>
      <div id="rank">
        <li>
          <ul className="tmpList"></ul>
          <ul className="tmpList"></ul>
          <ul className="tmpList"></ul>
        </li>
      </div>
      <div id="myRank">
        <div id="myData"></div>
      </div>
      <div id="start">
        <Image
          //style={start - btn}
          source={"/src/components/icon/homepages/offlineBtn"}
          // setOnclickListener
        ></Image>
        <Image
          //style={start - btn}
          source={"/src/components/icon/homepages/onlineBtn"}
          // setOnclickListener
        ></Image>
      </div>
    </div>
  );
}

export default Home;

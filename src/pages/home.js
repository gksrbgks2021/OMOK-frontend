import React from "react";

const styles = StyleSheet.create({
  startBtn: {},
});

function home() {
  return (
    <div id="page-wrapper">
      <div id="coin>"></div>
      <div id="rank">
        <li>
          <ul className="tmpList"></ul>
          <ul className="tmpList"></ul>
          <ul className="tmpList"></ul>
        </li>
      </div>
      <div id="myRank">
        <div id="mydata"></div>
      </div>
      <div id="start">
        <Image
          style={styles.startBtn}
          source={"/src/components/icon/homepages/offlineBtn"}
          // setOnclickListener
        ></Image>
        <Image
          style={styles.startBtn}
          source={"/src/components/icon/homepages/onlineBtn"}
          // setOnclickListener
        ></Image>
      </div>
    </div>
  );
}

export default home;

import React, { Component } from "react";
import { styled } from "styled-components";
import User from "../components/User";

const RankListStyle = styled.div`
  display: flex;
  flex: column;
  border: 1px black solid;
  width: 100%;
  height: 50%;
`;

const ListPlayer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 10%;
`;

class RankList extends Component {
  render() {
    return (
      <RankListStyle>
        <ListPlayer>
          4
          <User />
        </ListPlayer>
      </RankListStyle>
    );
  }
}

function Rank2() {
  return <RankList />;
}

export default Rank2;

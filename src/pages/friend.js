import React, { Component } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import "./friend.css";
import profilePic from "../components/icon/user-circle.png";
import User from "../components/User";

const TabNav = styled.ul`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  background-color: white;
  padding: 0px;

  .submenu {
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    background-color: lightgrey;
    cursor: pointer;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255, 255, 255);
    // color: rgb(21, 20, 20);
  }
`;

const Option = styled.li`
  flex: 1;
  color: black;
  text-align: center;
  line-height: 40px;
  border: 1px solid black;
  background-color: transparent;
  border-radius: 10px 10px 0px 0px;
  font-weight: bold;
`;

const Desc = styled.div`
  text-align: center;
`;

const TabBack = styled.div`
  background-color: grey;
`;

class SearchUser extends Component {
  render() {
    return (
      <div className="user">
        <User />
        <button className="sButton">send request</button>
      </div>
    );
  }
}

class RequestUser extends Component {
  render() {
    return (
      <div className="user">
        <User />
        <button className="sButton">accept</button>
        <button className="sButton">decline</button>
      </div>
    );
  }
}
const ContentAll = () => {
  return (
    <div>
      <img scr={profilePic} alt=""></img>
      <User />
      <User />
    </div>
  );
};

const ContentSearch = () => {
  return (
    <div id="fSearch">
      <input type="text" placeholder="search name"></input>
      <button id="fButton">Search</button>
      <div id="userBox">
        <SearchUser />
        <SearchUser />
        <SearchUser />
        <SearchUser />
      </div>
    </div>
  );
};

const ContentRequests = () => {
  return (
    <div id="userBox">
      <RequestUser />
      <RequestUser />
      <RequestUser />
      <RequestUser />
      <RequestUser />
    </div>
  );
};

export const Tab = () => {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { name: "All", content: <ContentAll /> },
    { name: "Search", content: <ContentSearch /> },
    { name: "Requests", content: <ContentRequests /> },
  ];

  const selectMenuHandler = (index) => {
    // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
    // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
    clickTab(index);
  };

  return (
    <>
      <div>
        <TabBack>
          <TabNav>
            {menuArr.map((el, index) => (
              <Option
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {el.name}
              </Option>
            ))}
          </TabNav>
        </TabBack>
        <Desc>
          <p>{menuArr[currentTab].content}</p>
        </Desc>
      </div>
    </>
  );
};

export default Tab;

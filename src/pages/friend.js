import React, { Component } from "react";
import { useState } from "react";
import { styled } from "styled-components";
import "../styles/friend.css";
import profilePic from "../components/icon/user-circle.png";
import User from "../components/User";
import NavigationBar from "../NavigationBar.js";
import StatusBar from "../StatusBar.js";

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
    border-bottom: none;
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

const ButtonContainer = styled.button`
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  margin: 0px;
`;
const UserSearchBarDiv = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
`;
const UserSearchInput = styled.input`
  height: 100%;
  width: 60%;
  padding-left: 10px;
`;

class SampleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ButtonContainer onClick={this.props.onClick}>
        {this.props.text}
      </ButtonContainer>
    );
  }
}

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  sendRequestFunction = (e) => {
    console.log("우왕");
    //여기서 API날리면 됨
  };

  render() {
    return (
      <div className="user">
        <User />
        <SampleButton
          text={"send request"}
          onClick={this.sendRequestFunction}
        />
      </div>
    );
  }
}

class RequestUser extends Component {
  acceptFunction = (e) => {
    console.log("우왕 받아줬당");
    //여기서 API날리면 됨
  };
  declineFunction = async (e) => {
    console.log("힝 까였어ㅠ");
    //여기서 API날리면 됨
    //const result = await fetch("https://server.com/api/declineFriendRequest"); 등등..
    //result.then()
  };

  render() {
    return (
      <div className="user">
        <User />
        <SampleButton text={"accept"} onClick={this.acceptFunction} />
        <SampleButton text={"decline"} onClick={this.declineFunction} />
      </div>
    );
  }
}

class ContentSearch extends Component {
  render() {
    return (
      <div id="fSearch">
        <SearchBar />
        <div id="userBox">
          <SearchUser />
          <SearchUser />
          <SearchUser />
          <SearchUser />
        </div>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  SearchName = (e) => {
    console.log("찾아땅!");
    //여기서 API날리면 됨
  };
  render() {
    return (
      <UserSearchBarDiv>
        <UserSearchInput
          type="text"
          placeholder="search name"
        ></UserSearchInput>
        <SampleButton text={"search"} onClick={this.SearchName} />
      </UserSearchBarDiv>
    );
  }
}

class ContentRequests extends Component {
  render() {
    return (
      <div id="requestBox">
        <div id="userBox">
          <RequestUser />
          <RequestUser />
          <RequestUser />
          <RequestUser />
          <RequestUser />
        </div>
      </div>
    );
  }
}

export const Tab = () => {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
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
        <StatusBar />
        <NavigationBar />
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

import { useState } from "react";
import styled from "styled-components";
import moneyImage from "./styles/icon/statusBar/smile.png";

//status bar 전체
const StatBar = styled.div`
  width: 360px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  width: 360px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #ffffff;
`;

//money
const Asset = styled.span`
  height: 30px;
  width: 70px;
  float: right;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-weight: bold;
  //font-family: '폰트 알려주세요'
`;
const Image = styled.img`
  margin-right: auto;
`;

const Name = styled(Asset)`
  float: left;
`;

const StatusBar = () => {
  const initialMoney = 0; // 초기 돈 설정
  const [money, setMoney] = useState(initialMoney);

  // 돈을 업데이트하는 함수(서버에서 계산해서 바로 받아오게 바꿀 예정)
  const updateMoney = (amount) => {
    setMoney(money + amount);
  };

  return (
    <StatBar>
      <Name>user1</Name>
      <Asset>
        <Image src={moneyImage} alt="money" />
        {money}
      </Asset>
    </StatBar>
  );
};

export default StatusBar;

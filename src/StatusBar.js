import { useState } from "react";
import styled from "styled-components";
import moneyImage from "./styles/icon/statusBar/smile.png";
import "./styles/statusBarStyle.css";

//status bar 전체
const StatBar = styled.div`
  text-align: right;
  height: 30px;
  line-height: 30px;
  &.selected {
    font-weight: bold;
  }
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
    <div className="wrapperStat">
      <StatBar>
        <Name>user1</Name>
        <Asset>
          <Image src={moneyImage} alt="money" />
          {money}
        </Asset>
      </StatBar>
    </div>
  );
};

export default StatusBar;

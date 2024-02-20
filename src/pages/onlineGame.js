import {useDispatch, useSelector} from "react-redux";
import GomokuBoard from "../components/GomokuBoard.tsx";
import React from "react";
import "../styles/gameRoom.css";
function OnlineGame() {
    const dispatch = useDispatch();

    return (
        <div className="onlinegame">
            <div className="screen">
                <div id="dino">
                    <div id="user">
                        사용자 1
                    </div>
                        <GomokuBoard/>
                    <div id="user2">
                        사용자 2
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OnlineGame;
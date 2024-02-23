import base64 from "base-64";
import {signupSuccess} from "../stores/AuthReducer";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";

export default function JwtLoginProcess({token}) {
    /*
    1.props 의 data 내용 파싱
    2.redux 에 저장.
     */
    const [t, setT] = useState(null);
    const disaptch = useDispatch();
    const process = ()=>{
        let jwtPayLoad = decodingInfo();
        saveRedux();
        console.log("끝");
    }
    const decodingInfo = (mytoken) => {
        //jwt토큰 디코딩
        let payload = mytoken.substring(mytoken.indexOf('.') + 1, mytoken.lastIndexOf('.'));
        let decodingInfo = base64.decode(payload);
        let decodingInfoJson = JSON.parse(decodingInfo);
        return decodingInfoJson;
    }
    const saveRedux = (data) =>{
        let id = null;
        let email = data.email;
        disaptch(signupSuccess(id, email));
    }
    useEffect(() => {
        if (token) {
            const jwtPayload = decodingInfo(token);
            setT(jwtPayload);
            saveRedux(jwtPayload);
            console.log("끝");
        }
    }, [token]);
    return (
        <>
            {t ? t.email : "No Token Provided"}
        </>
    )
};
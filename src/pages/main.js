import React from "react";
import styled from "styled-components";

const styles = StyleSheet.create({
  container: {},
  mainLogo: {},
  googleLogin: {},
  kakaoLogin: {},
  guestLogin: {},
});

const ImageBtn = styled.button`
  background-image: {
  },
  background-size: cover,
  background-position: center
`;

const displayImage = () => {
  return (
    <>
      <Image
        background-image={"/src/components/icon/mainPage/mainLogo.png"}
      ></Image>
      <Image
        background-image={"/src/components/icon/mainPage/googleLoginBtn.png"}
      ></Image>
      <Image
        background-image={"/src/components/icon/mainPage/kakaoLoginBtn.png"}
      ></Image>
      <Image
        background-image={"/src/components/icon/mainPage/guestLoginBtn.png"}
      ></Image>
    </>
  );
};

export default main;

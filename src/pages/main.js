import React from "react";

const styles = StyleSheet.create({
  container: {},
  mainLogo: {},
  googleLogin: {},
  kakaoLogin: {},
  guestLogin: {},
});

const displayImage = () => {
  return (
    <view style={styles.container}>
      <Image
        style={styles.mainLogo}
        source={"/src/components/icon/mainPage/mainLogo.png"}
      ></Image>
      <Image
        style={styles.googleLogin}
        source={"/src/components/icon/mainPage/googleLoginBtn.png"}
      ></Image>
      <Image
        style={styles.kakaoLogin}
        source={"/src/components/icon/mainPage/kakaoLoginBtn.png"}
      ></Image>
      <Image
        style={styles.guestLogin}
        source={"/src/components/icon/mainPage/guestLoginBtn.png"}
      ></Image>
    </view>
  );
};

export default main;

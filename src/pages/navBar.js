import React from "react";

const styles = StyleSheet.create({
  container: {},
  logos: {},
});

const navBtn = () => {
  return (
    <div style={styles.style}>
      <view style={styles.container}>
        <Image
          style={styles.logos}
          source={"/src/components/icon/mainPage/game.png"}
        ></Image>
        <Image
          style={styles.logos}
          source={"/src/components/icon/mainPage/rank.png"}
        ></Image>
        <Image
          style={styles.logos}
          source={"/src/components/icon/mainPage/friend.png"}
        ></Image>
        <Image
          style={styles.logos}
          source={"/src/components/icon/mainPage/profile.png"}
        ></Image>
      </view>
    </div>
  );
};

export default navBar;

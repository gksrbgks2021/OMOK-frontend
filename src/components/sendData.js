// 서버 엔드포인트 URL
const apiUrl = "https://example.com/api";

const jsonData = {
  key1: "value1",
  key2: "value2",
};

fetch(apiUrl, {
  method: "POST", // 또는 다른 HTTP 메소드를 선택
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(jsonData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("서버 응답:", data);
  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });

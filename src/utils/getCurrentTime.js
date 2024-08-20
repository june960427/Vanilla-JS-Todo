/**
 * 헤더 부분 시계를 위한 유틸 js
 *
 * hour, minute를 string으로 변환 후 자릿 수를 판별하고 해당 요소들의 자릿 수가 1이면  * 앞에 0을 붙혀 리턴
 *
 * 최종적으로 time 리턴
 */

const formatNumber = (num) => num.toString().padStart(2, "0");

const getCurrentTime = () => {
  const date = new Date();

  let currentTime = {
    today: new Date().toISOString().split("T")[0],
    hour: formatNumber(date.getHours()),
    minute: formatNumber(date.getMinutes()),
  };

  const { today, hour, minute } = currentTime;
  return `${today} ${hour}:${minute}`;
};

export default getCurrentTime;

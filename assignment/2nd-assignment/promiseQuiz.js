/* 
온라인이면서 OB인 멤버, YB이면서 오프라인인 멤버 필터링하는 promise chaining 만들기 
단 setTimeout 이용해 비동기적으로 (500ms)
*/
const members = require("./members");

const getOnline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const onlineMember = members.filter((item) => item.location === "online");
      resolve(onlineMember);
    }, 500);
  });
};
const getOffline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const offlineMember = members.filter(
        (item) => item.location !== "online"
      );
      resolve(offlineMember);
    }, 500);
  });
};
const getYB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const YB = members.filter((item) => item.group === "YB");
      resolve(YB);
    }, 500);
  });
};
const getOB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const OB = members.filter((item) => item.group === "OB");
      resolve(OB);
    }, 500);
  });
};

// promise chaining
getOnline(members)
  .then((result) => getOB(result))
  .then((result) => console.log("온라인 + OB인 사람들", result));
getYB(members)
  .then((result) => getOffline(result))
  .then((result) => console.log("YB + 오프라인인 사람들", result));

//async await
const asyncGetOnlineOB = async (members) => {
  const onlineMember = await getOnline(members);
  const onlineOB = await getOB(onlineMember);
  console.log("async/await 온라인 + OB인 사람들", onlineOB);
};

const asyncGetOfflineYB = async (members) => {
  const offlineMember = await getOffline(members);
  const offlineYB = await getYB(offlineMember);
  console.log("async/await YB + 오프라인인 사람들", offlineYB);
};

asyncGetOnlineOB(members);
asyncGetOfflineYB(members);

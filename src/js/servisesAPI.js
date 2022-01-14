import axios from 'axios';

function getUserId() {
  const USER_ID = localStorage.getItem('userID');
  return USER_ID;
}

async function userInfo(id) {
  const data = await axios.get(
    `https://team-project-1da18-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
  );
  const dadaUser = data.data;
  return dadaUser;

  console.log(dadaUser); // удалить
}

export { userInfo, getUserId};

import '../pages/index.css';
import 'core-js/es/symbol';

import UserInfo from '../components/UserInfo';
import { api } from "../components/Api";
//===================================================================
let user
const userInfo = new UserInfo({
  nameInput: '.profile__title',
  aboutInput: '.profile__subtitle',
  avatarLink: '.profile__avatar'
});

Promise.all([api.getInfoProfile(), api.getInitialCards()])
.then(([userData, cards]) => {
  user = userData;
  userInfo.addUserInfo(user);
})






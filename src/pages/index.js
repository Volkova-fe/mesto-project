import '../pages/index.css';
import 'core-js/es/symbol';

import UserInfo from '../components/UserInfo';
import { api } from "../components/Api";
import Section from "../components/Section"
import Card from "../components/Сard"
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
    cardList.renderItems(cards);
  })


const cardList = new Section(
  {
    renderer: (item) => renderCard(item),
  },
  '.cards__container'
);

function renderCard(item) {
  const newCard = new Card(item, { selector: '#cards__template' }).generateCard();
  return newCard;
}

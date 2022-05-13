export default class UserInfo {
  constructor({ nameInput, aboutInput, avatarLink }) {
    this._nameInput = document.querySelector(nameInput);
    this._aboutInput = document.querySelector(aboutInput);
    this._avatarLink = document.querySelector(avatarLink);
  };

  getUserInfo() {
    return {
      name: this._nameInput.textContent,
      about: this._aboutInput.textContent,
      avatarLink: this._avatarLink.src
    }
  };
  
  addUserInfo(data) {
    this._nameInput.textContent = data.name;
    this._aboutInput.textContent = data.about;
    this._avatarLink.src = data.avatar;
  };
}

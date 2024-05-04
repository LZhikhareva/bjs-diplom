'use strict';
let logOutButton = new LogoutButton();
logOutButton.action = function () {
  ApiConnector.logout(serverResponse => {
    if (serverResponse.success) {
      location.reload();
    }
  }
  )
}



ApiConnector.current(serverResponse => {
  if (serverResponse.success) {
    ProfileWidget.showProfile(serverResponse.data);
  }
});

const ratesBoard = new RatesBoard();
let getCurrency = function () {
  ApiConnector.getStocks(serverResponse => {
    if (serverResponse.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(serverResponse.data);
    }
  });
}

getCurrency();
setInterval(getCurrency, 60000);


let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, serverResponse => {
    if (serverResponse.success) {
      ProfileWidget.showProfile(serverResponse.data);
      this.setMessage(true, 'Пополнение прошло успешно!')
    } else {
      this.setMessage(false, 'Ошибка пополнения баланса! ' + serverResponse.error);
    }
  })
}

moneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, serverResponse => {
    if (serverResponse.success) {
      ProfileWidget.showProfile(serverResponse.data);
      this.setMessage(true, 'Конвертация прошла успешно!')
    } else {
      this.setMessage(false, 'Ошибка конвертации! ' + serverResponse.error)
    }
  })
}

moneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, serverResponse => {
    if (serverResponse.success) {
      ProfileWidget.showProfile(serverResponse.data);
      this.setMessage(true, 'Перевод денежных средств осуществлен успешно!')
    } else {
      this.setMessage(false, 'Ошибка перевода средств! ' + serverResponse.error);
    }
  })
}


let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(serverResponse => {
  if (serverResponse.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(serverResponse.data);
    moneyManager.updateUsersList(serverResponse.data);

  }
});

favoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, serverResponse => {
    if (serverResponse.success) {
      this.clearTable();
      this.fillTable(serverResponse.data);
      moneyManager.updateUsersList(serverResponse.data);
      this.setMessage(true, 'Пользователь добавлен в избранное!');
    } else {
      this.setMessage(false, 'Ошибка добавления пользователя в избранное! ' + serverResponse.error);
    }
  })
}

favoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, serverResponse => {
    if (serverResponse.success) {
      this.clearTable();
      this.fillTable(serverResponse.data);
      moneyManager.updateUsersList(serverResponse.data);
      this.setMessage(true, 'Пользователь удален из избранного!');
    } else {
      this.setMessage(false, 'Ошибка удаления пользователя из избранного! ' + serverResponse.error);
    }
  })
}
/**
 * Основной класс приложения.
 * @type {App}
 */
var App = Router.extend({

  /**
   * Коллекция маршрутов приложения.
   * @type {Object}
   */
  routes: {"*url": "_overwise"},

  /**
   * Адрес домашней страницы приложения.
   * @type {String}
   */
  homePage: "#/home",

  /**
   * Адрес страницы ошибки приложения.
   * @type {String}
   */
  errorPage: "#/error",

  /**
   * Экран приложения.
   * @type {Screen}
   */
  screen: null,

  /**
   * Коллекция роутеров приложения.
   * @type {[type]}
   */
  routers: null,

  /**
   * Запуск приложения.
   */
  start: function() {
    this.screen = new Screen();
    this.routers = {
      static: new StaticRouter(),
      about: new AboutRouter()
    };
    Backbone.history.start();
  },

  /**
   * Подменяет текущую страницу страницей ошибки.
   */
  toError: function() {
    this.navigate(this.errorPage, {trigger: true, replace: true});
  },

  /**
   * Обработчик неизвестных адресов.
   * @param {String} url Неизвестный адрес.
   */
  _overwise: function(url) {
    var params = {trigger: true, replace: true};
    if (url) this.navigate(this.errorPage, params);
    else this.navigate(this.homePage, params);
  }
  
});
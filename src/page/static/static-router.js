/**
 * Роутер статических страниц.
 * @type {StaticRouter}
 */
var StaticRouter = Router.extend({

  /**
   * Маршруты роутера.
   * @type {Object}
   */
  routes: {
    "contacts": "_contacts",
    "projects": "_projects",
    "error": "_error",
    "home": "_home"
  },

  /**
   * Коллекция параметров страниц.
   * @type {Object}
   */
  _params: {
    "HomePage": {
      title: "Главная",
      type: "top-left"
    },
    "ContactsPage": {
      title: "Контакты",
      type: "top-right"
    },
    "ProjectsPage": {
      title: "Проекты",
      type: "bottom-right"
    },
    "ErrorPage": {
      title: "Ошибка",
      type: "bottom"
    },
    "AboutPage": {
      title: "Обо мне",
      type: "bottom-left"
    }
  },

  /**
   * Кэш загруженных страниц.
   * @type {Object}
   */
  _cache: null,

  /**
   * Создает экземпляр класса.
   * @return {StaticRouter}
   */
  constructor: function() {
    Router.prototype.constructor.apply(this, arguments);
    this._cache = {};
  },

  /**
   * Загружает статическую страницу.
   * @param  {String} name Имя статической страницы.
   */
  _static: function(name) {
    var page = this._cache[name];
    if (page == null) {
      page = new StaticPage(name);
      page.render();
      this._cache[name] = page;
    }
    app.screen.page(page, this._params[name]);
  },

  /**
   * Страница контактов.
   */
  _contacts: function() {
    this._static("ContactsPage");
  },

  /**
   * Страница проектов.
   */
  _projects: function() {
    this._static("ProjectsPage");
  },

  /**
   * Страница "обо мне".
   */
  _about: function() {
    this._static("AboutPage");
  },

  /**
   * Страница ошибки.
   */
  _error: function() {
    this._static("ErrorPage");
  },

  /**
   * Главная страница.
   */
  _home: function() {
    this._static("HomePage");
  }
});
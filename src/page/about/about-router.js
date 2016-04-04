/**
 * Роутер страницы "Обо мне".
 * @type {AboutRouter}
 */
var AboutRouter = Router.extend({

  /**
   * Маршруты роутера.
   * @type {Object}
   */
  routes: {
    "about(/:section)": "_index"
  },

  /**
   * Коллекция разделов страницы.
   * @type {Object}
   */
  _sections: {
    "education": "Образование",
    "experience": "Опыт работы",
    "perspectives": "Интересы",
    "frontend": "Фронтенд",
    "backend": "Бэкенд",
    "other": "Прочее"
  },

  /**
   * Представление страницы.
   * @type {AboutPage}
   */
  _page: null,

  /**
   * Детально обрабатывает маршруты приложения.
   * @param  {String} section Название секции страницы.
   */
  _index: function(section) {
    section = section || (this._page ? this._page.active : "education");
    var title = this._sections[section];
    if (title == null) {
      app.toError();
      return;
    }
    if (this._page == null) {
      this._page = new AboutPage();
      this._page.render();
    }
    var titleApp = "Обо мне - " + title;
    app.screen.page(this._page, {type: "bottom-left", title: titleApp});
    this._page.setSection(section);
  }

});
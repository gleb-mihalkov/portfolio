/**
 * Представление страницы "Обо мне".
 * @type {AboutPage}
 */
var AboutPage = Page.extend({

  /**
   * Шаблон представления.
   * @type {String}
   */
  template: "AboutPage",

  /**
   * Время смены секций.
   * @type {Number}
   */
  fadeTime: 500,

  /**
   * Коллекция ссылок на секции.
   * @type {Object}
   */
  _links: null,

  /**
   * Коллекция секций.
   * @type {Object}
   */
  _sections: null,

  /**
   * Активирует представление.
   */
  activate: function() {
    Page.prototype.activate.apply(this, arguments);
    this._links = {
      "education": this.host.find(".about-page-nav__link--education"),
      "experience": this.host.find(".about-page-nav__link--experience"),
      "perspectives": this.host.find(".about-page-nav__link--perspectives"),
      "backend": this.host.find(".about-page-nav__link--backend"),
      "frontend": this.host.find(".about-page-nav__link--frontend"),
      "other": this.host.find(".about-page-nav__link--other")
    };
    this._sections = {
      "education": this.host.find(".about-page-content__inner--education"),
      "experience": this.host.find(".about-page-content__inner--experience"),
      "perspectives": this.host.find(".about-page-content__inner--perspectives"),
      "backend": this.host.find(".about-page-content__inner--backend"),
      "frontend": this.host.find(".about-page-content__inner--frontend"),
      "other": this.host.find(".about-page-content__inner--other")
    };
  },

  /**
   * Название активной секции.
   * @type {String}
   */
  active: null,

  /**
   * Показывает, заблокированы ли ссылки.
   * @type {Boolean}
   */
  _isDisabled: false,

  /**
   * Делает активной указанную секцию.
   * @param {String} section Название секции.
   */
  setSection: function(section) {
    if (section === this.active) return;
    var content = this._sections[section];
    var link = this._links[section];
    if (link == null || content == null) return;
    var contentPrev = this._sections[this.active];
    var linkPrev = this._links[this.active];
    if (contentPrev && linkPrev) {
      contentPrev.removeClass("about-page-content__inner--active");
      linkPrev.removeClass("about-page-nav__link--active");
    }
    content.addClass("about-page-content__inner--active");
    link.addClass("about-page-nav__link--active");
    this._linksDisable();
    var enable = this.callback("_linksEnable");
    setTimeout(enable, this._fadeTime);
    this.active = section;
  },

  /**
   * Блокирует нажатие ссылок.
   */
  _linksDisable: function() {
    this._isDisabled = true;
  },

  /**
   * Разблокирует нажатие ссылок.
   */
  _linksEnable: function() {
    this._isDisabled = false;
  },

  /**
   * Обрабатывает нажатие на ссылку.
   * @param  {MouseEvent} e Событие нажатия на ссылку.
   */
  _linksPrevent: function(e) {
    if (this._isDisabled) e.preventDefault();
  }

});
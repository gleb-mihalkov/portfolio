/**
 * Экран приложения.
 * @type {Screen}
 */
var Screen = View.extend({

  /**
   * Хост представления.
   * @type {String}
   */
  host: ".screen",

  /**
   * Карточка со страницами.
   * @type {Card}
   */
  _card: null,

  /**
   * Область навигации.
   * @type {jQuery}
   */
  _nav: null,

  /**
   * События представления.
   * @type {Object}
   */
  events: {
    "click .screen__link": "_linkSelect"
  },

  /**
   * Создает экземпляр класса.
   * @return {Screen}
   */
  constructor: function() {
    View.prototype.constructor.apply(this, arguments);
    this._nav = this.host.find(".screen__nav");
    this._card = new Card();
    this.listenTo(this._card, "flipstart", this._flipstart);
    this.listenTo(this._card, "flipend", this._flipend);
  },

  /**
   * Задает текущую страницу.
   * @param {Page}   page   Представление страницы.
   * @param {Object} params Параметры отображения страницы.
   */
  page: function(page, params) {
    params = _.defaults(params || {}, {
      type: null,
      title: ""
    });
    document.title = params.title;
    this._card.setPage(page, params.type);
    this._setLink(params.type);
  },

  /**
   * Показывает, заблокированы ли ссылки в данный момент.
   * @type {Boolean}
   */
  _isLinksDisabled: false,

  /**
   * Обработчик начала вращения карточки.
   */
  _flipstart: function() {
    this._nav.addClass("screen__nav--disabled");
    this._isLinksDisabled = true;
  },

  /**
   * Обработчик конца вращения карточки.
   */
  _flipend: function() {
    this._nav.removeClass("screen__nav--disabled");
    this._isLinksDisabled = false;
  },

  /**
   * Обработчик события нажатия на ссылку.
   * @param {MouseEvent} e Событие нажатия на ссылку.
   */
  _linkSelect: function(e) {
    if (this._isLinksDisabled) e.preventDefault();
  },

  /**
   * Предыдущая активная ссылка.
   * @type {jQuery}
   */
  _linkActive: null,

  /**
   * Устанавливает в качестве активной указанную ссылку.
   * @param {String} type Тип ссылки.
   */
  _setLink: function(type) {
    var classTrigger = "screen__link--active";
    if (this._linkActive != null) {
      this._linkActive.removeClass(classTrigger);
      this._linkActive = null;
    }
    if (type == null) return;
    var selector = ".screen__link--" + type;
    var link = this.host.find(selector);
    link.addClass(classTrigger);
    this._linkActive = link;
  }
  
});
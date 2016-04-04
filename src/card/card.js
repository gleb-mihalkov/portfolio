/**
 * Карточка.
 * @type {Card}
 */
var Card = View.extend({

  /**
   * Хост представления.
   * @type {String}
   */
  host: ".card",

  /**
   * Время анимации поворота карточки.
   * @type {Number}
   */
  _flipTime: 1000,

  /**
   * Тип выполняющейся анимации поворота карты.
   * @type {String}
   */
  _flipType: null,

  /**
   * Лицевая сторона карточки.
   * @type {jQuery}
   */
  _frontface: null,

  /**
   * Обратная сторона карточки.
   * @type {jQuery}
   */
  _backface: null,

  /**
   * Текущая страница.
   * @type {Page}
   */
  _page: null,

  /**
   * Создает экземпляр класса.
   * @return {Card}
   */
  constructor: function() {
    View.prototype.constructor.apply(this, arguments);
    this._frontface = this.host.find(".card__frontface");
    this._backface = this.host.find(".card__backface");
  },

  /**
   * Задает представление лицевой стороны карточки.
   * @param {Page}   page     Страница.
   * @param {String} flipType Тип вращения для перехода к странице.
   */
  setPage: function(page, flipType) {
    if (this._page === page) return;
    if (this._page == null) this._frontface.append(page.host);
    else {
      this._backface.empty();
      this._backface.append(page.host);
      this._flip(flipType);
    }
    this._page = page;
  },

  /**
   * Переворачивает карточку с указанной анимацией.
   * @param {String} type Тип поворота карточки.
   */
  _flip: function(type) {
    this.trigger("flipstart");
    var finish = this.callback("_faceChange");
    this._flipType = "card--flip-" + type;
    this.host.addClass(this._flipType);
    setTimeout(finish, this._flipTime);
  },

  /**
   * Меняет местами лицевую и обратную сторону карточки.
   */
  _faceChange: function() {
    this._frontface.removeClass("card__frontface");
    this._frontface.addClass("card__backface");
    this._backface.removeClass("card__backface");
    this._backface.addClass("card__frontface");
    this.host.removeClass(this._flipType);
    this._flipType = null;
    var temp = this._backface;
    this._backface = this._frontface;
    this._frontface = temp;
    this.trigger("flipend");
  }
  
});
/**
 * Базовый класс страницы.
 * @type {Page}
 */
var Page = View.extend({

  /**
   * Имя класса представления.
   * @type {String}
   */
  className: "page",

  /**
   * Активирует представление.
   */
  activate: function() {},

  /**
   * Вызывает отрисовку представления.
   */
  render: function() {
    if (this._template == null) {
      if (this.template == null) return;
      var code = $("#" + this.template).html();
      this._template = _.template(code);
    }
    var output = this._template();
    this.host.html(output);
    this.activate();
  }
});
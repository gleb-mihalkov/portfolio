/**
 * Представление информационной страницы с отцентрованным содержимым.
 * @type {StaticPage}
 */
var StaticPage = Page.extend({

  /**
   * Создает экземпляр класса.
   * @param  {String} template Имя шаблона страницы.
   * @return {StaticPage}
   */
  constructor: function(template) {
    Page.prototype.constructor.apply(this, arguments);
    this.template = template;
  }

});
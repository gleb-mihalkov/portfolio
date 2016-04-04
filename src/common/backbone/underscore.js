/**
 * Расширения для Underscore.js.
 */
_.mixin({

  /**
   * Показывает, является ли переданный объект набором jQuery.
   * @param  {Object}  object Объект для проверки.
   * @return {Boolean}        True или false.
   */
  isQuery: function(object) {
    return object instanceof jQuery;
  }
});
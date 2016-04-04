/**
 * Базовый класс представления.
 * @type {View}
 */
var View = (function() {

  /**
   * Наследует имена классов родительского класса.
   * @param {Object} parent Прототип родительского класса.
   * @param {Object} proto  Прототип наследуемого класса.
   */
  function extendClassName(parent, proto) {
    var isClassName = parent.className && _.isString(parent.className) && (
      proto.className == null || _.isString(proto.className)
    );
    if (!isClassName) return;
    proto.className = proto.className || "";
    var parentNames = parent.className.split(" ");
    var protoNames = proto.className.split(" ");
    protoNames = _.union(protoNames, parentNames);
    protoNames = _.compact(protoNames);
    proto.className = protoNames.join(" ");
  }

  /**
   * Наследует события родительского класса.
   * @param {Object} parent Прототип родительского класса.
   * @param {Object} proto  Прототип наследуемого класса.
   */
  function extendEvents(parent, proto) {
    var isEvents = parent.events && !_.isFunction(parent.events) && (
      proto.events == null || !_.isFunction(proto.events)
    );
    if (!isEvents) return;
    proto.events = proto.events || {};
    proto.events = _.defaults(proto.events, parent.events);
  }

  /**
   * Экспорт класса.
   */
  return Backbone.View.extend({

    /**
     * Хост представления.
     * @type {String|HtmlNode|jQuery}
     */
    host: null,

    /**
     * Создает экземпляр класса.
     * @return {View}
     */
    constructor: function() {
      if (this.host) {
        if (_.isString(this.host)) this.el = $(this.host).get(0);
        if (_.isElement(this.host)) this.el = this.host;
        if (_.isQuery(this.host)) this.el = this.host.get(0);
      }
      Backbone.View.prototype.constructor.apply(this, arguments);
      this.host = this.$el;
    },

    /**
     * Получает коллбек, созданный на основе метода класса.
     * @param  {String}   name Имя метода класса для создания коллбека.
     * @return {Function}      Функция коллбек.
     */
    callback: function(name) {
      this._callbacks = this._callbacks || {};
      var func = this._callbacks[name];
      if (func) return func;
      this._callbacks[name] = func = _.bind(this[name], this);
      return func;
    }

  }, {

    /**
     * Перегрузка метода наследования от представления.
     * @param  {Object} proto Прототип класса.
     * @param  {Object} stat  Статические свойства класса.
     * @return {View}         Унаследованный класс.
     */
    extend: function(proto, stat) {
      var parent = this.prototype;
      extendClassName(parent, proto);
      extendEvents(parent, proto);
      return Backbone.View.extend.call(this, proto, stat);
    }
  });
})();
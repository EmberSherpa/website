import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: [':parallax-window', 'backgroundColor'],

  parallaxId() {
    return `parallax-window-${this.elementId}`;
  },

  parallax() {
    let plxBackground           = this.$('#js-parallax-background');
    let plxWindowTopToPageTop   = this.$().offset().top;
    let windowTopToPageTop      = Ember.$(window).scrollTop();
    let plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;
    let plxSpeed                = 0.25;
    let topOffset               = -(plxWindowTopToWindowTop * plxSpeed);

    plxBackground.css('top',  `${topOffset}px`);
  },

  didInsertElement() {
    this.parallax();
    Ember.$(window).on(`scroll.${this.parallaxId}`, () => this.parallax());
  },

  willDestroyElement() {
    Ember.$(window).off(`scroll.${this.parallaxId}`);
  }
});

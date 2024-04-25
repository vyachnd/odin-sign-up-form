/*
  --------------------------------------------------------------------------------------------------
  SETTINGS
  --------------------------------------------------------------------------------------------------
  Icon                        String
  Title                       String
  Variant                     'base', 'secondary', 'warning', 'error', 'submit'
*/

import CreateElement from '../../createElement.js';
import { CEIcon } from '../init.js';

class CEHeading extends CreateElement {
  constructor(settings, attributes) {
    super(
      'div',
      attributes,
      [
        (settings?.icon ? new CEIcon(settings?.icon, { fill: true, type: 'rounded' }, { class: ['ce-heading__icon'] }) : null),
        new CreateElement('div', { class: ['ce-heading__container'] }, [
          new CreateElement('h1', { class: ['ce-heading__title'] }, [settings?.title || 'Title']),
          new CreateElement('p', { class: ['ce-heading__subtitle'] }, [
            'by ',
            new CreateElement('a', { href: 'https://www.github.com/vyachnd', target: '_blank', class: ['ce-heading__link'] }, ['vyachnd']),
          ]),
        ],)
      ].filter((child) => child),
    );

    this.settings = {};

    this.setSettings(settings || {});
  }

  setSettings(settings) {
    this.updateAttributes({
      ...this.attributes,
      class: [...(this.attributes.class || []), 'ce-heading'],
      dataset: { ...settings },
    });

    this.settings = settings;
  }
}

export default CEHeading;

import helpers from '../../../libraries/helpers.js';
import CreateElement from '../../createElement.js';
import { CEButton, CEIcon } from '../init.js';

class CECheckbox extends CreateElement {
  constructor(children, settings, attributes, events) {
    super('label', attributes, [], events);

    this.checkboxInput = new CreateElement(
      'input',
      { type: 'checkbox', class: ['ce-checkbox__input'] },
      [],
      [
        ['change', (event) => { this.setSettings({ ...this.settings, checked: event.target.checked }); }],
      ],
    );
    this.checkboxButton = new CEButton(
      [new CEIcon('check', {}, { class: ['ce-checkbox__icon'] })],
      {},
      { class: ['ce-checkbox__button'] },
      [
        ['click', () => { this.setSettings({ ...this.settings, checked: !this.checkboxInput.attributes.checked }); }]
      ],
    );
    this.checkboxLabel = new CreateElement('span', { class: ['ce-checkbox__label'] });

    this.settings = {};

    this.setSettings(settings || {});
    this.setChildren(children || []);
  }

  setSettings(settings) {
    this.checkboxInput.updateAttributes({
      ...this.checkboxInput.attributes,
      required: Boolean(settings?.required),
      checked: settings?.checked,
    });

    this.checkboxButton.setSettings({
      ...(helpers.removeKey(settings, ['checked', 'required'])),
      boxed: true,
      size: 'xs',
      transparent: !settings?.checked,
      active: settings?.checked,
    });

    this.updateAttributes({
      ...this.attributes,
      class: [...(this.attributes?.class || []), 'ce-checkbox'],
      dataset: { ...settings },
      disabled: Boolean(settings?.disabled),
    });

    this.settings = settings;
  }

  setChildren(children) {
    this.checkboxLabel.updateChildren(children);

    this.updateChildren([
      this.checkboxInput,
      this.checkboxButton,
      (children.length > 0 ? this.checkboxLabel : null)
    ]);
  }
}

export default CECheckbox;

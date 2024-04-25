/*
  --------------------------------------------------------------------------------------------------
  SETTINGS
  --------------------------------------------------------------------------------------------------
  Size                        'base'
  Variant                     'base', 'secondary'
  Darkened                    Boolean
  Bordered                    Boolean
  Rounded                     Boolean
  Disabled                    Boolean
  --------------------------------------------------------------------------------------------------
  INPUT FIELD
  --------------------------------------------------------------------------------------------------
  Value                       String
  Placeholder                 String
  For                         String
*/

import helpers from '../../../libraries/helpers.js';
import CreateElement from '../../createElement.js';
import { CEButton, CEIcon } from '../init.js';

class CEInputText extends CreateElement {
  constructor(children, settings, attributes, events) {
    super('div', attributes, [], events);

    this.inputChild = new CreateElement('input', {
      type: 'text',
      class: ['ce-input__field'],
    });

    Object.defineProperty(this.element, 'value', {
      get: () => { return this.value; },
      set: (value) => { this.value = value; },
    });

    this.settings = {};

    this.setSettings(settings || {});
    this.setChildren(children || []);
  }

  get value() { return this.inputChild.element.value; }
  set value(value) { this.setSettings({ ...this.settings, value }); }

  setSettings(settings) {
    const inputKeys = ['value', 'placeholder', 'for', 'required', 'id', 'name'];

    this.inputChild.updateAttributes({
      ...this.inputChild.attributes,
      ...helpers.removeKey(settings, inputKeys, true),
    });
    this.inputChild.element.value = settings?.value || '';

    this.updateAttributes({
      ...this.attributes,
      class: [...(this.attributes?.class || []), 'ce-input'],
      dataset: {
        fill: true,
        ...helpers.removeKey(settings, inputKeys),
      },
      disabled: Boolean(settings?.disabled),
    });

    for (const child of this.children) {
      if (child instanceof CEButton) {
        child.setSettings({
          ...child.settings,
          variant: settings?.variant,
          rounded: settings?.rounded,
        });
      }
    }

    this.settings = settings;
  }

  setChildren(children) {
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];

      if (child instanceof CEIcon) {
        child.updateAttributes({
          ...child.attributes,
          class: [...(child.attributes?.class || []), 'ce-input__icon'],
        });
      } else if (child instanceof CEButton) {
        child.updateAttributes({
          ...child.attributes,
          class: [...(child.attributes?.class || []), 'ce-input__button'],
        });

        child.setSettings({
          ...child.settings,
          variant: this.settings?.variant,
          rounded: this.settings?.rounded,
        });
      }
    }

    let newChildren = [...children];
    newChildren.splice(1, 0, this.inputChild);
    newChildren = newChildren.filter((child) => child);

    this.updateChildren(newChildren);

    this.children = newChildren;
  }
}

export default CEInputText;

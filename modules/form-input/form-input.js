import helpers from '../../libraries/helpers.js';
import CreateElement from '../createElement.js';
import CEInputText from '../custom-elements/input-text/inputText.js';

class FormInput extends CreateElement {
  constructor(label, settings, inputChildren) {
    super('label');

    this.input = new CEInputText(inputChildren || [], { darkened: true, bordered: true }, { class: ['form-input__input'] });
    this.settings = {};

    this.setSettings(settings || {});
    this.updateChildren([label, this.input]);
  }

  setSettings(settings) {
    this.input.setSettings({
      ...this.input.settings,
      ...helpers.removeKey(settings, ['for']),
      id: settings?.for,
    });

    this.updateAttributes({
      ...this.attributes,
      class: [...(this.attributes?.class || []), 'form-input'],
      for: settings?.for,
      form: settings?.form,
    });

    this.settings = settings;
  }
}

export default FormInput;

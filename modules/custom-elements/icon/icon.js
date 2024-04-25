/*
  --------------------------------------------------------------------------------------------------
  ICON
  --------------------------------------------------------------------------------------------------
  Icon                        String
  --------------------------------------------------------------------------------------------------
  SETTINGS
  --------------------------------------------------------------------------------------------------
  Type                        'outlined', 'rounded', 'sharp'
  Wght                        100, 200, 300, 400, 500, 600, 780
  Grade                       -25, 0, 200
  Opsz                        20, 24, 40, 48
  Fill                        Boolean
*/

import CreateElement from '../../createElement.js';

class CEIcon extends CreateElement {
  constructor(icon, settings, attributes) {
    super('span', attributes);

    this.icon = '';
    this.settings = {};

    this.setSettings(settings || {});
    this.setIcon(icon);
  }

  setSettings(settings) {
    const fontVariationSettings = `
      'FILL' ${+settings?.fill || 0},
      'wght' ${settings?.wght || 400},
      'GRAD' ${settings?.grad || 0},
      'opsz' ${settings?.opsz || 24}
    `;

    this.updateAttributes({
      ...this.attributes,
      class: [...(this.attributes?.class || []), 'ce-icon'],
      dataset: { ...(this.attributes.dataset || {}), type: settings?.type || 'outlined' },
      style: { fontVariationSettings },
    });

    this.settings = settings;
  }

  setIcon(icon) {
    this.updateChildren([icon]);

    this.icon = icon;
  }
}

export default CEIcon;

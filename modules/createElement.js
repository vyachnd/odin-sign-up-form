import helpers from '../libraries/helpers.js';
import Emitter from './emitter.js';

class CreateElement {
  constructor(tagName, attributes, children, events) {
    this.element = document.createElement(tagName || 'div');
    this.attributes = {};
    this.children = [];
    this.events = [];
    this.emitter = new Emitter();

    this.updateChildren(children || []);
    this.updateAttributes(attributes || {});
    this.updateEvents(events || []);
  }

  // Start HTMLElement methods
  remove() { this.unmount(); }

  replaceWith(element) { this.element.replaceWith(element); }

  removeEventListener(eventName, callback, options) {
    const eventDataIndex = this.events.indexOf([eventName, callback, options]);

    if (eventDataIndex !== -1) this.events.splice(eventDataIndex, 1);

    this.element.removeEventListener(eventName, callback, options);
  };

  addEventListener(eventName, callback, options) {
    const eventDataIndex = this.events.indexOf([eventName, callback, options]);

    if (eventDataIndex === -1) {
      this.events.push([eventName, callback, options]);
      this.element.addEventListener(eventName, callback, options);
    }
  };
  // End HTMLElement methods

  updateChildren(children) {
    const oldNodes = Array.from(this.element.childNodes);

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const oldChild = this.children[i];
      const oldNode = oldNodes[i];

      if (oldNode && (oldChild !== child)) {
        if (child instanceof CreateElement) {
          child.mount(this.element);
          oldNode.replaceWith(child.element);
        } else if (child instanceof HTMLElement) {
          oldNode.replaceWith(child);
        } else if (typeof child === 'string') {
          console.log(child, oldChild);
          oldNode.replaceWith(
            document.createTextNode(
              new String(child).replaceAll(/&.+;/g, (match) => helpers.htmlEntityToUnicode(match))
            )
          );
        }

        if (oldChild instanceof CreateElement) oldChild.unmount();
      } else if (!oldChild) {
        if (child instanceof CreateElement) child.mount(this.element);
        if (child instanceof HTMLElement) this.element.append(child);
        if (typeof child === 'string') {
          this.element.append(
            document.createTextNode(
              new String(child).replaceAll(/&.+;/g, (match) => helpers.htmlEntityToUnicode(match))
            )
          );
        }
      }
    }

    for (let i = children.length; i < oldNodes.length; i += 1) {
      oldNodes[i].remove();
    }

    this.children = children;
  }

  updateAttributes(attributes = {}) {
    const attributesKeys = Object.keys(attributes);
    const oldAttributesKeys = Object.keys(this.attributes);

    for (let i = 0; i < attributesKeys.length; i += 1) {
      const attributeKey = attributesKeys[i];
      const attributeValue = attributes[attributeKey];
      const oldAttribute = this.attributes[attributeKey];

      if (attributeKey === 'class') {
        const classList = attributeValue;

        if (classList.length > 0) this.element.classList.add(...classList);
      } else if (attributeKey === 'style') {
        const styleKeys = Object.keys(attributeValue);

        for (let j = 0; j < styleKeys.length; j += 1) {
          const styleKey = styleKeys[j];
          const styleValue = attributeValue[styleKey];
          const oldStyleValue = oldAttribute?.[styleKey];

          if (oldStyleValue !== styleValue) {
            this.element.style.setProperty(helpers.camelToDash(styleKey), styleValue);
          }
        }

      } else if (attributeKey === 'dataset') {
        const datasetKeys = Object.keys(attributeValue);

        for (let j = 0; j < datasetKeys.length; j += 1) {
          const datasetKey = datasetKeys[j];
          const datasetValue = attributeValue[datasetKey];
          const oldDatasetValue = oldAttribute?.[datasetKey];

          if (oldDatasetValue !== datasetValue) {
            if (typeof datasetValue === 'boolean') {
              if (datasetValue) this.element.dataset[datasetKey] = '';
            } else if (!helpers.isNullOrUndefined(datasetValue)) {
              this.element.dataset[datasetKey] = datasetValue;
            }
          }
        }
      } else {
        if (attributeValue !== oldAttribute) {
          if (typeof attributeValue === 'boolean') {
            if (attributeValue) this.element.setAttribute(attributeKey, '');
          } else {
            this.element.setAttribute(attributeKey, new String(attributeValue));
          }
        }
      }
    }

    for (let i = 0; i < oldAttributesKeys.length; i += 1) {
      const oldAttributeKey = oldAttributesKeys[i];
      const oldAttributeValue = this.attributes[oldAttributeKey];
      let attribute = attributes[oldAttributeKey];

      if (oldAttributeKey === 'class') {
        if (!attribute) attribute = [];

        const oldClassList = oldAttributeValue;

        for (let j = 0; j < oldClassList.length; j += 1) {
          if (!attribute.includes(oldClassList[j])) {
            this.element.classList.remove(oldClassList[j]);
          }
        }

        if (attribute.length === 0) this.element.removeAttribute('class');
      } else if (oldAttributeKey === 'style') {
        if (!attribute) attribute = {};

        const oldStyleKeys = Object.keys(oldAttributeValue);

        for (let j = 0; j < oldStyleKeys.length; j += 1) {
          const oldStyleKey = oldStyleKeys[j];

          if (!attribute.hasOwnProperty(oldStyleKey)) {
            this.element.style.removeProperty(helpers.camelToDash(oldStyleKey));
          }
        }

        if (Object.keys(attribute).length === 0) this.element.removeAttribute('style');
      } else if (oldAttributeKey === 'dataset') {
        if (!attribute) attribute = {};

        const oldDatasetKeys = Object.keys(oldAttributeValue);

        for (let j = 0; j < oldDatasetKeys.length; j += 1) {
          const oldDatasetKey = oldDatasetKeys[j];
          const datasetValue = attribute?.[oldDatasetKey];

          if (
            !attribute.hasOwnProperty(oldDatasetKey)
            || (datasetValue === false && this.element.dataset.hasOwnProperty(oldDatasetKey))
          ) {
            delete this.element.dataset[oldDatasetKey];
          }
        }
      } else {
        if (!attributes.hasOwnProperty(oldAttributeKey)) {
          this.element.removeAttribute(oldAttributeKey);
        }
      }
    }

    this.attributes = attributes;
  }

  updateEvents(events = []) {
    for (let i = 0; i < events.length; i += 1) {
      const eventData = events[i];
      const oldEventData = this.events[i];

      if (oldEventData && (oldEventData !== eventData)) {
        this.element.removeEventListener(oldEventData[0], oldEventData[1], oldEventData[2]);
      }

      this.element.addEventListener(...eventData);
    }

    for (let i = events.length; i < this.events.length; i += 1) {
      const oldEventData = this.events[i];

      this.element.removeEventListener(oldEventData[0], oldEventData[1], oldEventData[2]);
    }

    this.events = events;
  }

  unmount() {
    if (this.element.parentElement) {
      for (const child of this.element.children) {
        child.remove();
      }

      this.element.remove();
    }
  }

  mount(parent, isPrepend) {
    if (isPrepend) {
      parent.prepend(this.element);
    } else {
      parent.append(this.element);
    }
  }
}

export default CreateElement;

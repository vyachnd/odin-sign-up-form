import CreateElement from './createElement.js';

class BGCircles extends CreateElement {
  constructor(attributes) {
    super('div', { ...(attributes || {}), class: ['bg-circles'] }, [
      new CreateElement('div', { class: ['bg-circles__circle'], style: { backgroundColor: 'rgba(248, 113, 113, 0.4) ' } }),
      new CreateElement('div', { class: ['bg-circles__circle'], style: { backgroundColor: 'rgba(250, 204, 21, 0.4)' } }),
      new CreateElement('div', { class: ['bg-circles__circle'], style: { backgroundColor: 'rgba(52, 211, 153, 0.4) ' } }),
      new CreateElement('div', { class: ['bg-circles__circle'], style: { backgroundColor: 'rgba(56, 189, 248, 0.4) ' } }),
    ]);

    this.updatePosition = this.updatePosition.bind(this);

    this.updatePosition();

    window.addEventListener('resize', this.updatePosition);
  }

  updatePosition() {
    const circles = this.children;
    const windowSize = [window.innerWidth, window.innerHeight];
    const hardSize = 400;
    const step = windowSize[0] / 4;

    circles[0].updateAttributes({
      ...circles[0].attributes,
      style: {
        ...(circles[0].attributes?.style || {}),
        top: `${windowSize[1] - (hardSize / 2)}px`,
        left: `${(windowSize[0] / 2) - (hardSize / 2) + (step / 2)}px`,
      },
    });

    circles[1].updateAttributes({
      ...circles[1].attributes,
      style: {
        ...(circles[1].attributes?.style || {}),
        top: `${(windowSize[1] / 2) - (hardSize / 2) + (step / 2)}px`,
        left: `${step / 2}px`,
      },
    });

    circles[2].updateAttributes({
      ...circles[2].attributes,
      style: {
        ...(circles[2].attributes?.style || {}),
        top: `${-(hardSize / 2) + (step / 4)}px`,
        left: `${(windowSize[0] / 2) - (hardSize / 2) - (step / 4)}px`,
      },
    });

    circles[3].updateAttributes({
      ...circles[3].attributes,
      style: {
        ...(circles[3].attributes?.style || {}),
        top: `${(windowSize[1] / 2) - (hardSize / 2)}px`,
        left: `${windowSize[0] - (hardSize / 2) - (step / 2)}px`,
      },
    });
  }

  unmount() {
    window.removeEventListener('resize', this.updatePosition);
    super.unmount();
  }
}

export default BGCircles;

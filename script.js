import BGCircles from './modules/bgCircles.js';
import CreateElement from './modules/createElement.js';
import CEHeading from './modules/custom-elements/heading/heading.js';
import SignUpForm from './modules/sign-up-form.js';

const appElement = new CreateElement('div', { id: 'app' }, [
  new CreateElement('aside', { class: ['app__sidebar'] }, [
    new CEHeading({ icon: 'account_box', title: 'SIGN-UP FORM' }),
    new CreateElement('span', { class: ['sidebar__text'] }, [
      'Image Author',
      new CreateElement('a', {
        href: '#',
        target: '_self',
        class: ['sidebar__link'],
      }, ['@name']),
    ])
  ]),
  new CreateElement('main', { class: ['app__main'] }, [
    new SignUpForm(),
  ]),
  new BGCircles(),
]);

appElement.mount(document.body, true);

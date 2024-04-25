import CreateElement from './createElement.js';
import CECheckbox from './custom-elements/checkbox/checkbox.js';
import { CEButton, CEIcon } from './custom-elements/init.js';
import FormInput from './form-input/form-input.js';

class SignUpForm extends CreateElement {
  constructor() {
    super('div', { class: ['sign-up-form'] }, [
      new CreateElement('header', { class: ['sign-up-form__header'] }, [
        new CreateElement('h2', { class: ['sign-up-form__title'] }, ['SIGN-UP']),
        new CreateElement('p', { class: ['sign-up-form__subtitle'] }, ['IT\u2019S NOT A REAL AUTH FORM']),
        new CreateElement('p', { class: ['sign-up-form__subtitle'] }, ['I\'m not interested in this project, so I did it the way I did it.']),
      ]),

      new CreateElement('form', { id: 'sign-up', class: ['sign-up-form__form'] }, [
        // Inputs
        new CreateElement('div', { class: ['form__input-group'] }, [
          new FormInput('FIRST NAME', { pattern: '^[A-Z][aA-zZ]+$', minlength: '2', for: 'first-name', form: 'sign-up', required: true, name: 'first-name', placeholder: 'Only letters, first is capital' }),
          new FormInput('LAST NAME', { pattern: '^[A-Z][aA-zZ]+$', minlength: '2', for: 'last-name', form: 'sign-up', required: true, name: 'last-name', placeholder: 'Only letters, first is capital' }),
          new FormInput('EMAIL', { type: 'email', for: 'email', form: 'sign-up', required: true, name: 'email', placeholder: 'example@mail.com' }),
          new FormInput('PHONE', { pattern: '^\\d+$', minlength: '10', maxlength: '10', for: 'phone', form: 'sign-up', required: true, name: 'phone', placeholder: '(123) 456 78 90' }, [new CEButton(['+7'])]),
          new FormInput('PASSWORD', { pattern: '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$', type: 'password', for: 'password', form: 'sign-up', required: true, name: 'password', placeholder: 'QWert@11' }, [, new CEIcon('visibility')]),
          new FormInput('REPEAT PASSWORD', { pattern: '^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$', type: 'password', for: 'repeat-password', form: 'sign-up', required: true, name: 'repeat-password', placeholder: 'QWert@11' }, [, new CEIcon('visibility')]),
        ]),

        // Terms and Conditions
        new CECheckbox(
          ['I agree with the ', new CreateElement('a', { href: '#', class: ['checkbox__link'] }, ['Terms and Conditions'])],
          { variant: 'secondary', required: true },
          { class: ['form__terms'] }
        ),

        // Submit
        new CEButton(['Create Account'], { variant: 'secondary', transparent: true, disabled: false }, { type: 'submit', class: ['form__submit'] }),

        // Log In
        new CreateElement('p', { class: ['form__log-in'] }, ['Already have an account? ', new CreateElement('a', { href: '#', class: ['log-in__link'] }, ['Log In'])]),
      ]),
    ]);
  }
}

export default SignUpForm;

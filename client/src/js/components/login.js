import { el } from 'redom';
import { router } from '../utils/routing';

const validateInput = (input, inputName) => {
  const isValid = true;
  if (input.value.length < 6 || /\s/.test(input.value)) {
    const errorMessage = `${inputName} must be at least 6 characters long and without spaces`;
    input.classList.add('login-form__input--invalid');
    return { errorMessage, isValid };
  }

  return isValid;
};

export const renderLogin = () => {
  const container = el(
    'div.login-container',
    el('h2.login-header.section-header', 'Account Login')
  );

  const loginForm = el('form.login-form', [
    el('div.login-form__input-container'),
    el('div.login-form__input-container'),
    el('button.login-form__submit-btn.btn-reset#login-btn', 'Login'),
  ]);

  const nameInput = el('input.login-form__input#login-name', {
    required: true,
    type: 'text',
    placeholder: 'Login',
    autocomplete: 'username',
    oninput() {
      this.classList.remove('login-form__input--invalid');
      router.navigate('/');
      errorSpan.textContent = '';
    },
  });

  const passwordInput = el('input.login-form__input#login-password', {
    required: true,
    type: 'password',
    placeholder: 'Password',
    autocomplete: 'current-password',
    oninput() {
      this.classList.remove('login-form__input--invalid');
      router.navigate('/');
      errorSpan.textContent = '';
    },
  });

  const errorSpan = el('span.login-form__error-message#login-form-error');

  loginForm.children[0].append(nameInput);
  loginForm.children[1].append(passwordInput);

  container.append(loginForm, errorSpan);

  return { container, loginForm, errorSpan };
};

export const formSubmit = (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('login-name');
  const passwordInput = document.getElementById('login-password');
  const error = document.getElementById('login-form-error');

  const nameIsValid = validateInput(nameInput, 'Login');
  const passwordIsValid = validateInput(passwordInput, 'Password');

  if (nameIsValid.errorMessage) {
    error.textContent = nameIsValid.errorMessage;
    return;
  }

  if (passwordIsValid.errorMessage) {
    error.textContent = passwordIsValid.errorMessage;
    return;
  }

  const nameInputValue = nameInput.value;
  const passwordInputValue = passwordInput.value;
  nameInput.value = '';
  passwordInput.value = '';

  return { nameInputValue, passwordInputValue };
};

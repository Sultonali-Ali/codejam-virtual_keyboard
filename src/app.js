
class Keyboard {
  constructor() {
    this.elements = {
      main: null,
      keysContainer: null,
      keys: [],
    };
    this.properties = {
      value: '',
      capsLock: false,
    };
    this.keyLayout = {
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'enter',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#8593;',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt Gr', 'Ctrl', '&#8592;', '&#8595;', '&#8594;',
      ],
    };
  }

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');


    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach(element => {
      element.addEventListener('focus', () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  }

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.keyLayout.eng.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'Backspace';

          break;

        case 'CapsLock':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'CapsLock';

          break;

        case 'Enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'Enter';

          break;

        case 'Space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.textContent = 'Space';

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'Tab';

          break;

        case 'Tab':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = 'Tab';

          break;

        default:
          keyElement.classList.add('keyboard__key--wide');
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent('oninput');
          });

          break;
      }
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  }
}

// Create input(textarea) and append to body
const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'textarea');
textarea.addEventListener('focus', () => {
  document.querySelector('.keyboard').classList.remove('keyboard--hidden');
});

const keyboard = new Keyboard();

document.body.appendChild(textarea);

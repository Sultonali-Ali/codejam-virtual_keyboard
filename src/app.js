
class Keyboard {
  constructor() {
    this.input = null;
    this.elements = {
      main: null,
      keysContainer: null,
      keys: [],
    };
    this.properties = {
      capsLock: false,
      shift: false,
      alt: false,
      ctrl: false,
    };
    this.keyLayout = {
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'br',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del', 'br',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'Enter', 'br',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift', '&#8593;', 'br',
        'Ctrl', 'Win', 'Alt', 'Space', 'Alt Gr', 'Ctrl', '&#8592;', '&#8595;', '&#8594;', 'br',
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
    this.input = document.querySelector('#textarea');
    this.virtualKeyClickHandler();
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');


    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  }

  createKeys() {
    const fragment = document.createDocumentFragment();

    this.keyLayout.eng.forEach((key) => {
      if (key === 'br') {
        fragment.appendChild(document.createElement('br'));
      } else {
        const keyElement = document.createElement('button');

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

          case 'Shift':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Shift';

            break;

          case 'Ctrl':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Ctrl';

            break;

          case 'Alt Gr':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Alt Gr';

            break;

          case 'Alt':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Alt';

            break;

          case 'Del':
            keyElement.classList.add('keyboard__key--wide');
            keyElement.textContent = 'Del';

            break;

          default:
            keyElement.classList.add('keyboard__key');
            keyElement.innerHTML = key.toLowerCase();

            break;
        }
        fragment.appendChild(keyElement);
      }
    });
    return fragment;
  }

  virtualKeyClickHandler() {
    this.elements.keysContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('keyboard__key')) {
        event.target.classList.add('keyboard__key--active');
        this.addValueToInput(event.target);
        setTimeout(() => {
          event.target.classList.remove('keyboard__key--active');
        }, 300);
      }
    });
  }

  addValueToInput(target) {
    switch (target.textContent) {
      case 'Backspace':
        this.input.value = this.input.value.substring(0, this.input.value.length - 1);
        break;

      case 'CapsLock':
        this.triggerCapsLock();
        if (this.properties.capsLock) {
          target.classList.add('keyboard__key--highlight');
        } else {
          target.classList.remove('keyboard__key--highlight');
        }
        this.elements.keys.forEach((key) => {
          if (key.textContent.length === 1) {
            if (this.properties.capsLock) {
              key.textContent = key.textContent.toUpperCase();
            } else {
              key.textContent = key.textContent.toLowerCase();
            }
          }
        });

        break;

      case 'Enter':
        this.input.value += '\n';

        break;

      case 'Space':
        this.input.value += ' ';

        break;

      case 'Tab':
        this.input.value += '    ';

        break;

      // case 'Shift':
      //   keyElement.classList.add('keyboard__key--wide');
      //   keyElement.textContent = 'Shift';

      //   break;

      case 'Ctrl':
        keyElement.classList.add('keyboard__key--wide');
        keyElement.textContent = 'Ctrl';

        break;

      // case 'Alt Gr':
      //   keyElement.classList.add('keyboard__key--wide');
      //   keyElement.textContent = 'Alt Gr';

      //   break;

      // case 'Alt':
      //   keyElement.classList.add('keyboard__key--wide');
      //   keyElement.textContent = 'Alt';

      //   break;

      // case 'Del':
      //   keyElement.classList.add('keyboard__key--wide');
      //   keyElement.textContent = 'Del';

      //   break;

      default:
        this.input.value += currentValue;

        break;
    }
  }

  triggerCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
  }
}


window.addEventListener('DOMContentLoaded', () => {
  // Create input(textarea) and append to body
  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'textarea');
  textarea.addEventListener('focus', () => {
    document.querySelector('.keyboard').classList.remove('keyboard--hidden');
  });

  document.body.appendChild(textarea);

  const keyboard = new Keyboard();
  keyboard.init();
});

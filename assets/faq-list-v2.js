  // Accordion Setup
  class Accordioncustom {
    constructor(accordion = '', newOptions) {
      let options = {
        initOpenIndex: 1,
        closeAll: true,
        duration: 400,
        activeClass: 'active',
        globalClose: true,
        isFirstAccordion: false,
      };
      this.options = { ...options, ...newOptions };
      this.accordions = document.querySelectorAll(accordion);

      this.accordions.forEach((accordion, index) => {
        this.initAccordion(accordion, index);
      });
    }

    initAccordion(accordion, accordionIndex) {
      const tabItemsArray = Array.from(accordion.children);

      if (this.options.initOpenIndex > tabItemsArray.length) {
        this.options.initOpenIndex = tabItemsArray.length;
      }

      tabItemsArray.forEach((tabElement, index) => {
        let item = this.getAccordionItems(tabElement);
        this.contentInitialHeight(item[1]);

        if (index === this.options.initOpenIndex - 1 && this.options.isFirstAccordion) {
          this.InitialOpen(item);
        } else {
          this.close(item);
        }

        item[0].addEventListener('click', () => {
          this.toggle(tabItemsArray, item);
        });
      });
    }

    getAccordionItems(accordion) {
      let title = accordion.children[0];
      let content = accordion.children[1];
      return [title, content];
    }

    contentInitialHeight(content) {
      content.style.height = '0px';
      content.style.overflow = 'hidden';
    }

    InitialOpen(item) {
      this.setActiveClass(item);
      this.open(item);
    }

    open(item) {
      let content = item[1];
      this.transition(content);
      content.style.height = `${content.scrollHeight}px`;
      //content.style.height = `auto`;
    }

    close(item) {
      let content = item[1];
      content.style.height = '0px';
    }

    toggle(tabItemsArray, item) {
      const isOpen = item[1].style.height !== '0px';

      if (this.options.globalClose) {
        document.querySelectorAll('.accordion--custom').forEach((tabItem) => {
          let itemToClose = this.getAccordionItems(tabItem);
          this.close(itemToClose);
          this.removeActiveClass(itemToClose);
        });
      } else {
        tabItemsArray.forEach((tabItem) => {
          let itemToClose = this.getAccordionItems(tabItem);
          this.close(itemToClose);
          this.removeActiveClass(itemToClose);
        });
      }

      if (!isOpen) {
        this.setActiveClass(item);
        this.open(item);
      }
    }

    transition(el) {
      el.style.transition = `all ${this.options.duration}ms ease`;
    }

    setActiveClass(item) {
      item[1].parentElement.classList.add(this.options.activeClass);
    }

    removeActiveClass(item) {
      item[1].parentElement.classList.remove(this.options.activeClass);
    }
  }

  // Initialize accordions
  new Accordioncustom('.accordion-wrapper-first--abc', {
    initOpenIndex: 1,
    duration: 700,
    activeClass: 'active',
    globalClose: true,
    isFirstAccordion: true,
  });
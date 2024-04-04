// create a class
class QubasTextRotatorTurbo {
  element;
  elementOptions;
  elementRandomization;
  elementIndex;
  rotateMode;
  randMaxSleep;
  baselineSleep;
  constructor(elm) {
    this.element = elm;
    // get data-options attribute and split it by |
    this.elementOptions = elm.getAttribute("data-options").split("|");
    this.elementRandomization = elm.getAttribute("data-random") === "true";

    this.rotateMode = elm.getAttribute("data-mode");
    if (this.rotateMode === null) {
      this.rotateMode = "fadeoutthenreplace";
    }

    this.randMaxSleep = elm.getAttribute("data-rand-max-sleep");
    if (this.randMaxSleep === null) {
      this.randMaxSleep = 0;
    }
    this.randMaxSleep = parseInt(this.randMaxSleep);

    this.baselineSleep = elm.getAttribute("data-baseline-sleep");
    if (this.baselineSleep === null) {
      this.baselineSleep = 2000;
    }
    this.baselineSleep = parseInt(this.baselineSleep);


    if (this.elementRandomization) {
      this.elementOptions = this.elementOptions.sort(() => Math.random() - 0.5);
    }
    this.elementIndex = 0;
    this.element.textContent = this.elementOptions[this.elementIndex];
    this.element.style.width = this.element.getBoundingClientRect().width + "px";;
    setTimeout(() => { this.foreverLoop() }, 2000);
  }

  foreverLoop() {
    if (this.rotateMode === "fadeoutandreplace") {
      this.rotateText1()
    }
    else if (this.rotateMode === "fadeoutthenreplace") {
      this.rotateText2()
    }

    setTimeout(() => { this.foreverLoop() }, this.baselineSleep + Math.floor(Math.random() * this.randMaxSleep));
  }


  rotateText1() {
    this.incrementElementIndex();
    let newWidth = this.measureTextWidth();
    this.element.classList.add("fade-out");
    this.element.style.width = newWidth + "px";

    setTimeout(() => {
      this.element.textContent = this.elementOptions[this.elementIndex];
      this.element.classList.remove("fade-out");
    }, 500);

  }

  rotateText2() {
    this.element.classList.add("fade-out");
    setTimeout(() =>  {
      this.elementIndex = (this.elementIndex + 1);
      if (this.elementIndex >= this.elementOptions.length) {
        if (this.elementRandomization) {
          this.elementOptions.sort(() => Math.random() - 0.5);
        }

        this.elementIndex = 0;
      }

      let newWidth = this.measureTextWidth();
      this.element.style.width = newWidth + "px";

      setTimeout(() => {
        this.element.textContent = this.elementOptions[this.elementIndex];
        this.element.classList.remove("fade-out");
      }, 500);
    }, 500);
  }

  measureTextWidth() {

    var elm = document.createElement(this.element.tagName);
    elm.textContent = this.elementOptions[this.elementIndex]
    elm.className = this.element.className;
    elm.style.position = 'absolute';
    elm.style.visibility = 'hidden';
    // insert elm next to this.element
    this.element.parentNode.insertBefore(elm, this.element.nextSibling);

    const width = elm.getBoundingClientRect().width;
    this.element.parentNode.removeChild(elm);

    return width;
  }

  incrementElementIndex() {
    let currentElement = this.elementOptions[this.elementIndex];
    this.elementIndex = (this.elementIndex + 1);
    if (this.elementIndex >= this.elementOptions.length) {
      if (this.elementRandomization) {
        // shuffle the array
        this.elementOptions = this.elementOptions.sort(() => Math.random() - 0.5);
        // check if the current element is the same as the first element
        if (currentElement === this.elementOptions[0]) {
          // if so, swap the first and last element
          let temp = this.elementOptions[0];
          this.elementOptions[0] = this.elementOptions[this.elementOptions.length - 1];
          this.elementOptions[this.elementOptions.length - 1] = temp;
        }
      }

      this.elementIndex = 0;
    }
  }

}

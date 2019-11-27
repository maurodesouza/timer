class Timer {
  constructor(
    btnStart,
    btnPause,
    btnReset,
    hoursDisplay,
    minutesDisplay,
    secundsDisplay
  ) {
    this.buttons = {
      btnStart,
      btnPause,
      btnReset
    };
    this.timeDisplay = {
      hoursDisplay,
      minutesDisplay,
      secundsDisplay
    };
    this.time = {
      hours: 23,
      minutes: 59,
      secunds: 55,
    };
    this.timerStarted = false;
    this.timer;
  };

  startTimer() {
    if (!this.timerStarted) {
      this.timerStarted =  true;

      this.timer = setInterval(() => {
        this.time.secunds += 1;
        this.renderTimer();
        
        if (this.time.secunds == 59) {
          this.time.secunds = -1;

          setTimeout(() => {
            if (this.time.minutes == 59) {
              this.time.minutes = 0;

              if (this.time.hours == 23) this.time.hours = 0;
              else this.time.hours += 1;

            } else this.time.minutes += 1;

            this.renderTimer();

          }, 1000);
        };
      }, 1000);
    };
  };

  pauseTimer() {
    clearInterval(this.timer);
    this.timerStarted = false;
  }

  resetTimer() {
    this.pauseTimer();

    this.time.hours = 0;
    this.time.minutes = 0;
    this.time.secunds = 0;

    this.renderTimer();
  }

  renderTimer() {
    this.timeDisplay.hoursDisplay.innerText = ('00' + this.time.hours).slice(-2);
    this.timeDisplay.minutesDisplay.innerText = ('00' + this.time.minutes).slice(-2);
    this.timeDisplay.secundsDisplay.innerText = ('00' + this.time.secunds).slice(-2);
  }

  addEvents() {
    this.buttons.btnStart.addEventListener('click', this.startTimer);
    this.buttons.btnStart.addEventListener('dblclick', this.pauseTimer);

    this.buttons.btnPause.addEventListener('click', this.pauseTimer);
    this.buttons.btnPause.addEventListener('dblclick', this.resetTimer);

    this.buttons.btnReset.addEventListener('click', this.resetTimer);
  };

  init() {
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.addEvents();
    return this;
  };
}

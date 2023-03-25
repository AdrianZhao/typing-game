class Score {
  #date = new Date();
  #hits
  #percentage

  constructor(hits) {
    this.#hits = hits;
    this.#percentage = hits;
  }

  get hits() {
    return this.#hits;
  }

  get date() {
    return this.#date.toDateString().slice(3).trim(' ');
  }

  get percentage() {
    return `${Math.round(this.#percentage / 90 * 10_000) / 100}%`;
  }
}

export { Score };
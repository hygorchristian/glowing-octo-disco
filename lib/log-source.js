"use strict";

const _ = require("lodash");
const Faker = require("Faker"); // used for generating fake data
const P = require("bluebird"); // used for promise support

/*
    We don't like OOP - in fact - we despise it!

    However, most real world implementations of something like a log source
    will be in OO form - therefore - we simulate that interaction here.
*/

/**
 *
 * @class LogSource
 * @description Simulating a log source using an object-oriented approach.
 * This class generates pseudo-random log entries and simulates the behavior of a real-world log source.
 * @type {LogSource}
 */
module.exports = class LogSource {
  constructor() {
    this.drained = false; // Flag to indicate if the log source is exhausted
    this.last = {
      // Initialize with a random date in the past 40-60 days
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * _.random(40, 60)),
      // Generate a random message
      msg: Faker.Company.catchPhrase(),
    };
  }

  /**
   * Generates the next pseudo-random log entry.
   * The date of the next log entry is incremented by a random amount of time.
   * @returns {{ date: Date, msg: string }} A log entry object containing a date and a message.
   */
  getNextPseudoRandomEntry() {
    return {
      date: new Date(
        this.last.date.getTime() +
          1000 * 60 * 60 * _.random(10) +
          _.random(1000 * 60)
      ),
      msg: Faker.Company.catchPhrase(),
    };
  }

  /**
   * Synchronously retrieves the next log entry.
   * If the date of the next log entry is in the future, the log source is marked as drained.
   * @returns {{ date: Date, msg: string } | false} The next log entry or false if the log source is drained.
   */
  pop() {
    this.last = this.getNextPseudoRandomEntry(); // Generate the next log entry
    if (this.last.date > new Date()) { // Check if the date is in the future
      this.drained = true; // Mark the log source as drained
    }
    return this.drained ? false : this.last; // Return the log entry or false if drained
  }

  /**
   * Asynchronously retrieves the next log entry.
   * If the date of the next log entry is in the future, the log source is marked as drained.
   * @returns {Promise<{ date: Date, msg: string } | false>} A promise that resolves with the next log entry or false if the log source is drained.
   */
  popAsync() {
    // TODO: Re-use the logic from the `pop` method to implement the `popAsync` method. This has duplicate logic.
    this.last = this.getNextPseudoRandomEntry(); // Generate the next log entry
    if (this.last.date > Date.now()) { // Check if the date is in the future
      this.drained = true; // Mark the log source as drained
    }
    return P.delay(_.random(8)).then(() => (this.drained ? false : this.last)); // Simulate async delay and return the log entry or false if drained
  }
};

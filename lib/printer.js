"use strict";

const _ = require("lodash");

/**
 * @class Printer
 * @description A simple class that logs messages to the console.
 * Ensures that log entries are printed in chronological order and provides statistics about the printing process.
 * @type {Printer}
 */
module.exports = class Printer {
  constructor() {
    this.last = new Date(0); // Initialize the last printed log date to the epoch
    this.logsPrinted = 0; // Counter for the number of logs printed
  }

  /**
   * Prints a log entry if its date is valid and in chronological order.
   * @param {{ date: Date, msg: string }} log - The log entry to be printed.
   * @throws Will throw an error if the log date is not a valid date or if it is not in chronological order.
   */
  print(log) {
    if (!_.isDate(log.date)) {
      throw new Error(log.date + " is not a date");
    }
    if (log.date >= this.last) {
      console.log(log.date, log.msg);
    } else {
      throw new Error(log.date + " is not greater than " + this.last);
    }
    this.last = log.date;
    this.logsPrinted++;
    if (this.logsPrinted === 1) {
      this.startTime = new Date();
    }
  }

  /**
   * Prints statistics about the log printing process.
   * Outputs the total number of logs printed, the total time taken, and the average logs printed per second.
   */
  done() {
    const timeTaken = (new Date() - this.startTime) / 1000;
    const memoryUsage = process.memoryUsage();
    console.log("\n***********************************");
    console.log("Logs printed:\t\t", this.logsPrinted);
    console.log("Time taken (s):\t\t", timeTaken);
    console.log("Logs/s:\t\t\t", this.logsPrinted / timeTaken);
    console.log("Memory usage (RSS):\t", (memoryUsage.rss / 1024 / 1024).toFixed(2) + " MB");
    console.log("Heap Total:\t\t", (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + " MB");
    console.log("Heap Used:\t\t", (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + " MB");
    console.log("***********************************\n");
  }
};

/**
 * @description Synchronously merges and prints log entries from multiple log sources.
 *
 * **Time Complexity**:
 * - O(n) to drain all log entries from each log source
 * - O(n*log(n)) to sort all log entries by date
 * - O(n) to print all log entries
 * - Combining these, the overall time complexity is O(N log N).
 *
 * **Space Complexity**:
 * - O(n) to store all log entries
 * - O(1) for in-place sorting
 * - O(1) for printing
 * - Overall space complexity O(n)
 *
 * @param logSources {Array<LogSource>}
 * @param printer {Printer}
 * @returns {void}
 */
function syncSortedMerge(logSources, printer) {
    // Step 1: Drain all log entries
    const allLogs = [];

    // We get all logs out of order
    logSources.forEach(source => {
        let log = source.pop();
        while (log) {
            allLogs.push(log);
            log = source.pop();
        }
    });

    // Step 2: Sort all log entries by date
    allLogs.sort((a, b) => a.date - b.date);

    // Step 3: Print all log entries
    allLogs.forEach(log => printer.print(log));

    // Step 4: Print statistics
    printer.done();
}

/**
 * @description Asynchronously merges and prints log entries from multiple log sources.
 * @param logSources {Array<LogSource>}
 * @param printer {Printer}
 * @returns {Promise<void>}
 */
async function asyncSortedMerge(logSources, printer) {
    // Step 1: Drain all log entries asynchronously
    const allLogs = [];

    await Promise.all(
        logSources.map(async (source) => {
            let log = await source.popAsync();
            while (log) {
                allLogs.push(log);
                log = await source.popAsync();
            }
        })
    );

    // Step 2: Sort all log entries by date
    allLogs.sort((a, b) => a.date - b.date);

    // Step 3: Print all log entries
    allLogs.forEach(log => printer.print(log));

    // Step 4: Print statistics
    printer.done();
}

module.exports = {
    syncSortedMerge,
    asyncSortedMerge
};
const Heap = require('heap');

/**
 * @description Synchronously merges and prints log entries from multiple log sources.
 *
 * **Time Complexity**:
 *
 * **Space Complexity**:
 *
 * @param logSources {Array<LogSource>}
 * @param printer {Printer}
 * @returns {void}
 */
function syncSortedMerge(logSources, printer) {
    // Step 1. Create a min heap to store the log entries
    /**
     * @type {Heap<{log: LogEntry, index:number }>}     *
     */
    const minHeap = new Heap((a, b) => a.log.date - b.log.date);

    // Step 2. Push the first log entry from each source into the min heap
    // The min value in the heap will always be the lowest date possible,
    // for this reason we can be sure that the min heap will be the best data structure to use
    for (let index = 0; index < logSources.length; index++) {
        const log = logSources[index].pop();
        if (log) {
            // Push the log entry and the source index into the min heap
            // we need the index to know which source the log entry came from
            minHeap.push({ log, index });
        }
    }

    // Step 3. While the min heap is not empty, pop the min log entry and print it
    while (!minHeap.empty()) {
        const { log, index } = minHeap.pop();

        // Print the log entry
        printer.print(log);

        const nextLog = logSources[index].pop();

        if (nextLog) {
            // Push the next log entry from the same source back into the min heap
            minHeap.push({ log: nextLog, index });
        }
    }

    // Step 4. Print statistics
    printer.done();
}


/**
 * @description Asynchronously merges and prints log entries from multiple log sources using a MinHeap.
 *
 * **Time Complexity**:
 * - O(N log K) where N is the total number of log entries and K is the number of log sources.
 *
 * **Space Complexity**:
 * - O(K) for the MinHeap.
 *
 * @param logSources {Array<LogSource>}
 * @param printer {Printer}
 * @returns {Promise<void>}
 */
async function asyncSortedMerge(logSources, printer) {
    // Step 1. Create a min heap to store the log entries
    /**
     * @type {Heap<{log: LogEntry, index:number }>}
     */
    const minHeap = new Heap((a, b) => a.log.date - b.log.date);

    // Step 2. Push the first log entry from each source into the min heap
    await Promise.all(
        logSources.map(async (source, index) => {
            const log = await source.popAsync();
            if (log) {
                minHeap.push({ log, index });
            }
        })
    );

    // Step 3. While the min heap is not empty, pop the min log entry and print it
    while (!minHeap.empty()) {
        const { log, index } = minHeap.top();

        // Print the log entry
        printer.print(log);

        const nextLog = await logSources[index].popAsync();

        if (nextLog) {
            // Push the next log entry from the same source back into the min heap
            minHeap.pushpop({ log: nextLog, index });
        }else {
            minHeap.pop();
        }
    }

    // Step 4. Print statistics
    printer.done();
}

module.exports = {
    syncSortedMerge,
    asyncSortedMerge
}
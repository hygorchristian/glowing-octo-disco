const { Heap } = require('@datastructures-js/heap');

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
    // Step 1. Create a priority queue to store the log entries

    /**
     * @type {MinHeap<{log: LogEntry, index:number }>}
     */
    const minHeap =  new Heap((a, b) => a.log.date - b.log.date);

    for(let index = 0; index < logSources.length; index++) {
        const log = logSources[index].pop();
        if(log) {
            // Push the log entry and the source index into the min heap
            // we need the index to know which source the log entry came from
            minHeap.push({ log, index });
        }
    }

    // Process the logs while the priority queue is not empty.
    while (!minHeap.isEmpty()) {
        const { log, index } = minHeap.pop();

        printer.print(log);

        // Fetch the next log from the popped source.
        const nextLog = logSources[index].pop();

        if (nextLog) {
            minHeap.push({ log, index });
        }
    }

    printer.done();
}

async function asyncSortedMerge(logSources, printer) {
    // Step 1. Create a min heap to store the log entries
    /**
     * @type {MinHeap<{log: LogEntry, index:number }>}
     */
    const minHeap = new Heap((a, b) => a.log.date - b.log.date);

    // Step 2. Push the first log from each source into the min heap
    await Promise.all(
        logSources.map(async (source, index) => {
            const log = await source.popAsync();
            if (log) {
                minHeap.push({ log, index });
            }
        })
    );

    // Step 3. While the priorityQueue is not empty, pop the min log entry and print it
    while (!minHeap.isEmpty()) {
        const { log, index } = minHeap.pop();

        // Print the log entry
        printer.print(log);

        const nextLog = await logSources[index].popAsync();

        if (nextLog) {
            minHeap.push({ log, index });
        }
    }

    printer.done();
}

module.exports = {
    syncSortedMerge,
    asyncSortedMerge
}
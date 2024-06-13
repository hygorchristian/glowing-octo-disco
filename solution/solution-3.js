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
        const { log, index } = minHeap.top();

        // Print the log entry
        printer.print(log);

        const nextLog = logSources[index].pop();

        if (nextLog) {
            // Push the next log entry from the same source back into the min heap
            minHeap.pushpop({ log: nextLog, index });
        }else{
            minHeap.pop();
        }
    }

    // Step 4. Print statistics
    printer.done();
}

/**
 * @description Asynchronously merges and prints log entries from multiple log sources.
 * @param logSources {Array<LogSource>}
 * @param printer {Printer}
 * @returns {Promise<void>}
 */
async function asyncSortedMerge(logSources, printer) {
    // Set this to true to see the logs being flushed
    const __DEBUG__ = false;

    // Step 1. Create a min heap to store the log entries
    /**
     * @type {Heap<LogEntry>}     *
     */
    const minHeap = new Heap((a, b) => a.date - b.date);

    // We keep track of the last date we visited from each source
    const visitedMap = new Map();

    // Utility function to get the min date from the visited map
    function getMinLastVisited(){
        let min = Number.MAX_VALUE;
        for (let [_, value] of visitedMap) {
            if(value < min){
                min = value;
            }
        }

        return min;
    }

    // Utility function to flush the logs from the min-heap
    // 1. We check if the min log in the heap is less than the min date in the visited map
    // 2. If we have a log that is less than the min date in the visited map, we can flush the logs
    // 3. If not, it means that we have to wait for the next async log to be pushed into the heap
    function flushLogs(){
        const min = getMinLastVisited()
        let flushCounter = 0;

        while(minHeap.size() > 0 && minHeap.top().date <= min){
            printer.print(minHeap.pop());
            // Used for debugging purposes
            flushCounter++;
        }

        if(__DEBUG__ && flushCounter > 0)
            console.log('Flushed', flushCounter, 'logs, heap size', minHeap.size());
    }

    // We push the first log from each source into the min heap
    await Promise.all(
        logSources.map(async (source, index) => {
            const log = await source.popAsync();
            if (log) {
                minHeap.push(log);
                visitedMap.set(index, log.date);
            }
        })
    );

    // We keep pushing logs into the heap until we have no more logs to push
    // this is done concurrently
    await Promise.all(
        logSources.map(async (source, index) => {
            let log = await source.popAsync();

            // We keep pushing logs into the heap until we have no more logs to push
            while (log) {
                minHeap.push(log);

                // We keep track of the last date we visited from each source
                visitedMap.set(index, log.date);

                // We flush the logs from the heap
                flushLogs()
                log = await source.popAsync();
            }

            if(!log) {
                // If we have no more logs to push, we set the last date to the max value
                visitedMap.set(index, Number.MAX_VALUE);
                flushLogs()
            }
        })
    );

    // We flush the remaining logs from the heap
    while(minHeap.size() > 0)
        printer.print(minHeap.pop());

    // Print statistics
    printer.done();
}

module.exports = {
    syncSortedMerge,
    asyncSortedMerge
};
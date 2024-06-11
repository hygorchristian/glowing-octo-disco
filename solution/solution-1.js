function syncSortedMerge(logSources, printer){
    const allLogs = [];

    logSources.forEach(source => {
        let log = source.pop();
        while (log) {
            allLogs.push(log);
            log = source.pop();
        }
    });

    allLogs.sort((a, b) => a.date - b.date);
    allLogs.forEach(log => printer.print(log));
    printer.done();
}


function asyncSortedMerge(logSources, printer) {

}
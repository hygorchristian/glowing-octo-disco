# SOLUTION CHANGELOG

## [Revision 1](/solution/solution-1.js)

### Thought Process

- Read through the code and understood the logic.
- I had to add some comments to the `lib` files to understand the logic better.
- Usually I would use typescript, but since this is already in plain javascript, I am abusing JSDocs to make the code more readable and have at least some sort of intellisense and type check.
- I executed the tests to make sure it works.

### Code Changes

- Added some documentation and comments to the code to make it more readable.
- Created the first solution to the sync problem using brute force and experimenting how the code works.
- Added memory usage to the logs to keep track of the memory usage.

## [Revision 2](/solution/solution-2.js)

### Thought Process

- Made an analysis of the first solution with some space complexity and time complexity.
- Improved the space complexity of the problem by using a min heap, this saves memory but increases the time complexity a lot, since we need to sort the heap every time we add a new log.
- I opted to use a library for the heap to save time.

## [Revision 3](/solution/solution-3.js)

- Improved the time complexity of the problem by using a non-blocking async solution.
- This solution mixes the first and second solutions, where we use a heap to sort the logs and parallel promises to fetch the logs.
- This solution is more efficient than the previous async solution, but it uses more memory
- The approach is similar to a Tetris game, we keep receiving blocks, and we keep sorting them until we have a full line, once this happens it means that all sources have been drained at the same level and once this happens we can flush the logs with a high level of confidence that they are in order.
- It's possible to adjust the solution to use less space, but this tradeoff would make the solution slower.

## Results

These are the results of the tests I ran on my machine. Note that I have disabled the logs delay to make the tests faster.

**Log Sources**: `1000`
**Async Log Delay**: `0ms`
**Logs**: Disabled the `console.log`, because i/o operations are slow, so these results are only for the processing of the logs, not the printing of them.

### Machine Specs

- OS: MacOS Sonoma
- Processor: M3 Pro
- Memory: 18GB
- Node: v21.6.2

### Table of Results

| Solution # | Type      | # of log sources | Logs printed | Time taken (s) | Logs/s             | Memory usage (RSS) | Heap Total | Heap Used |
|------------|-----------|------------------|--------------|----------------|--------------------|--------------------|------------|-----------|
| 1          | Sync      | 1000             | 239633       | 0.034          | 28918.26923076923  | 154.28 MB          | 110.84 MB  | 88.69 MB  |
| 1          | Async     | 1000             | 238855       | 0.05           | 4777100            | 157.03 MB          | 110.59 MB  | 81.15 MB  |
| 2          | Sync      | 1000             | 238632       | 0.314          | 759974.5222929936  | 66.23 MB           | 23.88 MB   | 13.14 MB  |
| 2          | Async     | 1000             | 240616       | 280.446        | 857.9762235867154  | 66.48 MB           | 38.73 MB   | 18.24 MB  |
| 3          | Sync      | 1000             | 239419       | 0.323          | 741235.294117647   | 66.27 MB           | 23.88 MB   | 13.66 MB  |
| 3          | Async     | 1000             | 238905       | 17.969         | 13295.397629250374 | 80.94 MB           | 71.58 MB   | 18.96 MB  |


### Solution 1 - Using Array and Sorting - Bruteforce

#### Sync

| Message             | Value             |
|---------------------|-------------------|
| Logs printed:       | 239633            |
| Time taken (s):     | 0.034             |
| Logs/s:             | 7048029.411764706 |
| Memory usage (RSS): | 154.28 MB         |
| Heap Total:         | 110.84 MB         |
| Heap Used:          | 88.69 MB          |

#### Async

| Message             | Value     |
|---------------------|-----------|
| Logs printed:       | 238855    |
| Time taken (s):     | 0.05      |
| Logs/s:             | 4777100   |
| Memory usage (RSS): | 157.03 MB |
| Heap Total:         | 110.59 MB |
| Heap Used:          | 81.15 MB  |


### Solution 2 - Using Heap

#### Sync

| Message             | Value             |
|---------------------|-------------------|
| Logs printed:       | 238632            |
| Time taken (s):     | 0.314             |
| Logs/s:             | 759974.5222929936 |
| Memory usage (RSS): | 66.23 MB          |
| Heap Total:         | 23.88 MB          |
| Heap Used:          | 13.14 MB          |

#### Async

| Message             | Value             |
|---------------------|-------------------|
| Logs printed:       | 240616            |
| Time taken (s):     | 280.446           |
| Logs/s:             | 857.9762235867154 |
| Memory usage (RSS): | 66.48 MB          |
| Heap Total:         | 38.73 MB          |
| Heap Used:          | 18.24 MB          |

### Solution 3 - Non blocking async

#### Sync

| Message             | Value            |
|---------------------|------------------|
| Logs printed:       | 239419           |
| Time taken (s):     | 0.323            |
| Logs/s:             | 741235.294117647 |
| Memory usage (RSS): | 66.27 MB         |
| Heap Total:         | 23.88 MB         |
| Heap Used:          | 13.66 MB         |

#### Async

| Message             | Value              |
|---------------------|--------------------|
| Logs printed:       | 238905             |
| Time taken (s):     | 17.969             |
| Logs/s:             | 13295.397629250374 |
| Memory usage (RSS): | 80.94 MB           |
| Heap Total:         | 71.58 MB           |
| Heap Used:          | 18.96 MB           |
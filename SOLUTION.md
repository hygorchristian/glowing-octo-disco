# SOLUTION CHANGELOG

## Revision 1

### Thought Process

- Read through the code and understood the logic.
- I had to add some comments to the `lib` files to understand the logic better.
- Usually I would use typescript, but since this is already in plain javascript, I am abusing JSDocs to make the code more readable and have at least some sort of intellisense and type check.
- I executed the tests to make sure it works.

### Code Changes

- Added some documentation and comments to the code to make it more readable.
- Created the first solution to the sync problem using brute force and experimenting how the code works.
- Added memory usage to the logs to keep track of the memory usage.

## Revision 2

### Thought Process

- Made an analysis of the first solution with some space complexity and time complexity.
- Improved the space complexity of the problem by using a min heap, this saves memory but increases the time complexity a lot, since we need to sort the heap every time we add a new log.
- I opted to use a library for the heap to save time.

## Revision 3

- Made an analysis of the second solution with some space complexity and time complexity.
- Noted that the space complexity could be improved by using a priority queue, this saves memory and time complexity, since we don't need to sort the heap every time we add a new log.
- I opted to use a library for the priority queue to save time.
- Still not 100% satisfied with the async solution, but I will leave it as is for now.
- It looks like the optimal solution would be to batch process the async logs and merge the first solution with the second one, the tradeoff would be to use more memory, but less time. So in this case we would have to determine what's more important, time or memory.

### Very Important Note!!

- After doing some tests I noticed that the third solution is consuming less memory but it is not working as expected, which makes me discard this solution
- When I enabled the logs back, I noticed that there were some duplicated logs, which is not expected, so I will discard this solution and keep the second one.
- This solution was removed, but you can still see it in the git log.

## Conclusion

- I am happy with the results, I think this was a nice opportunity to revisit some data structures and algorithms that I haven't used in a while.
- I am not 100% satisfied with the async solution, but I think it's good enough for now. What I would try if I had more time would be to batch process the async logs and merge the first solution with the second one, the tradeoff would be to use more memory, but less time, and if this was a real world scenario, I would have to determine what's more important, time or memory.
- Taking only space complexity into consideration, the min heap is the best solution since, for some reason, it uses less memory than the `heap`.

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
| ~~3~~      | ~~Sync~~  | 1000             | 238843       | 0.51           | 468319.60784313723 | 58.94 MB           | 16.38 MB   | 8.79 MB   |
| ~~3~~      | ~~Async~~ | 1000             | 239022       | 278.773        | 857.4072811929418  | 40.61 MB           | 10.23 MB   | 6.75 MB   |



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

### Solution 3 - Using Priority Queue - !!Discarded!!

#### Sync

| Message             | Value              |
|---------------------|--------------------|
| Logs printed:       | 238843             |
| Time taken (s):     | 0.51               |
| Logs/s:             | 468319.60784313723 |
| Memory usage (RSS): | 58.94 MB           |
| Heap Total:         | 16.38 MB           |
| Heap Used:          | 8.79 MB            |

#### Async

| Message             | Value             |
|---------------------|-------------------|
| Logs printed:       | 239022            |
| Time taken (s):     | 278.773           |
| Logs/s:             | 857.4072811929418 |
| Memory usage (RSS): | 40.61 MB          |
| Heap Total:         | 10.23 MB          |
| Heap Used:          | 6.75 MB           |
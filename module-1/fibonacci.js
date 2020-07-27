'use strict';

/**
 * The function returns the nth value of
 * the Fibonacci sequence
 *
 * @param {number} n (n >= 0)
 * @returns {number} Fibonacci number or 0 if any arguments are not proper
 */
function fibonacci(n) {
    let nThFibonacci = [0,1];
    /*
     * Your task is to calculate the nth value of the
     * Fibonacci sequence.
     * https://en.wikipedia.org/wiki/Fibonacci_number
     * Store the value in the nThFibonacci variable.
     * Also take into consideration the documentation of the function!
     */
    // PLACE YOUR CODE BETWEEN THIS...
    if (n < 1) {
        return 0;
    }  else {
        for (let i=1; i<n; i++) {
            nThFibonacci.push(nThFibonacci[i] + nThFibonacci[i-1]);
        }
        // nThFibonacci = fibonacci(n - 1) + fibonacci(n - 2);
    }
    // ...AND THIS COMMENT LINE!
    return nThFibonacci[(nThFibonacci.length) - 1];
}

module.exports = fibonacci;
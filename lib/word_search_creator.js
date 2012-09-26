var sys = require('sys'),
    assert = require('assert'),
    pretty_print,
    puzzle,
    insert_word,
    insert_word_test,
    fit_new_word;

puzzle = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

pretty_print = function (matrix) {
    var row;
    for (row in matrix) {
        sys.puts(matrix[row].join(' '));
    }
}

/* insert a word vertically into the puzzle grid */

insert_word = function (word, matrix, startx, starty) {
    var target = word.split('');

    for (letter in target) {
        var x, y;
        
        x = parseInt(startx) + parseInt(letter);
        y = starty;

        matrix[x][y] = target[letter];
    }

    return matrix;
}

/* 
 * fit words horizontally
 *
 * expects a matrix of 0's and letters 
 */

fit_new_word = function (word, matrix) {
    var target = word.split(''),
        index,
        row,
        column;

    for (character in target) {
        for (row in matrix) {
            for (column in matrix[row]) {
                if (matrix[row][column] === target[character]) {
                    console.log('match: ' + target[character]);
                    if (character > 0 && column > 0 && 
                        (matrix[row][column - 1] === target[character - 1] || 
                                         matrix[row][column - 1] === 0)) {
                        console.log('possible left-hand fit for %s: %s', target[character], matrix[row][column - 1])
                    }
                }
            }
        }
    }
}


insert_word_test = function () {
    var puzzle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    expected_result = [
        [0,0,0,0],
        [0,"B",0,0],
        [0,"A",0,0],
        [0,"Z",0,0]
    ];

    assert.deepEqual(expected_result, 
                     insert_word('BAZ', puzzle, 1, 1), 
                     "Should be able to insert words at arbitrary positions.");
}

insert_word_test();

insert_word('BAZ', puzzle, 1, 2);

fit_new_word('ZAP', puzzle);

pretty_print(puzzle);

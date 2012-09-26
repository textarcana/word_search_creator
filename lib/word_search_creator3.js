var sys = require('sys'),
    assert = require('assert'),
    pretty_print,
    puzzle,
    insert_word;


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

insert_word = function (word, matrix) {
    var failed_to_match;
    matrix.map(function  (row) {
        row.map(function  (character, index) {
            if (failed_to_match === true ||
                index > word.length - 1) {
                return false;
            } else if (character === 0 || 
                       character === word[index]) {
                console.log('possible match for %s: ', word[index], character);
            } else {
                failed_to_match = true;
            }
        });
    });
}

insert_word('BAZ', puzzle);

pretty_print(puzzle);

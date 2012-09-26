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

insert_word = function (word, matrix, startx, starty) {
    var target = word.split('');

    for (letter in target) {

        matrix[parseInt(startx) + parseInt(letter)][starty] = target[letter];
    }
}

insert_word('BAZ', puzzle, 1, 0);

pretty_print(puzzle);

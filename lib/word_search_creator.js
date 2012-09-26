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
    var target = word.split(''),
        index = 0;

    for (letter in target) {
        matrix[index][0] = target[letter];
        ++index;
    }
}

insert_word('foo', puzzle);

pretty_print(puzzle);

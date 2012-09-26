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
    var row,
        index,
        row_as_word,
        regex;

    matrix.map(function  (row, index) {
        row_as_word = row.join('');

        regex = new RegExp('^0{' + word.length + ',' + row.length + '}$');

        if (regex.test(row_as_word)) {
            console.log('good one');
        }
    });

    return matrix;
}

insert_word('BAZ', puzzle);

pretty_print(puzzle);

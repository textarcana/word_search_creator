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
        matcher,
        replacer;

    matrix.map(function  (row, index) {
        row_as_word = row.join('');

        matcher = new RegExp('0{' + word.length + ',' + row.length + '}');

        replacer = new RegExp('(0{' + word.length  + '})');

        if (matcher.test(row_as_word)) {

            matrix[index] = row_as_word.
                replace(replacer, word).
                split('');
        }
    });

    return matrix;
}

insert_word('BAZ', puzzle);

pretty_print(puzzle);

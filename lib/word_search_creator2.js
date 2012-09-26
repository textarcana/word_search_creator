var sys = require('sys'),
    assert = require('assert'),
    pretty_print,
    puzzle,
    insert_word_horizontal,
    vertical_insert;

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

insert_word_horizontal = function (word, matrix) {
    var row,
        index,
        row_as_word,
        matcher,
        replacer,
        success;

    matrix.map(function  (row, index) {
        if (success == true) {
            return false;
        }

        row_as_word = row.join('');
        matcher = new RegExp('0{' + word.length + ',' + row.length + '}');
        replacer = new RegExp('(0{' + word.length  + '})');

        if (matcher.test(row_as_word)) {
            matrix[index] = row_as_word.
                replace(replacer, word).
                split('');

            success = true;
        }
    });
}

vertical_insert = function (word, matrix) {
    var row,
        column,
        index,
        column_as_word,
        matcher,
        replacer,
        success;

    if (success == true) {
        return false;
    }

    matrix.map(function  (row, index) {

    });

    if (matcher.test(column_as_word)) {

        success = true;
    }
}

insert_word_horizontal('BAZ', puzzle);
vertical_insert('ZAP', puzzle);


pretty_print(puzzle);

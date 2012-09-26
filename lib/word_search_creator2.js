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

insert_word_horizontal('BAZ', puzzle);
insert_word_horizontal('BOZ', puzzle);
insert_word_horizontal('BUZZ', puzzle);
insert_word_horizontal('CATS', puzzle);

pretty_print(puzzle);

var sys = require('sys'),
    assert = require('assert'),
    pretty_print,
    puzzle,
    insert_word,
    rotate_matrix;

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
};

insert_word = function (word, matrix) {
    var success;

    matrix.map(function  (row, row_index) {
        var failed_to_match;
        if (success === true) {
            return false;
        }
        row.map(function  (character, index) {
            if (failed_to_match === true ||
                index > word.length - 1) {
                return false;
            } else if (character === 0 || 
                       character === word[index]) {
                console.log('possible match for %s: ', word[index], character);
                if (index === word.length - 1) {
                    console.log('complete match!');
                    success = true;
                    word.split('').map(function  (character, index) {
                        matrix[row_index][index] = character;
                    });
                }
            } else {
                failed_to_match = true;
            }
        });
    });
};

rotate_matrix = function (matrix) {
    var new_matrix = [];
    matrix.map(function  (row, row_index) {
        new_row = [];
        row.map(function  (character, index) {
            matrix.map(function  (inner_row) {
                new_row.push(inner_row[index]);
            });
            new_matrix.push(new_row);
        });
    });
    return new_matrix;
};

insert_word('CATS', puzzle);
insert_word('ZOO', puzzle);
insert_word('LION', puzzle);
insert_word('WALLABY', puzzle);
insert_word('PUMA', puzzle);

pretty_print(puzzle);

pretty_print(rotate_matrix(puzzle));

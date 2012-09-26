var sys = require('sys'),
    assert = require('assert'),
    fs = require('fs'),
    input_file_as_array = [],
    pretty_print,
    puzzle,
    insert_word,
    rotate_matrix,
    filter_for_input;

puzzle = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

pretty_print = function (matrix) {
    var row;
    for (row in matrix) {
        sys.puts(matrix[row].join(' ').replace(/0/g, ' '));
    }
};

insert_word = function (word, matrix) {
    var success;

    matrix.map(function  (row, row_index) {
        var failed_to_match,
            column_modifier = 0;
        if (success === true) {
            return false;
        }
        row.map(function  (character, index) {
            if (failed_to_match === true ||
                index > word.length - 1) {
                return false;
            } else if (character === 0 || 
                       character === word[index - column_modifier]) {
//                console.log('possible match for %s: ', word[index + column_modifier], character);
                if (index - column_modifier === word.length - 1) {
//                    console.log('complete match!');
                    success = true;
                    word.split('').map(function  (character, index) {
                        matrix[row_index][index - column_modifier] = character;
                    });
                }

            }  else if (index < (row.length - word.length)) {
                column_modifier += 1;
            }else {
                failed_to_match = true;
            }
        });
    });

    if (success !== true) {
        console.log('Sorry! Could not fit: ', word);
    }
};

insert = function (words) {
    words.map(function (word) {
        insert_word(word, puzzle);
        puzzle = rotate_matrix(puzzle);
    });
}

/* we assume the matrix is always square */

rotate_matrix = function (matrix) {
    var new_matrix = [];

        matrix[0].map(function  (character, index) {
            var new_row = [];
            matrix.map(function  (row, row_index) {
                new_row.push(row[index]);
            });
            new_matrix.push(new_row);
        });
    return new_matrix;
};

filter_for_input = function (list) {
    var result = [];
    list.map(function (data) {
        if (data !== undefined && data !== '') {
            result.push(data);
        }
    });
    return result;
}

fs.readFile('../conf/at_the_zoo.txt', 'utf8', function (err,data) {
    var sanitized_input;
    if (err) {
        return console.log(err);
    }
    file_as_array = data.split('\n');

    sanitized_input = filter_for_input(file_as_array);

    insert(sanitized_input);
    pretty_print(puzzle);
});

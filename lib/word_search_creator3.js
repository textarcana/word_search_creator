var sys = require('sys'),
    assert = require('assert'),
    fs = require('fs'),
    input_file_as_array = [],
    pretty_print,
    puzzle,
    alphabet,
    commonly_occurring_letters,
    insert_word,
    rotate_matrix,
    flip_matrix,
    filter_for_input,
    word_list_from_file,
    receive_input,
    place_word_on_grid;

all_letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 
               'H', 'I', 'J', 'K', 'L', 'M', 'N', 
               'O', 'P', 'Q', 'R', 'S', 'T', 'U', 
               'V', 'W', 'X', 'Y', 'Z'];

/* leave out j, q, x and z
 * see http://en.wikipedia.org/wiki/Letter_frequency */

commonly_occurring_letters = [ 'E', 'T', 'A', 'O', 'I', 'N', 
                               'S', 'H', 'R', 'D', 'U', 'C', 
                               'M', 'F', 'W', 'Y', 'P', 'V', 
                               'B', 'G', 'K' ];

alphabet = commonly_occurring_letters;

puzzle = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

pretty_print = function (matrix) {
    var row;
    for (row in matrix) {
        sys.puts(matrix[row].join(' ').replace(/0/g, ' '));
    }
};

obfuscated_print = function (matrix) {
    var row,
    random,
    character;

    for (row in matrix) {
        for (character in matrix[row]) {
            if (matrix[row][character] === 0) {
                random = Math.floor(Math.random() * alphabet.length);
                matrix[row][character] = alphabet[random];
            }
        }
        sys.puts(matrix[row].join(' '));
    }
};

place_word_on_grid = function (word, matrix, row_index, column_modifier) {
    word.split('').map(function  (character, index) {
        matrix[row_index][index - column_modifier] = character;
    });
};

insert_word_horizontal = function (word, matrix) {
    var row,
        index,
        row_as_word,
        matcher,
        replacer,
        success = false;

    matrix.map(function  (row, index) {
        if (success === true) {
            return false;
        }

        row_as_word = row.join('');

        var full_pattern = row_as_word;

        for (var i = 0; i < (row.length - word.length); ++i) {
            if (success === true) {
                continue;
            }

            var pattern = full_pattern.substring(i, (word.length + i));
            matcher = new RegExp(pattern.replace(/0/g, '.'));
            replacer = new RegExp('(.*)(' + pattern + ')(.*)');

            if (matcher.test(word)) {
                matrix[index] = row_as_word.
                    replace(replacer, "$1" + word + "$3").
                    split('');

                success = true;
            }
        }


    });

//    console.log(success);

    return success;

};


insert_word = function (word, matrix) {
    var success;

    matrix.map(function  (row, row_index) {
        if (success === true) {
            return false;
        }

        success = insert_word_horizontal(word, matrix);
    });

    if (success !== true) {
        return false;
    } else {
        return true;
    }
};

insert = function (words) {
    var original_matrix, 
        result;

    words.map(function (word, index) {
        var backward_word = word.split('').reverse().join('');

        puzzle = rotate_matrix(puzzle);

        if (index % 4 === 0) {
            puzzle = flip_matrix(puzzle);
        }

        result = insert_word(word, puzzle);

        if (result === false) {
            result = insert_word(backward_word, puzzle);
        }

        if (result === false) {
            puzzle = flip_matrix(puzzle);
            result = insert_word(word, puzzle);
            puzzle = flip_matrix(puzzle);
        }

        if (result === false) {
            result = insert_word(backward_word, puzzle);
        }

        if (result === false) {
            puzzle = rotate_matrix(puzzle);
            result = insert_word(word, puzzle);
            puzzle = rotate_matrix(puzzle);
        }

        if (result === false) {
            result = insert_word(backward_word, puzzle);
        }

        if (result === false) {
            console.log('Sorry! Could not fit: ', word);
        }
    });

    if (words.length % 2 !== 0) {
        puzzle = flip_matrix(puzzle);
    }

};

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

flip_matrix = function (matrix) {
    var new_matrix = [];

        matrix.map(function  (row, index) {
            new_matrix.push(row.reverse());
        });
    return new_matrix;
};


filter_for_input = function (list) {
    var result = [];
    list.map(function (data) {
        if (data === undefined || data === '') {
            /* ignore blank lines */
        } else if ((/\s/).test(data)) {
            console.log('OOPS! Ignoring word with spaces: ' + data);
        } else if ((/[^A-Za-z]/).test(data)) {
            console.log('OOPS! Ignoring word with non-alphanumerics: ' + data);
        }else {
            result.push(data.toUpperCase());
        }
    });
    return result;
};

var word_list_from_file = function (path) {
    fs.readFile(path, 'utf8', function (err,data) {
        var sanitized_input;
        if (err) {
            return console.log(err);
        }
        file_as_array = data.split('\n');

        sanitized_input = filter_for_input(file_as_array);

        insert(sanitized_input);

        sys.puts('\nAnswer Key:\n');

        pretty_print(puzzle);

        sys.puts('---- ---- ---- ---- ---- ----');

        obfuscated_print(puzzle);

    });
};

var receive_input = function () {
    var name_for_script;
    if (process.argv.length < 3) {
        name_for_script = process.argv[1].match(/\/([^\/]+)$/)[1];
        console.log('Usage: ' + name_for_script + ' <path to word list file>');
        process.exit(1);
    } else {
        word_list_from_file(process.argv[2]);
    }
};

receive_input();

/* Test me with
 *
 *    jshint word_search_creator3.js && \
 *        cd .. && test/word_search_creator3_test.sh 
 *
 */

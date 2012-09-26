var sys = require('sys'),
    assert = require('assert'),
    pretty_print,
    puzzle,
    insert_word,
    insert_word_test;

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
        var x, y;
        
        x = parseInt(startx) + parseInt(letter);
        y = starty;

        matrix[x][y] = target[letter];
    }

    return matrix;
}

insert_word_test = function () {
    var puzzle = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    expected_result = [
        [0,0,0,0],
        [0,"B",0,0],
        [0,"A",0,0],
        [0,"Z",0,0]
    ];

    assert.deepEqual(expected_result, 
                     insert_word('BoZ', puzzle, 1, 1), 
                     "Should be able to insert words at arbitrary positions.");
}

insert_word_test();

insert_word('BAZ', puzzle, 1, 2);

pretty_print(puzzle);

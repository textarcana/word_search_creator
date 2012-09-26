var sys = require('sys'),
    assert = require('assert'),
    pretty_print,
    puzzle,
    row;

puzzle = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

pretty_print = function (puzzle) {
    for (row in puzzle) {
        sys.puts(puzzle[row].join(' '));
    }
}

pretty_print(puzzle);

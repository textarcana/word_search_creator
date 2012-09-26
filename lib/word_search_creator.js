var sys = require('sys');

var puzzle = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
],
row;

for (row in puzzle) {
    sys.puts(puzzle[row].join(' '));
}

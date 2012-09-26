require 'matrix'

puzzle = Matrix[
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
               ]

each_with_index do |e, row, col|
  puts "#{e} at #{row}, #{col}"
end

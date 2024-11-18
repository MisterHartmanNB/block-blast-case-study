# block-blast-case-study
Making block blast as a case study for video game design using p5.js

First, I played block-blast.io, and documented the following algorithm for how the game runs:

Block Blast Algorithm:
Draw an 8x8 Grid, a Score, and Block Slots
Provide 3 potential block arrays that the user can choose to place on the grid
The user clicks an array to choose it
If no blocks fit on the grid, the game ends
Blocks preview on the grid, following the mouse
All completed rows and columns self-delete with a satisfying animation, and increase the player’s score
Score 1 point per block placed, 20 points per row cleared, +10 per combo
Each consecutive turn at least one row is cleared, all rows count for the same value when cleared the same turn

I made this github repository and decided the best aproach was to make a codespace and program in vscode
I used p5.vscode with live-p5 to see what I was doing, and put in copilot as it seems to be the industry standard
Used p5.vscode to create the p5 project
This is the first commit, create p5.js project

Learned that live preview is a way better option, so I switched to that extension

I wrote a skeleton for the code based on the algorithm, copilot helped a lot!
<h1>TicTacToe</h1>
<p>This tic tac toe assignment was a big hurdle for me, as this was my first exposure to using states within REACT. After so many years of being able to mutate variables directly, using states was a bit of a head scratcher for me at first. However like all things in CS, once you can wrap your head around it, it was fairly easy working with.</p>
<p>This was a good introduction as the connect4 assingment pretty much just built on these concepts, however the visual side of this is exactly what you would expect from a tictactoe game, once someone reaches the winning criteria the game ends. Howeve the real fun stuff is under the cover in the code.</p>
<img width="146" alt="Screenshot 2024-08-15 at 3 12 26 PM" src="https://github.com/user-attachments/assets/7182b12c-73a2-4ab0-b19e-6366b75f4773">
<p>Once i begin to understand how useState could be used it was farily simple to implement. With one main function and function within each tile to handle the click, i was able to track whos turn it was and create the icon , x's and o's, for both users.</p>
<img width="561" alt="Screenshot 2024-08-15 at 3 14 55 PM" src="https://github.com/user-attachments/assets/ee0707bb-defe-46df-9ff8-a6fa6469e563">
<img width="607" alt="Screenshot 2024-08-15 at 3 15 18 PM" src="https://github.com/user-attachments/assets/15decff6-3796-41ec-bc95-cd5ed71ac228">
<p>Calculating the winners was a little bit annoying because i was forced to hard code in each of the winning criteria, as you can see in the code here, around line <a href="src/app.js">67</a></p>

exports.seed = function (knex, Promise) {
  return knex.raw('TRUNCATE TABLE puzzles RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('puzzles').insert([{
        puzzle: "2 + 2",
        answer: "4"
      }, {
        puzzle: "Mary’s father has 5 daughters – Nana, Nene, Nini, Nono. What is the fifth daughters name?",
        answer: "mary"
      }, {
        puzzle: "What word becomes shorter when you add two letters to it?",
        answer: "short"
      }, {
        puzzle: "10 - 2 x 5",
        answer: "0"
      }, {
        puzzle: "What occurs once in a minute, twice in a moment and never in one thousand years?",
        answer: "the letter m"
      }, {
        puzzle: "What is at the end of a rainbow?",
        answer: "the letter w"
      }, {
        puzzle: "What is so delicate that saying its name breaks it?",
        answer: "silence"
      }, {
        puzzle: "3 x 4 - 6 / 3",
        answer: "10"
      }, {
        puzzle: "You walk into a room with a match, a karosene lamp, a candle, and a fireplace. Which do you light first?",
        answer: "the match"
      }, {
        puzzle: "If a blue house is made out of blue bricks, a yellow house is made out of yellow bricks and a pink house is made out of pink bricks, what is a green house made of?",
        answer: "glass"
      }, {
        puzzle: "20 / 5 + 10 x 2",
        answer: "24"
      }, {
        puzzle: "Mr. Blue lives in the blue house, Mr. Pink lives in the pink house, and Mr. Brown lives in the brown house. Who lives in the white house?",
        answer: "the president"
      }, {
        puzzle: "A house has 4 walls. All of the walls are facing south, and a bear is circling the house. What color is the bear?",
        answer: "white"
      }, {
        puzzle: "40 / 4 x (5 - 3)",
        answer: "20"
      }, {
        puzzle: "(4 + 5) x (7 - 4)",
        answer: "27"
      }, {
        puzzle: "Six _ Under (TV show)",
        answer: "feet"
      }, {
        puzzle: "Trivial _ (Game)",
        answer: "pursuit"
      }, {
        puzzle: "Red Hot Chili _ (Music)",
        answer: "peppers"
      }, {
        puzzle: "Gone with the _ (Movies)",
        answer: "wind"
      }, {
        puzzle: "What is the saying: Che_r _p _ut_erc_p",
        answer: "cheer up buttercup"
      }, {
        puzzle: "What is the saying: G__d m_rni_g",
        answer: "good morning"
      }, {
        puzzle: "What comes next: 1, 1, 2, 3, 5, _",
        answer: "8"
      }, {
        puzzle: "What comes next: 1, 2, 2, 4, 8, _",
        answer: "32"
      }, {
        puzzle: "Li_e _s l_ke a bo_ o_ cho_ol_tes",
        answer: "life is like a box of chocolates"
      }, {
        puzzle: "What does s eqaul: s + s + s = 15 ",
        answer: "5"
      }, {
        puzzle: "what does s equal: s x s + t + t = 10",
        answer: "2"
      }, {
        puzzle: "What comes next: 3, 3, 6, 2, 8, 4, 12, _",
        answer: "3"
      }, {
        puzzle: "What does s equal: t / t + s = 14",
        answer: "13"
      }]);
    });
};
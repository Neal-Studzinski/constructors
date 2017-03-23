  //for loop 2-14
 // [hearts,diamonds,clubs,spades]
 function createDeck() {
   var suitArr = ['Clubs', 'Spades', 'Hearts', 'Diamonds']
   var cardArr = []

   function Card(suit, value) {
     'use strict';
     this.suit = suit;
     this.value = value;
   }

   suitArr.forEach(function (s) {
     for (var i=1; i<=13; i++) {
       var card = new Card(s, i);
       if (i === 1) {
         card.value = 'A';
       }else if (i === 11) {
         card.value = 'J';
       }else if (i === 12) {
         card.value = 'Q';
       }else if (i === 13) {
           card.value = 'K';
       }
       cardArr.push( card );
     }
   })

   cardArr.forEach(function(card) {

     $('.card-container').append(`<div>${card.value} of ${card.suit}</div>`)
   })
 }

 ///////////////////////////////////////////////////////////////////////
 function rollDice(s) {
   var roll = new Roll(s)
   var allProbs = getProbabilities(s)
   const rollDie = {
     selector: ".die-results",
     render: function () {
       return $(`<div>Rolled ${roll.sides}d6 for a total of: ${roll.value}</div>`);
     }
   };

   function Roll(sides) {
     'use strict';
     this.sides = sides;
     this.value = 0;
     for (var i=sides; i>0; i--) {
       this.value += Math.ceil(Math.random() * 6);
     }
   }

  /////////////////////////////////////////////////////////////////////
  function getProbabilities(s) {
      results = {}
      startArr = []
      var totalSides = Number(s)
      for (var i=totalSides; i<=(s*6); i++) {
        startArr.push(i);
      }
      console.log(startArr)

      for (var i=0;i<1000;i++) {
        startArr.forEach(function(item) {
          var roll = new Roll(s)
          if (roll.value === item) {
            if (!results[item]) {
              results[item] = 1
            } else {
              results[item] += 1
            }
          }
        })
      }
      return results
    }

    function showProbabilities() {
      arr = []
      Object.keys(allProbs).forEach(function (key) {
        arr.push(`${key} is ${allProbs[key]}`)
      });
      return arr
    }

    $(rollDie.selector).append(rollDie.render);
    showProbabilities().forEach(function(item) {
      $(rollDie.selector).append('<div>' + item + '</div>')
    })
  }

  $('.create-deck').on('click', function() {
    createDeck();
  });

  $('.create-die').on('click', function() {
    rollDice(this.value);
  });

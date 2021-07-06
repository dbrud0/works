const Row = 3;
const Column = 3;
const Color = ['#FFFD99', '#FFFD99', '#A7FF99', '#A7FF99', '#99B3FF',
  '#99B3FF', '#DA99FF', '#DA99FF',
  '#FF4349'];
let Color_Pic = Color.slice();
let Color_Set = [];
let Click_pg = true;
let Clicked_Card = [];
let Completion_Card = [];
let Start_Time;
function Shuffle() {
  for (let i = 0; Color_Pic.length > 0; i += 1) {
    Color_Set = Color_Set.concat(Color_Pic.splice(Math.floor
      (Math.random() * Color_Pic.length), 1));
  } // 카드 색상 랜덤으로 섞기 
}

function Card_Setting(Row, Column) {
  Click_pg = false;
  for (let i = 0; i < Row * Column; i += 1) {
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = Color_Set[i]; // 카드 색깔 설정 
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function (c) {
      card.addEventListener('click', function () {
        if (Click_pg && !Completion_Card.includes(c)) {
          c.classList.toggle('flipped');
          Clicked_Card.push(c);
          if (Clicked_Card.length === 2) {
            if (Clicked_Card[0].querySelector('.card-back')
              .style.backgroundColor
              === Clicked_Card[1].querySelector('.card-back')
                .style.backgroundColor) {
              Completion_Card.push(Clicked_Card[0]);
              Completion_Card.push(Clicked_Card[1]);
              Clicked_Card = [];
              if (Completion_Card.length === 12) {
                let Last_Time = new Date();
                alert('축하합니다!' + (Last_Time - Start_Time) / 1000
                  + '초 걸렸습니다.');
                document.querySelector('#wrapper').innerHTML = '';
                //
                Color_Pic = Color.slice();
                Color_Set = [];
                Completion_Card = [];
                Start_Time = null;
                Shuffle();
                Card_Setting(Row, Column);
              }
            } else { // 뒤집은 카드 색이 다를 경우
              Click_pg = false;
              setTimeout(function () {
                Clicked_Card[0].classList.remove('flipped');
                Clicked_Card[1].classList.remove('flipped');
                Click_pg = true;
                Clicked_Card = [];
              }, 1000);
            }
          }
        }
      });
    })(card);
    document.querySelector('#wrapper').appendChild(card);
  }

  document.querySelectorAll('.card').forEach(function (card, index) { // 게임 시적 전 카드 공개
    setTimeout(function () {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function () { // 카드 뒤집기
    document.querySelectorAll('.card').forEach(function (card) {
      card.classList.remove('flipped');
    });
    Click_pg = true;
    Start_Time = new Date();  //시작시간 설정
  }, 5000);
}

Shuffle();
Card_Setting(Row, Column);  //카드세팅



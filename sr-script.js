document.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('.card');
  const rusFace = document.querySelector('.card__face--rus p');
  const srbCyrFace = document.querySelector('.card__face--srb .srb-cyr');
  const srbLatFace = document.querySelector('.card__face--srb .srb-lat');
  let usedIndices = [];
  let isSwipeAction = false; // Добавляем флаг для определения свайпа

  function showWord() {
    const wordsArray = words.words;
    if (usedIndices.length === wordsArray.length) {
      alert("Все слова были показаны");
      usedIndices = []; // Сброс, если нужно начать заново
      return;
    }

    let index;
    do {
      index = Math.floor(Math.random() * wordsArray.length);
    } while (usedIndices.includes(index));
    usedIndices.push(index);

    const word = wordsArray[index];
    const showRus = Math.random() > 0.5;

    if (showRus) {
      rusFace.textContent = word.rus;
      srbCyrFace.textContent = word.ser_cyr;
      srbLatFace.textContent = word.ser_lat;
      card.classList.remove('is-flipped');
    } else {
      srbCyrFace.textContent = word.ser_cyr;
      srbLatFace.textContent = word.ser_lat;
      rusFace.textContent = word.rus;
      card.classList.add('is-flipped');
    }
  }

  card.addEventListener('click', () => {
    if (!isSwipeAction) { // Проверяем, был ли свайп
      card.classList.toggle('is-flipped');
    }
    isSwipeAction = false; // Сбрасываем флаг после обработки клика
  });

  let startX;
  card.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    isSwipeAction = false; // Сброс флага при начале касания
  }, false);

  card.addEventListener('touchend', function(e) {
    let endX = e.changedTouches[0].clientX;

    if (Math.abs(startX - endX) > 100) { // Условие для определения свайпа
      isSwipeAction = true; // Устанавливаем флаг свайпа
      showWord();
    }
  }, false);

  showWord(); // Показать первое слово при загрузке
});

import { parseHTML, state } from "./index.js";
import { resetGame } from "./game-utils.js";
import {
  carNamesSection,
  tryNumSection,
  resultSection,
  winnerSection,
} from "./elements.js";

const hideElement = (element) => {
  return (element.style.display = "none");
};

export const showElement = (element) => {
  return (element.style.display = "block");
};

export const resetCarNamesInput = () => {
  carNamesSection.querySelector("input").value = "";
};

export const resetTryNumInput = () => {
  tryNumSection.querySelector("input").value = "";
};

export const resetView = () => {
  hideElement(tryNumSection);
  hideElement(resultSection);
  hideElement(winnerSection);
};

const showCarName = (carName) => {
  return parseHTML(`<div class="car-player mr-2">${carName}</div>`);
};

const showTotalStep = () => {
  return parseHTML(`<div class="forward-icon mt-2">⬇️️</div>`);
};

export const setResultView = () => {
  resultSection.querySelector("div").innerHTML = "";

  state.cars.forEach((car) => {
    const resultDivString = `<div></div>`;
    const resultDiv = parseHTML(resultDivString);

    resultDiv.appendChild(showCarName(car.name));
    for (let idx = 0; idx < car.totalStep; idx++) {
      const step = showTotalStep();
      resultDiv.appendChild(step);
    }
    resultSection.querySelector("div").append(resultDiv);
  });
};

const getWinnerText = (winners) => {
  let winnerText = "";
  if (winners.length === 1) {
    winnerText = winners[0];
  } else {
    winnerText = winners.join(", ");
  }

  return winnerText;
};

export const setWinnerView = (winners) => {
  winnerSection.innerHTML = "";
  const winnerText = getWinnerText(winners);

  const winnerTemplateString = `<h2>🏆 최종 우승자: ${winnerText} 🏆</h2>`;
  const winnerTemplate = parseHTML(winnerTemplateString);
  const resetBtnString = `<div class="d-flex justify-center">
                            <button type="button" class="btn btn-cyan">다시 시작하기</button>
                          </div>`;
  const resetBtn = parseHTML(resetBtnString);

  winnerSection.append(winnerTemplate);
  winnerSection.append(resetBtn);

  resetGame();
};

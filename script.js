
const inputs = [
  document.getElementById('Solve1'),
  document.getElementById('Solve2'),
  document.getElementById('Solve3'),
  document.getElementById('Solve4'),
  document.getElementById('Solve5')
];
const targetInput = document.getElementById('target');


const pTags = document.querySelectorAll('p');
const guarantee4thP = pTags[0];
const guarantee5thP = pTags[1];
const bestAvgP = pTags[2];
const worstAvgP = pTags[3];

function formatTime(num) {
  if (num === Infinity || isNaN(num)) return 'DNF';
  return num.toFixed(2);
}


function calculateAo5(solves) {
  const sorted = [...solves].sort((a, b) => a - b);

  const middleThreeSum = sorted[1] + sorted[2] + sorted[3];
  return middleThreeSum / 3;
}

function updateStats() {

  const enteredSolves = inputs
    .map(input => parseFloat(input.value))
    .filter(val => !isNaN(val) && val > 0);

  const target = parseFloat(targetInput.value);


  guarantee4thP.textContent = 'To guarantee target avg on 4th solve: ---';
  guarantee5thP.textContent = 'To guarantee target avg on 5th solve: ---';
  bestAvgP.textContent = 'Best Possible Avg: ---';
  worstAvgP.textContent = 'Worst Possible Avg: ---';

  if (enteredSolves.length === 3 && !isNaN(target) && target > 0) {

    const sorted3 = [...enteredSolves].sort((a, b) => a - b);
    const neededSum = target * 3;

    const maxS4 = neededSum - (sorted3[1] + sorted3[2]);

    if (maxS4 >= sorted3[0]) {
      guarantee4thP.textContent = `To guarantee target avg on 4th solve: ${formatTime(maxS4)}`;
    } else {

      guarantee4thP.textContent = `To guarantee target avg on 4th solve: Need 5th Solve`;
    }
  }

  if (enteredSolves.length === 4) {

    const bpa = calculateAo5([...enteredSolves, 0]);
    bestAvgP.textContent = `Best Possible Avg: ${formatTime(bpa)}`;

    const wpa = calculateAo5([...enteredSolves, Infinity]);
    worstAvgP.textContent = `Worst Possible Avg: ${formatTime(wpa)}`;


    if (!isNaN(target) && target > 0) {
      const sorted4 = [...enteredSolves].sort((a, b) => a - b);
      const neededSum = target * 3;

      if (wpa <= target) {
        guarantee5thP.textContent = `To guarantee target avg on 5th solve: Guaranteed`;
      } else if (bpa > target) {
        guarantee5thP.textContent = `To guarantee target avg on 5th solve: Impossible`;
      } else {

        const maxS5 = neededSum - (sorted4[1] + sorted4[2]);
        guarantee5thP.textContent = `To guarantee target avg on 5th solve: ${formatTime(maxS5)}`;
      }
    }
  }

  if (enteredSolves.length === 5) {
    const finalAvg = calculateAo5(enteredSolves);
    bestAvgP.textContent = `Final Average: ${formatTime(finalAvg)}`;
    worstAvgP.textContent = ``;
  }
}

inputs.forEach(input => input.addEventListener('input', updateStats));
targetInput.addEventListener('input', updateStats);

const arrayContainer = document.querySelector(".array-container");
const btn = document.querySelectorAll(".btn");

let unsortedArray = [];

let delay = 10;
let arrayLength = 200;

document.querySelector(".array-input").addEventListener("input", () => {
  arrayLength = document.querySelector(".array-input").value;
  if (arrayLength > 500) {
    arrayLength = 500;
  }
  createArray();
});

document.querySelector(".slow").addEventListener("click", () => {
  delay = 100;
  document.querySelector(".slow").classList.add("active");
  document.querySelector(".medium").classList.remove("active");
  document.querySelector(".fast").classList.remove("active");
});

document.querySelector(".medium").addEventListener("click", () => {
  delay = 10;
  document.querySelector(".slow").classList.remove("active");
  document.querySelector(".medium").classList.add("active");
  document.querySelector(".fast").classList.remove("active");
});

document.querySelector(".fast").addEventListener("click", () => {
  delay = 0;
  document.querySelector(".slow").classList.remove("active");
  document.querySelector(".medium").classList.remove("active");
  document.querySelector(".fast").classList.add("active");
});

const createArray = () => {
  unsortedArray = [];
  arrayContainer.innerHTML = "";
  for (i = 0; i < arrayLength; i++) {
    let value = Math.floor(Math.random() * (window.innerHeight * 0.9));
    unsortedArray.push(value);
  }
  draw(unsortedArray);
};

//quickSort
const quickSort = async (array, start, end) => {
  btn.forEach((b) => {
    b.style = `pointer-events: none; opacity: .2;`;
  });
  if (start >= end) {
    return;
  }

  let index = await partition(array, start, end);
  await quickSort(array, start, index - 1);
  await quickSort(array, index + 1, end);
  btn.forEach((b) => {
    b.style = ``;
  });
  return array;
};

const partition = async (array, start, end) => {
  let pivotIndex = start;
  let pivotValue = array[end];
  for (i = start; i < end; i++) {
    if (array[i] < pivotValue) {
      await swap(array, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(array, pivotIndex, end);
  return pivotIndex;
};

//mergeSort
const mergeSort = async (array) => {
  if (array.length === 1) return array;

  const arrayMiddle = Math.floor(array.length / 2);
  const firstHalf = await mergeSort(array.slice(0, arrayMiddle));
  const secondHalf = await mergeSort(array.slice(arrayMiddle));

  const sortedArray = [];
  let i = 0,
    j = 0;

  while (i < firstHalf.length && j < secondHalf.length) {
    if (firstHalf[i] < secondHalf[j]) {
      sortedArray.push(firstHalf[i++]);
    } else {
      sortedArray.push(secondHalf[j++]);
    }
  }

  while (i < firstHalf.length) {
    sortedArray.push(firstHalf[i++]);
  }
  while (j < secondHalf.length) {
    sortedArray.push(secondHalf[j++]);
  }
  return sortedArray;
};

//Mark Sort
const bubbleSort = async (array) => {
  btn.forEach((b) => {
    b.style = `pointer-events: none; opacity: .2;`;
  });
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        await swap(array, j, j + 1);
      }
    }
  }
  btn.forEach((b) => {
    b.style = ``;
  });
  return array;
};

//Button clicks
document.querySelector(".merge").addEventListener("click", async () => {
  arrayContainer.innerHTML = "";
  draw(await mergeSort(unsortedArray));
});

document.querySelector(".quick").addEventListener("click", async () => {
  draw(await quickSort(unsortedArray, 0, unsortedArray.length - 1));
});

document.querySelector(".bubble").addEventListener("click", async () => {
  draw(await bubbleSort(unsortedArray));
});

const draw = (arr) => {
  arrayContainer.innerHTML = "";
  arr.forEach((value) => {
    const bar = document.createElement("div");
    const spotSize = window.innerWidth / arrayLength;
    bar.classList.add("bar");
    bar.style = `width: ${spotSize}px; height: ${value}px; border-top: ${spotSize}px solid hsl(${
      (value / 200) * 110
    }, 100%, 78%)`;
    arrayContainer.appendChild(bar);
  });
};

let sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const swap = async (array, a, b) => {
  await sleep(delay);
  draw(array);
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

createArray();

let tutPage = 1;

const tutorial = document.querySelector(".tutorial");
const skipTut = document.querySelector(".skip-tut");
const tutorialCard = document.querySelector(".tutorial-page");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const tut = document.querySelector(".tut");

skipTut.addEventListener("click", () => {
  tutorial.style = `display: none;`;
});

tut.addEventListener("click", () => {
  tutorial.style = `display: flex;`;
});

const displayTut = () => {
  if (tutPage == 1) {
    tutorialCard.innerHTML = `<p>1/5</p>
        <h1>Welcome to my Sorting Algorithm Visualizer</h1>
        <p>This tutorial will walk you through all the features of this application.</p>
        <img src="./images/sort-icon.png" alt="">`;
  } else if (tutPage == 2) {
    tutorialCard.innerHTML = `<p>2/5</p>
    <h1>What is a Sorting Algorithm?</h1>
    <p>Basically, a sorting algorithm sorts an array of number from smallest to largest. In this case we use dots to indicate its value in height, resulting in a sky full of stars. But when sorted a staight line will go from the bottom-left to the top-right.</p>
    <img src="./images/sort2-gif.gif" alt="">`;
  } else if (tutPage == 3) {
    tutorialCard.innerHTML = `<p>3/5</p>
    <h1>Let me introduce you to the algorithms</h1>
    <p>On the right of the nav-bar you will find the three sorting algorithms. Each have there own way to sort the stars. Click on them to see them work!</p>
    <p><strong>Merge Sort:</strong> Merge keeps dividing the array in subarrays until each array has only one star. Then it compares the first star of two subarrays and merge them together repeating to merg until a fully sorted array. <strong>For some reason I can't seem te animate it so it ended up as an "instant result algoritm".</strong></p>
    <p><strong>Quick Sort:</strong> Chooses one star as a "pivot" every star with a lower value is pushed to the left and every star with a higher value to the right. then it repeats this same pattern for the left and right side. resulting in a recursive wat to sort the stars.</p>
    <p><strong>Bubble Sort:</strong> The slowest of all. It iterates over the array and pushes the hightest valeu to the end. repeating until all starts sorted.</p>
    <img src="./images/sort3.png" alt="">`;
  } else if (tutPage == 4) {
    tutorialCard.innerHTML = `<p>4/5</p>
    <h1>Put them to the test!</h1>
    <p>You can create an new array by clicking the "new array" on the left-side of the nav-bar. Slide the "Array Length:" slider to adjust the amount of stars ranging <strong>from 10 to 600!</strong> stars.<br>Click on the speed buttons to adjust the speed of the algoritm.</p>
    <img src="./images/sort4.png" alt="">`;
  } else if (tutPage == 5) {
    tutorialCard.innerHTML = `<p>5/5</p>
    <h1>Enjoy!</h1>
    <p>Go on and explore this application. I hope you have as much fun as I had making it. To see the tutorial again click the <i class="far fa-question-circle" style="color: rgb(185, 167, 65)"></i> in the top-right corner.</p>
    <p>If you want to see the source code, visit my <a href="https://github.com/JonkersDev">Github Account</a>.</p>`;
  }
};

nextBtn.addEventListener("click", () => {
  tutPage++;
  if (tutPage > 5) {
    tutPage = 1;
    tutorial.style = `display: none;`;
  }
  displayTut();
});

previousBtn.addEventListener("click", () => {
  tutPage--;
  if (tutPage < 1) {
    tutPage = 1;
  }
  displayTut();
});

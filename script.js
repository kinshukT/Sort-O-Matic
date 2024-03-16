function handleInput() {
    const inputField = document.getElementById('inputNumbers');
    let inputValue = inputField.value;
  
    // Remove non-digit characters except spaces and commas
    inputValue = inputValue.replace(/[^0-9,\s]/g, '');
  
    // Split the input by spaces or commas
    const numbers = inputValue.split(/[,\s]+/);
  
    // Iterate through each number and truncate to 3 digits
    const truncatedNumbers = numbers.map(num => num.slice(0, 3));
  
    // Join the truncated numbers with spaces
    inputValue = truncatedNumbers.join(' ');
  
    // Update the value in the input field
    inputField.value = inputValue;
  }
  
  // Event listener for input changes
  document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('inputNumbers');
    inputField.addEventListener('input', handleInput);
  });
  
  function createCells() {
    originalOrder = [];
    const inputNumbers = document.getElementById('inputNumbers').value;
    const numbersArray = inputNumbers.split(/\s+/).map(num => parseInt(num)).filter(num => !isNaN(num));
  
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      originalOrder.push(parseInt(cell.textContent.trim()));
    });
  
    if (numbersArray.length === 0) {
      alert('Please enter valid numbers separated by spaces.');
      return;
    }
  
    const cellsContainer = document.getElementById('cells');
    cellsContainer.innerHTML = '';
  
    numbersArray.forEach((number, index) => {
      const cell = document.createElement('div');
      cell.textContent = number;
      cell.classList.add('cell');
      if (index !== numbersArray.length - 1) {
        cell.style.marginRight = '10px';
      }
      cellsContainer.appendChild(cell);
    });
  }

  function resetCells() {
    originalOrder = []; // Clear the original order array
  
    // Clear all the current cells
    const cellsContainer = document.getElementById('cells');
    cellsContainer.innerHTML = '';
  
    // Recreate the cells in the original unsorted order
    createCells();
  }

  function arrangeCells(arrangement) {
    const cellsContainer = document.getElementById('cells');
    const cells = Array.from(cellsContainer.querySelectorAll('.cell'));
  
    if (arrangement === 'ascending') {
      cells.sort((a, b) => parseInt(a.textContent.trim()) - parseInt(b.textContent.trim()));
    } else if (arrangement === 'descending') {
      cells.sort((a, b) => parseInt(b.textContent.trim()) - parseInt(a.textContent.trim()));
    }
  
    cellsContainer.innerHTML = '';
    cells.forEach(cell => {
      cellsContainer.appendChild(cell);
    });
  }
  
   
  // Bubble Sort with swapping animation
  async function bubbleSortWithAnimation(arrangement) {
    const cells = document.querySelectorAll('.cell');
    const len = cells.length;
  
    for (let i = 0; i < len - 1; i++) {
      let swapped = false;
  
      for (let j = 0; j < len - i - 1; j++) {
        const value1 = parseInt(cells[j].textContent);
        const value2 = parseInt(cells[j + 1].textContent);
  
        cells[j].style.backgroundColor = 'red';
        cells[j + 1].style.backgroundColor = 'red';
  
        await new Promise(resolve => setTimeout(resolve, 500));
  
        if ((arrangement === 'ascending' && value1 > value2) || (arrangement === 'descending' && value1 < value2)) {
          const temp = cells[j].textContent;
          cells[j].textContent = cells[j + 1].textContent;
          cells[j + 1].textContent = temp;
          swapped = true;
  
          cells[j].style.backgroundColor = 'green';
          cells[j + 1].style.backgroundColor = 'green';
  
          await new Promise(resolve => setTimeout(resolve, 500));
        }
  
        cells[j].style.backgroundColor = '';
        cells[j + 1].style.backgroundColor = '';
      }
  
      if (!swapped) {
        break;
      }
    }
  }

  async function selectionSortWithAnimation(arrangement) {
    const cells = document.querySelectorAll('.cell');
    const len = cells.length;
  
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      cells[i].style.backgroundColor = 'red';
  
      for (let j = i + 1; j < len; j++) {
        cells[j].style.backgroundColor = 'red';
  
        await new Promise(resolve => setTimeout(resolve, 500));
  
        const val1 = parseInt(cells[minIndex].textContent);
        const val2 = parseInt(cells[j].textContent);
  
        if ((arrangement === 'ascending' && val2 < val1) || (arrangement === 'descending' && val2 > val1)) {
          cells[minIndex].style.backgroundColor = '';
          minIndex = j;
          cells[j].style.backgroundColor = 'red';
        } else {
          cells[j].style.backgroundColor = '';
        }
      }
  
      if (minIndex !== i) {
        await new Promise(resolve => setTimeout(resolve, 500));
  
        const temp = cells[i].textContent;
        cells[i].textContent = cells[minIndex].textContent;
        cells[minIndex].textContent = temp;
  
        cells[minIndex].style.backgroundColor = 'green';
        cells[i].style.backgroundColor = 'green';
      }
  
      cells[i].style.backgroundColor = '';
    }
  
    cells[len - 1].style.backgroundColor = '';
  }
  
  
  // Insertion Sort with swapping animation
  async function insertionSortWithAnimation(arrangement) {
    const cells = document.querySelectorAll('.cell');
    const len = cells.length;
  
    for (let i = 1; i < len; i++) {
      const key = parseInt(cells[i].textContent);
      let j = i - 1;
  
      cells[i].style.backgroundColor = 'red';
  
      await new Promise(resolve => setTimeout(resolve, 500));
  
      while (j >= 0 && (arrangement === 'ascending' ? parseInt(cells[j].textContent) > key : parseInt(cells[j].textContent) < key)) {
        cells[j].style.backgroundColor = 'green';
        cells[j + 1].textContent = cells[j].textContent;
  
        await new Promise(resolve => setTimeout(resolve, 500));
  
        cells[j].style.backgroundColor = '';
        j--;
      }
  
      cells[j + 1].textContent = key.toString();
      cells[i].style.backgroundColor = '';
    }
  }
  
  // Merge Sort with swapping animation
// Function to perform merge sort with animation
async function mergeSortWithAnimation(arrangement) {
  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;

    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
      leftArr[i] = arr[l + i].textContent;
      arr[l + i].style.backgroundColor = 'red'; // Highlight elements being compared
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    for (let j = 0; j < n2; j++) {
      rightArr[j] = arr[m + 1 + j].textContent;
      arr[m + 1 + j].style.backgroundColor = 'red'; // Highlight elements being compared
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Merge the temporary arrays back into arr[l..r]
    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
      if ((arrangement === 'ascending' && parseInt(leftArr[i]) <= parseInt(rightArr[j])) || 
          (arrangement === 'descending' && parseInt(leftArr[i]) >= parseInt(rightArr[j]))) {
        arr[k].textContent = leftArr[i++];
      } else {
        arr[k].textContent = rightArr[j++];
      }
      arr[k].style.backgroundColor = 'green'; // Highlight elements being merged
      await new Promise(resolve => setTimeout(resolve, 500));
      arr[k++].style.backgroundColor = ''; // Reset color after merge
    }

    // Copy remaining elements of leftArr[], if any
    while (i < n1) {
      arr[k].textContent = leftArr[i++];
      arr[k].style.backgroundColor = 'green'; // Highlight elements being merged
      await new Promise(resolve => setTimeout(resolve, 500));
      arr[k++].style.backgroundColor = ''; // Reset color after merge
    }

    // Copy remaining elements of rightArr[], if any
    while (j < n2) {
      arr[k].textContent = rightArr[j++];
      arr[k].style.backgroundColor = 'green'; // Highlight elements being merged
      await new Promise(resolve => setTimeout(resolve, 500));
      arr[k++].style.backgroundColor = ''; // Reset color after merge
    }
  };

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return;

    const m = l + Math.floor((r - l) / 2);

    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const cells = document.querySelectorAll('.cell');
  await mergeSort(cells, 0, cells.length - 1);
} 
  
// Quick Sort with swapping animation
async function quickSortWithAnimation(arrangement) {
  const partition = async (arr, low, high) => {
    const pivot = parseInt(arr[high].textContent);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      const val1 = parseInt(arr[j].textContent);
      arr[j].style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 500));

      if ((arrangement === 'ascending' && val1 < pivot) ||
          (arrangement === 'descending' && val1 > pivot)) {
        i++;
        const temp = arr[i].textContent;
        arr[i].textContent = arr[j].textContent;
        arr[j].textContent = temp;
      }

      arr[j].style.backgroundColor = '';
    }

    const temp = arr[i + 1].textContent;
    arr[i + 1].textContent = arr[high].textContent;
    arr[high].textContent = temp;

    arr[i + 1].style.backgroundColor = 'green';

    return i + 1;
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);

      await Promise.all([
        quickSort(arr, low, pi - 1),
        quickSort(arr, pi + 1, high)
      ]);
    }
  };

  const cells = document.querySelectorAll('.cell');
  await quickSort(cells, 0, cells.length - 1);

  // Mark the last element in green as it is also in its correct sorted position after sorting
  cells[cells.length - 1].style.backgroundColor = 'green';

  // Reset all cell colors back to their default state after sorting
  cells.forEach(cell => {
    cell.style.backgroundColor = '';
  });
}

  // Heapify function to create a max heap
  async function heapify(arr, n, i, arrangement) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    // Visual indication of elements being compared
    if (left < n) {
      arr[left].style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 500));
      arr[left].style.backgroundColor = '';
    }
    if (right < n) {
      arr[right].style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 500));
      arr[right].style.backgroundColor = '';
    }
  
    if (
      (arrangement === 'ascending' && left < n && parseInt(arr[left].textContent) > parseInt(arr[largest].textContent)) ||
      (arrangement === 'descending' && left < n && parseInt(arr[left].textContent) < parseInt(arr[largest].textContent))
    ) {
      largest = left;
    }
  
    if (
      (arrangement === 'ascending' && right < n && parseInt(arr[right].textContent) > parseInt(arr[largest].textContent)) ||
      (arrangement === 'descending' && right < n && parseInt(arr[right].textContent) < parseInt(arr[largest].textContent))
    ) {
      largest = right;
    }
  
    if (largest !== i) {
      // Swap elements in the UI
      const temp = arr[i].textContent;
      arr[i].textContent = arr[largest].textContent;
      arr[largest].textContent = temp;
  
      // Visual indication of swapping
      arr[i].style.backgroundColor = 'green';
      arr[largest].style.backgroundColor = 'green';
      await new Promise(resolve => setTimeout(resolve, 500));
  
      // Revert back to default color
      arr[i].style.backgroundColor = '';
      arr[largest].style.backgroundColor = '';
  
      await heapify(arr, n, largest, arrangement);
    }
  }
  
  // Heap Sort with swapping animation
  async function heapSortWithAnimation(arrangement) {
    const cells = document.querySelectorAll('.cell');
    const len = cells.length;
  
    // Build max heap
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      await heapify(cells, len, i, arrangement);
    }
  
    // Extract elements from heap one by one
    for (let i = len - 1; i > 0; i--) {
      // Swap root (max element) with the last element
      const temp = cells[0].textContent;
      cells[0].textContent = cells[i].textContent;
      cells[i].textContent = temp;
  
      // Visual indication of swapping
      cells[0].style.backgroundColor = 'green';
      cells[i].style.backgroundColor = 'green';
      await new Promise(resolve => setTimeout(resolve, 500));
  
      // Revert back to default color
      cells[0].style.backgroundColor = '';
      cells[i].style.backgroundColor = '';
  
      // Heapify the reduced heap
      await heapify(cells, i, 0, arrangement);
    }
  
    // Mark the last element in green as it is also in its correct sorted position after sorting
    cells[0].style.backgroundColor = 'green';
  
    // Reset all cell colors back to their default state after sorting
    cells.forEach(cell => {
      cell.style.backgroundColor = '';
    });
  }  

// Helper function to get the maximum value in an array
function getMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

async function radixSortWithAnimation(arrangement) {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const numbersArray = cells.map(cell => parseInt(cell.textContent.trim()));

  const max = getMax(numbersArray);
  const maxDigits = Math.floor(Math.log10(max)) + 1;

  for (let i = 0; i < maxDigits; i++) {
    const buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < numbersArray.length; j++) {
      const digit = Math.floor(numbersArray[j] / Math.pow(10, i)) % 10;
      buckets[digit].push(numbersArray[j]);
    }

    if (arrangement === 'descending') {
      buckets.reverse(); // Reverse the buckets for descending order
    }

    numbersArray.length = 0;
    for (let k = 0; k < buckets.length; k++) {
      numbersArray.push(...buckets[k]);
    }

    for (let m = 0; m < numbersArray.length; m++) {
      cells[m].textContent = numbersArray[m];
      // Highlight the current element being moved
      cells[m].style.backgroundColor = 'red';
      await new Promise(resolve => setTimeout(resolve, 500));
      cells[m].style.backgroundColor = 'green'; // Change to green when in correct position
      await new Promise(resolve => setTimeout(resolve, 500));
      cells[m].style.backgroundColor = ''; // Reset color after moving
    }
  }

  // Mark all elements in green as they are in their correct sorted position after sorting
  cells.forEach(cell => {
    cell.style.backgroundColor = 'green';
  });

  // Reset all cell colors back to their default state after sorting
  await new Promise(resolve => setTimeout(resolve, 1500));
  cells.forEach(cell => {
    cell.style.backgroundColor = '';
  });
}


async function shellSortWithAnimation(arrangement) {
  const cells = document.querySelectorAll('.cell');
  const len = cells.length;

  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < len; i++) {
      const temp = parseInt(cells[i].textContent);
      let j;

      // Visual indication of the element being moved
      cells[i].style.backgroundColor = 'red';

      // Simulating delay for visualization
      await new Promise(resolve => setTimeout(resolve, 500));

      for (j = i; j >= gap && (
        arrangement === 'ascending' && parseInt(cells[j - gap].textContent) > temp
        || arrangement === 'descending' && parseInt(cells[j - gap].textContent) < temp
      ); j -= gap) {
        // Visual indication of comparing elements
        cells[j - gap].style.backgroundColor = 'red';

        // Moving elements to the right
        cells[j].textContent = cells[j - gap].textContent;

        // Visual indication of swapping
        cells[j].style.backgroundColor = 'green';

        // Simulating delay for visualization
        await new Promise(resolve => setTimeout(resolve, 500));

        // Revert back to default color
        cells[j - gap].style.backgroundColor = '';
        cells[j].style.backgroundColor = '';
      }

      // Placing the element in its correct position
      cells[j].textContent = temp.toString();

      // Visual indication of the sorted element
      cells[j].style.backgroundColor = 'green';

      // Simulating delay for visualization
      await new Promise(resolve => setTimeout(resolve, 500));

      // Revert back to default color
      cells[j].style.backgroundColor = '';
    }
  }

  // Mark all elements in green as they are in their correct sorted position after sorting
  cells.forEach(cell => {
    cell.style.backgroundColor = 'green';
  });

  // Reset all cell colors back to their default state after sorting
  await new Promise(resolve => setTimeout(resolve, 1500));
  cells.forEach(cell => {
    cell.style.backgroundColor = '';
  });
}

  // Event listeners for sorting algorithm buttons
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bubbleSort').addEventListener('click', async function() {
      const arrangeSelect = document.getElementById('arrangeSelect');
      const selectedArrangement = arrangeSelect.value;
      await bubbleSortWithAnimation(selectedArrangement);
  });
    document.getElementById('selectionSort').addEventListener('click', async function() {
      const arrangeSelect = document.getElementById('arrangeSelect');
      const selectedArrangement = arrangeSelect.value;
      await selectionSortWithAnimation(selectedArrangement);
    });
      document.getElementById('insertionSort').addEventListener('click', async function() {
        const arrangeSelect = document.getElementById('arrangeSelect');
        const selectedArrangement = arrangeSelect.value;
        await insertionSortWithAnimation(selectedArrangement);
      });
      document.getElementById('mergeSort').addEventListener('click', async function() {
        const arrangeSelect = document.getElementById('arrangeSelect');
        const selectedArrangement = arrangeSelect.value;
        await mergeSortWithAnimation(selectedArrangement);
      });
      document.getElementById('quickSort').addEventListener('click', async function() {
        const arrangeSelect = document.getElementById('arrangeSelect');
        const selectedArrangement = arrangeSelect.value;
        await quickSortWithAnimation(selectedArrangement);
      });
      document.getElementById('heapSort').addEventListener('click', async function() {
        const arrangeSelect = document.getElementById('arrangeSelect');
        const selectedArrangement = arrangeSelect.value;
        await heapSortWithAnimation(selectedArrangement);
      });
      document.getElementById('radixSort').addEventListener('click', async function() {
        const arrangeSelect = document.getElementById('arrangeSelect');
        const selectedArrangement = arrangeSelect.value;
        await radixSortWithAnimation(selectedArrangement);
      });
      document.getElementById('shellSort').addEventListener('click', async function() {
        const arrangeSelect = document.getElementById('arrangeSelect');
      const selectedArrangement = arrangeSelect.value;
      await shellSortWithAnimation(selectedArrangement);
      });
  });
  
  function generateRandomNumbers() {
    var numbers = [];
    for (var i = 0; i < 10; i++) { 
        numbers.push(Math.floor(Math.random() * 100) + 1); // Generate random numbers between 1 and 100
    }
    document.getElementById('inputNumbers').value = numbers.join(', '); // Display numbers with commas
  }
  
// Function to remove all cells from the HTML on clicking the "Erase" button
function clearCells() {
  const cellsContainer = document.getElementById('cells');
  cellsContainer.innerHTML = ''; // Remove all cell elements inside the container

  // Clear the input field content
  document.getElementById('inputNumbers').value = '';
}

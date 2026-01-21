// Capitalize first letter of string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Reverse string
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Count vowels in string
function countVowels(str) {
  const vowels = "aeiouAEIOU";
  let count = 0;

  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

// Export functions
module.exports = {
  capitalize,
  reverseString,
  countVowels
};
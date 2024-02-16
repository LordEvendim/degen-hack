const generateString = (n: number): string => {
  let target = "";

  for (let i = 0; i < n; i++) {
    target += `${i} `;
  }

  return target;
};

console.log(generateString(10));

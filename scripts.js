const validateIPv6 = (input) => {
  if (typeof input !== 'string' || input.length < 2 || input.length > 39) return false;

  const blocks = input.split(':');
  if (blocks.length > 8) return false;

  const validHex = new Set('0123456789abcdefABCDEF');

  for (let block of blocks) {
    if (block.length > 4) return false;
    for (let char of block) {
      if (!validHex.has(char)) return false;
    }
  }

  return true;
};

const shortenIPv6 = (input) => {
  const blocks = input.split(":").map(block =>
    block.replace(/^0+/, '') || '0'
  );

  let bestStart = -1, bestLen = 0;
  for (let i = 0; i < blocks.length;) {
    if (blocks[i] === '0') {
      let start = i;
      while (i < blocks.length && blocks[i] === '0') i++;
      const len = i - start;
      if (len > bestLen) [bestStart, bestLen] = [start, len];
    } else {
      i++;
    }
  }

  if (bestLen > 1) {
    blocks.splice(bestStart, bestLen, '');
    if (bestStart === 0) blocks.unshift('');
    if (bestStart + bestLen === 8) blocks.push('');
  }

  return blocks.join(":").replace(/:{3,}/, "::");
};

document.getElementById("shortenBtn").addEventListener("click", () => {
  const input = document.getElementById("ipv6Input").value.trim();
  const result = document.getElementById("result");

  if (!validateIPv6(input)) {
    result.textContent = "Invalid IPv6 address.";
    return;
  }

  const shortened = shortenIPv6(input);
  result.textContent = `Shortened: ${shortened}`;
});

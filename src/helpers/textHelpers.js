async function getTexts(elements) {
  const texts = [];
  for (const el of elements) {
    texts.push(await el.getText());
  }
  return texts;
}

module.exports = { getTexts };
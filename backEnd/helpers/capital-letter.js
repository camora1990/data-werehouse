const capitalLetter = (text) => {
    const textCapitalLetter = text
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
      .trim();
    return textCapitalLetter;
  };

  module.exports = {
      capitalLetter
  }
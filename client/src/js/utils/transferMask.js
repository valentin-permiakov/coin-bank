import IMask from 'imask';

const cardNumberMask = (input) => {
  return IMask(input, {
    mask: [
      {
        mask: '0000 000000 00000',
        regex: '^3[47]\\d{0,13}',
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}',
      },
      {
        mask: '0000 000000 0000',
        regex: '^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}',
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}',
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(?:35\\d{0,2})\\d{0,12}',
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}',
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^4\\d{0,15}',
      },
      {
        mask: '0000 0000 0000 0000',
        regex: '^62\\d{0,14}',
      },
      {
        mask: '0000 0000 0000 0000 0000 000000',
        regex: 'd{0,26}',
      },
    ],
    dispatch: function (appended, dynamicMasked) {
      const number = (dynamicMasked.value + appended).replace(/\D/g, '');
      if (number.length > 16) {
        return dynamicMasked.compiledMasks[
          dynamicMasked.compiledMasks.length - 1
        ];
      }

      for (let i = 0; i < dynamicMasked.compiledMasks.length; i++) {
        const re = new RegExp(dynamicMasked.compiledMasks[i].regex);
        if (number.match(re) != null) {
          return dynamicMasked.compiledMasks[i];
        }
      }
    },
  });
};

export { cardNumberMask as default };

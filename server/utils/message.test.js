const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('Should generate correct message object', () => {
    const message = generateMessage('Gabri', 'Ciao!');
    expect(message.from).toBe('Gabri');
    expect(message.text).toBe('Ciao!');
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('Should generate correct location object', () => {
    const locationMessage = generateLocationMessage('Gabri', 1, 1);
    const url = 'https://www.google.com/maps?q=1,1'
    expect(locationMessage.from).toBe('Gabri');
    expect(locationMessage.url).toBe(url);
  });
});
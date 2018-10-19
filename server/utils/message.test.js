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
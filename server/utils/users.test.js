const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Room 1'
    }, {
    id: 2,
    name: 'Jen',
    room: 'Room 2'
  }, {
    id: 3,
    name: 'Rob',
    room: 'Room 1'
  }]
  });

  it('Should add new user', () => {
    const users =  new Users();
    const user = {
      id: 123,
      name: 'Gabri',
      room: 'Room 1'
    }
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('Should remove a user', () => {
    const res = users.removeUser(1);
    expect(res.id).toBe(1);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user', () => {
    const res = users.removeUser(4);
    expect(res).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('Should find user', () => {
    const res = users.getUser(1);
    expect(res.id).toBe(1);
  });

  it('Should not find user', () => {
    const res = users.getUser(4);
    expect(res).toBeFalsy();
  });

  it('Should return names for Room 1', () => {
    const userList = users.getUserList('Room 1');
    expect(userList).toEqual(['Mike', 'Rob']);
  });

  it('Should return names for Room 2', () => {
    const userList = users.getUserList('Room 2');
    expect(userList).toEqual(['Jen']);
  });
});
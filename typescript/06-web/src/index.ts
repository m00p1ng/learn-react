import { User } from './models/User';

const user = User.buildUser({ id: 1, name: 'new name', age: 22 });

user.on('save', () => {
  console.log(user);
});

user.save();

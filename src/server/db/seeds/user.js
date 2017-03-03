const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del()
    .then(() => {

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('1zx2', salt);

      return Promise.join(
        knex('users').insert({
          username: 'MOS',
          password: hash
        }));
    })
    .then(() => {

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('1zx2', salt);

      return Promise.join(
        knex('users').insert({
          username: 'MOS2',
          password: hash,
          admin: true
        }));
    });
};

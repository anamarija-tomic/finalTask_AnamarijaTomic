const users = {
  standard_user: {
    username: 'standard_user',
    password: 'secret_sauce',
    shouldPass: true,
    checkout: {
      firstName: 'Ana',
      lastName: 'Tomic',
      postalCode: '10000',
    },
  },
  locked_out_user: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    shouldPass: false,
  },
};

module.exports = users;

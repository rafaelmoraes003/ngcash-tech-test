module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Rafael Moraes',
        password: 'ea2d9dc4c599ce2ea421ccc24f03a0fc',
        accountId: 1,
        // senha: AAbbCC11
      },
      {
        username: 'Pedro Pereira',
        password: '22d591bbff9e316716c3916b8238d164',
        accountId: 2,
        // senha: DDeeFF22
      },
      {
        username: 'Lucas Almeida',
        password: '649ddc2cd3e0f67e31eccc4e8c7174e5',
        accountId: 3,
        // senha: XXyyZZ55
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

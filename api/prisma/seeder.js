const { PrismaClient } = require('@prisma/client');
const { hash } = require('argon2');

const prisma = new PrismaClient();

async function seeder() {
  try {
    const admin = {
      login: 'admin',
      password: await hash('a'),
    };
    const createdAdmin = await prisma.user.create({
      data: admin,
    });

    console.log('success');
  } catch (e) {
    console.log('cannot create', e);
  }
}

seeder();

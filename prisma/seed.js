const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.create({
    data: {
      name: 'Royal Saffron Halwa',
      description: 'A luxurious blend of saffron and premium nuts.',
      price: '$45.00',
      stock: 50,
      imageUrl: 'https://placehold.co/600x800/png', // Placeholder 3:4 image
      status: 'Active',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Pistachio Delight',
      description: 'Rich pistachio flavor in every bite.',
      price: '$35.00',
      stock: 30,
      imageUrl: 'https://placehold.co/600x800/png',
      status: 'Active',
    },
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

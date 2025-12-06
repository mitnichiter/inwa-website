const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check if products exist
  const count = await prisma.product.count();
  if (count > 0) {
    console.log('Products already exist.');
    return;
  }

  await prisma.product.create({
    data: {
      name: 'Royal Saffron Halwa',
      description: 'A luxurious blend of saffron and premium nuts.',
      price: '$45.00',
      stock: 50,
      imageUrl: 'https://placehold.co/600x800/png', 
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

  await prisma.product.create({
    data: {
      name: 'Rose Cardamom',
      description: 'Aromatic rose petals with a hint of cardamom.',
      price: '$40.00',
      stock: 25,
      imageUrl: 'https://placehold.co/600x800/png',
      status: 'Active',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Walnut Crunch',
      description: 'Crunchy walnuts embedded in soft halwa.',
      price: '$38.00',
      stock: 40,
      imageUrl: 'https://placehold.co/600x800/png',
      status: 'Active',
    },
  });

  console.log('Products restored!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

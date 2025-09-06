import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  await prisma.category.createMany({
    data: [
      { name: "Eco-Friendly Home", description: "Sustainable products for home" },
      { name: "Recycled Products", description: "Items made from recycled materials" },
      { name: "Sustainable Fashion", description: "Clothing made ethically" },
      { name: "Organic Food", description: "Healthy and eco-friendly food" },
      { name: "Reusable Items", description: "Reduce waste with reusable products" }
    ],
    skipDuplicates: true
  });

  // Seed Demo Products
  await prisma.product.createMany({
    data: [
      {
        title: "Reusable Water Bottle",
        description: "Eco-friendly stainless steel bottle",
        price: 15.99,
        condition: "new",
        userId: "demo-user-id",  // we’ll create a demo user below
        categoryId: (await prisma.category.findFirst({ where: { name: "Reusable Items" } }))?.id!,
      },
      {
        title: "Organic Cotton T-Shirt",
        description: "Soft and sustainable cotton",
        price: 25.5,
        condition: "new",
        userId: "demo-user-id",
        categoryId: (await prisma.category.findFirst({ where: { name: "Sustainable Fashion" } }))?.id!,
      },
      {
        title: "Bamboo Toothbrush",
        description: "Plastic-free toothbrush",
        price: 3.99,
        condition: "new",
        userId: "demo-user-id",
        categoryId: (await prisma.category.findFirst({ where: { name: "Eco-Friendly Home" } }))?.id!,
      }
    ],
    skipDuplicates: true
  });

  // Seed Demo User
  await prisma.user.upsert({
    where: { email: "demo@ecofinds.com" },
    update: {},
    create: {
      email: "demo@ecofinds.com",
      password: "demo123",  // hash if needed for NextAuth credentials
      name: "Demo User"
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());

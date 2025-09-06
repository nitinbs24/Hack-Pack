import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = [
    { id: "cat_electronics", name: "Electronics", description: "Eco-friendly electronics and gadgets" },
    { id: "cat_clothing", name: "Clothing", description: "Sustainable fashion and apparel" },
    { id: "cat_home", name: "Home & Garden", description: "Sustainable home and garden products" },
    { id: "cat_books", name: "Books", description: "Educational and entertainment books" },
    { id: "cat_sports", name: "Sports & Outdoors", description: "Outdoor and sports equipment" },
    { id: "cat_beauty", name: "Beauty & Health", description: "Natural beauty and health products" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    })
  }

  // Create a demo user
  const hashedPassword = await bcrypt.hash("demo123", 12)

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@ecofinds.com" },
    update: {},
    create: {
      email: "demo@ecofinds.com",
      password: hashedPassword,
      name: "Demo User",
    },
  })

  // Create sample products
  const sampleProducts = [
    {
      title: "Bamboo Phone Case",
      description: "Sustainable bamboo phone case for iPhone and Android",
      price: 25.99,
      condition: "new",
      location: "San Francisco, CA",
      categoryId: "cat_electronics",
      userId: demoUser.id,
    },
    {
      title: "Organic Cotton T-Shirt",
      description: "Soft organic cotton t-shirt in various colors",
      price: 18.5,
      condition: "new",
      location: "Portland, OR",
      categoryId: "cat_clothing",
      userId: demoUser.id,
    },
    {
      title: "Solar Garden Lights",
      description: "Set of 6 solar-powered LED garden lights",
      price: 45.0,
      condition: "new",
      location: "Austin, TX",
      categoryId: "cat_home",
      userId: demoUser.id,
    },
  ]

  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log("Setting up database...")

    // Test database connection
    await prisma.$connect()
    console.log("Database connected successfully")

    // Create some sample categories
    const categories = [
      { name: "Electronics", description: "Eco-friendly electronics and gadgets" },
      { name: "Clothing", description: "Sustainable fashion and apparel" },
      { name: "Home & Garden", description: "Eco-friendly home and garden products" },
      { name: "Books", description: "Educational and sustainable living books" },
      { name: "Sports & Outdoors", description: "Sustainable sports and outdoor gear" },
    ]

    for (const category of categories) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      })
    }

    console.log("Database setup completed successfully")
  } catch (error) {
    console.error("Database setup failed:", error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()

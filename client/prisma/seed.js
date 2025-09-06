import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = [
    { id: "cat_electronics", name: "Electronics", description: "Eco-friendly electronics and gadgets" },
    { id: "cat_vehicles", name: "Vehicles", description: "Eco-friendly vehicles" },
    { id: "cat_home", name: "Home & Appliances", description: "Sustainable home and kitchen products" }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category
    });
  }

  // Demo user
  const hashedPassword = await bcrypt.hash("demo123", 12);
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@ecofinds.com" },
    update: {},
    create: {
      email: "demo@ecofinds.com",
      password: hashedPassword,
      name: "Demo User"
    }
  });

  // Products with images
  const products = [
    {
      title: "Smart TV",
      description: "55-inch 4K eco-friendly Smart TV",
      price: 499.99,
      condition: "new",
      location: "Los Angeles, CA",
      categoryId: "cat_electronics",
      userId: demoUser.id,
      images: { create: [
        { url: "https://example.com/images/tv1.jpg" },
        { url: "https://example.com/images/tv2.jpg" }
      ]}
    },
    {
      title: "Electric Car",
      description: "Eco-friendly electric car with long battery life",
      price: 35000,
      condition: "new",
      location: "San Francisco, CA",
      categoryId: "cat_vehicles",
      userId: demoUser.id,
      images: { create: [
        { url: "https://example.com/images/car1.jpg" },
        { url: "https://example.com/images/car2.jpg" }
      ]}
    },
    {
      title: "Mountain Bike",
      description: "Lightweight and durable eco-friendly mountain bike",
      price: 1200,
      condition: "new",
      location: "Portland, OR",
      categoryId: "cat_vehicles",
      userId: demoUser.id,
      images: { create: [
        { url: "https://example.com/images/bike1.jpg" },
        { url: "https://example.com/images/bike2.jpg" }
      ]}
    },
    {
      title: "Washing Machine",
      description: "Energy-efficient washing machine with smart features",
      price: 799.99,
      condition: "new",
      location: "Austin, TX",
      categoryId: "cat_home",
      userId: demoUser.id,
      images: { create: [
        { url: "https://example.com/images/washing1.jpg" },
        { url: "https://example.com/images/washing2.jpg" }
      ]}
    },
    {
      title: "Air Fryer",
      description: "Healthy and energy-efficient air fryer",
      price: 129.99,
      condition: "new",
      location: "New York, NY",
      categoryId: "cat_home",
      userId: demoUser.id,
      images: { create: [
        { url: "https://example.com/images/airfryer1.jpg" },
        { url: "https://example.com/images/airfryer2.jpg" }
      ]}
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

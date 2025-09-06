import { execSync } from "child_process"

async function initDatabase() {
  try {
    console.log("🔄 Initializing EcoFinds database...")

    // Generate Prisma client
    console.log("📦 Generating Prisma client...")
    execSync("npx prisma generate", { stdio: "inherit" })

    // Push database schema
    console.log("🗄️ Creating database tables...")
    execSync("npx prisma db push", { stdio: "inherit" })

    // Run setup script
    console.log("🌱 Setting up initial data...")
    execSync("npx tsx scripts/setup-database.ts", { stdio: "inherit" })

    console.log("✅ Database initialization completed successfully!")
    console.log("🚀 You can now run: npm run dev")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    process.exit(1)
  }
}

initDatabase()

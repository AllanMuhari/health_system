import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create initial programs
  await prisma.program.createMany({
    data: [
      { name: "TB", description: "Tuberculosis treatment program" },
      { name: "Malaria", description: "Malaria prevention and treatment" },
      { name: "HIV", description: "HIV/AIDS management program" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed data created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

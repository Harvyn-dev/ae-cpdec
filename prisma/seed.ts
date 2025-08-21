import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const officers = await prisma.officer.createMany({
    data: [
      { firstName: "Chris-Ivan", lastName: "ABBA", role: "PR" },
      { firstName: "Chloé", lastName: "OUATTARA", role: "SG" },
      { firstName: "Michèle", lastName: "TOURÉ", role: "VP" },
    ],
    skipDuplicates: true,
  });

  const years = Array.from({ length: 16 }, (_, i) => 2010 + i);
  const presidents = await prisma.president.createMany({
    data: years.map((y) => ({
      fullName: `Président ${y}`, // remplace plus tard par les vrais noms
      yearFrom: y,
      yearTo: y,
    })),
    skipDuplicates: true,
  });

  console.log(`Seed OK → officers: ${officers.count}, presidents: ${presidents.count}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });

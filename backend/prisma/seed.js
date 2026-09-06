// Código para popular o banco de dados com dados iniciais

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const organico = await prisma.category.create({ data: { nome: 'Orgânico', slug: 'organico' } });
  const plastico = await prisma.category.create({ data: { nome: 'Plástico', slug: 'plastico' } });
  const papel = await prisma.category.create({ data: { nome: 'Papel', slug: 'papel' } });

  await prisma.waste.createMany({
    data: [
      {
        nome: 'Casca de banana',
        descarte: 'Coletor de resíduos orgânicos ou composteira escolar.',
        categoryId: organico.id
      },
      {
        nome: 'Garrafa PET',
        descarte: 'Lixeira amarela (plástico). Lave a garrafa antes do descarte.',
        categoryId: plastico.id
      },
      {
        nome: 'Caixa de papelão',
        descarte: 'Lixeira azul (papel). Dobre a caixa para otimizar o espaço.',
        categoryId: papel.id
      }
    ]
  });

  console.log('🌱 Categorias e resíduos cadastrados com sucesso!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
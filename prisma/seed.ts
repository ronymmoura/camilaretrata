import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create default categories
  const categories = [
    {
      name: 'Retratos',
      slug: 'retratos',
      order: 1,
      icon: 'FaUser',
      desktopImageUrl: '/uploads/categories/retratos-desktop.jpg',
      mobileImageUrl: '/uploads/categories/retratos-mobile.jpg',
    },
    {
      name: 'Casamentos',
      slug: 'casamentos',
      order: 2,
      icon: 'FaHeart',
      desktopImageUrl: '/uploads/categories/casamentos-desktop.jpg',
      mobileImageUrl: '/uploads/categories/casamentos-mobile.jpg',
    },
    {
      name: 'Eventos',
      slug: 'eventos',
      order: 3,
      icon: 'FaCalendarDays',
      desktopImageUrl: '/uploads/categories/eventos-desktop.jpg',
      mobileImageUrl: '/uploads/categories/eventos-mobile.jpg',
    },
  ];

  console.log('Creating categories...');
  
  for (const category of categories) {
    const existingCategory = await prisma.category.findFirst({
      where: { slug: category.slug },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Created category: ${category.name}`);
    } else {
      console.log(`Category already exists: ${category.name}`);
    }
  }

  // Create a default admin user
  console.log('Creating default admin user...');
  
  const existingUser = await prisma.user.findFirst({
    where: { name: 'admin' },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('changeme123', 12);
    await prisma.user.create({
      data: {
        name: 'admin',
        password: hashedPassword,
      },
    });
    console.log('Created default admin user (username: admin, password: changeme123)');
    console.log('⚠️  Remember to change the default password!');
  } else {
    console.log('Admin user already exists');
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
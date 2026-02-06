import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@galeriaestudio.com.ar' },
    update: {},
    create: {
      email: 'admin@galeriaestudio.com.ar',
      password: hashedPassword,
      name: 'Admin Galeria',
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // Create initial categories
  const categories = [
    { name: 'Mobiliario', slug: 'mobiliario', description: 'Muebles de diseno' },
    { name: 'Decoracion', slug: 'decoracion', description: 'Objetos decorativos' },
    { name: 'Iluminacion', slug: 'iluminacion', description: 'Lamparas y luminarias' },
    { name: 'Arte', slug: 'arte', description: 'Obras de arte y cuadros' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Categories created:', categories.map((c) => c.name).join(', '));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

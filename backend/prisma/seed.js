import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el Seeding...');

  // 1. Usuario ADMIN
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@newera.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@newera.com',
      password: adminPassword,
      phone: '3000000000',
      role: 'ADMIN',
    },
  });
  console.log('Administrador verificado: admin@newera.com / admin123');

  // 2. Mapeo de Categorías y Productos
  const datosSemilla = [
    {
      categoria: 'Lácteos',
      productos: [
        { name: 'Leche Entera 1L', price: 1.50, stock: 100, description: 'Leche entera pasteurizada', imageUrl: 'https://picsum.photos' },
        { name: 'Yogurt Griego Natural', price: 2.20, stock: 50, description: 'Yogurt griego sin azúcar', imageUrl: 'https://picsum.photos' },
        { name: 'Queso Mozzarella 500g', price: 4.50, stock: 30, description: 'Queso rallado ideal para pizzas', imageUrl: 'https://picsum.photos' }
      ]
    },
    {
      categoria: 'Carnes',
      productos: [
        { name: 'Pechuga de Pollo 1kg', price: 6.00, stock: 40, description: 'Pechuga de pollo limpia y fileteada', imageUrl: 'https://picsum.photos' },
        { name: 'Carne Molida de Res 1kg', price: 8.50, stock: 25, description: 'Carne de res premium 90/10', imageUrl: 'https://picsum.photos' }
      ]
    },
    {
      categoria: 'Verduras',
      productos: [
        { name: 'Tomate Chonto 1kg', price: 1.80, stock: 80, description: 'Tomates frescos para ensalada o guisos', imageUrl: 'https://picsum.photos' },
        { name: 'Lechuga Crespa', price: 1.20, stock: 40, description: 'Lechuga hidropónica lavada', imageUrl: 'https://picsum.photos' }
      ]
    },
    {
      categoria: 'Snacks',
      productos: [
        { name: 'Papas Fritas Clásicas', price: 1.30, stock: 120, description: 'Papas con un toque de sal', imageUrl: 'https://picsum.photos' },
        { name: 'Mix de Frutos Secos', price: 3.00, stock: 60, description: 'Almendras, nueces y pasas', imageUrl: 'https://picsum.photos' }
      ]
    },
    {
      categoria: 'Bebidas',
      productos: [
        { name: 'Agua Mineral 500ml', price: 0.80, stock: 200, description: 'Agua mineral sin gas', imageUrl: 'https://picsum.photos0' },
        { name: 'Jugo de Naranja Natural', price: 2.50, stock: 45, description: 'Jugo 100% exprimido', imageUrl: 'https://picsum.photos1' }
      ]
    },
    {
      categoria: 'Panadería',
      productos: [
        { name: 'Pan Tajado Integral', price: 2.10, stock: 35, description: 'Pan con semillas de chía y linaza', imageUrl: 'https://picsum.photos2' },
        { name: 'Croissant de Mantequilla', price: 1.00, stock: 60, description: 'Pan horneado fresco del día', imageUrl: 'https://picsum.photos3' }
      ]
    },
    {
      categoria: 'Abarrotes',
      productos: [
        { name: 'Arroz Blanco 1kg', price: 1.40, stock: 150, description: 'Arroz de grano largo premium', imageUrl: 'https://picsum.photos4' },
        { name: 'Aceite de Oliva Extra Virgen', price: 7.90, stock: 40, description: 'Aceite prensado en frío 500ml', imageUrl: 'https://picsum.photos5' }
      ]
    },
    {
      categoria: 'Limpieza',
      productos: [
        { name: 'Detergente Líquido 3L', price: 11.50, stock: 20, description: 'Detergente para ropa blanca y de color', imageUrl: 'https://picsum.photos6' },
        { name: 'Lavavajillas Líquido', price: 1.90, stock: 75, description: 'Arranca grasa con aroma a limón', imageUrl: 'https://picsum.photos7' }
      ]
    },
    {
      categoria: 'Cuidado Personal',
      productos: [
        { name: 'Shampoo Anticaspa 400ml', price: 4.80, stock: 35, description: 'Shampoo con extracto de menta', imageUrl: 'https://picsum.photos8' },
        { name: 'Jabón de Tocador Exfoliante', price: 1.10, stock: 90, description: 'Jabón en barra con avena', imageUrl: 'https://picsum.photos9' }
      ]
    },
    {
      categoria: 'Congelados',
      productos: [
        { name: 'Papas a la Francesa 1kg', price: 3.50, stock: 50, description: 'Papas prefritas congeladas', imageUrl: 'https://picsum.photos0' },
        { name: 'Helado de Vainilla 1L', price: 4.20, stock: 28, description: 'Helado cremoso de vainilla gourmet', imageUrl: 'https://picsum.photos1' }
      ]
    }
  ];

  // 3. Inyección
  for (const item of datosSemilla) {

    const categoriaCreada = await prisma.category.upsert({
      where: { name: item.categoria },
      update: {},
      create: { name: item.categoria },
    });

    for (const prod of item.productos) {
      const productoExistente = await prisma.product.findFirst({
        where: { name: prod.name }
      });

      if (productoExistente) {
        await prisma.product.update({
          where: { id: productoExistente.id },
          data: {
            price: prod.price,
            stock: prod.stock,
            description: prod.description,
            imageUrl: prod.imageUrl,
            categoryId: categoriaCreada.id
          }
        });
      } else {

        await prisma.product.create({
          data: {
            name: prod.name,
            price: prod.price,
            stock: prod.stock,
            description: prod.description,
            imageUrl: prod.imageUrl,
            categoryId: categoriaCreada.id
          }
        });
      }
    }
  }

  console.log('Categorías y productos inyectados correctamente.');
  console.log('Seeding completado con éxito. ¡Base de datos lista!');
}

main()
  .catch((e) => {
    console.error('Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
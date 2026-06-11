import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function update() {
  try {
    const orders = await prisma.order.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    console.log(`Encontradas ${orders.length} órdenes pendientes.`);
    
    for (const order of orders) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'PAID' }
      });
      console.log(`Orden ${order.id} actualizada a PAID.`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

update();

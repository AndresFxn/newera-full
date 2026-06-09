/**
 * Script para crear un pedido de prueba asignado al domiciliario
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createTestOrder() {
  try {
    console.log('🚀 Iniciando creación de pedido de prueba...\n');

    // 1. Buscar el domiciliario
    const deliverer = await prisma.user.findFirst({
      where: {
        email: 'domiciliario@newera.com',
        role: 'DELIVERER',
      },
    });

    if (!deliverer) {
      console.error('❌ No se encontró el domiciliario');
      return;
    }
    console.log('✅ Domiciliario encontrado:', deliverer.name);

    // 2. Buscar un cliente
    const customer = await prisma.user.findFirst({
      where: {
        role: 'CUSTOMER',
      },
    });

    if (!customer) {
      console.error('❌ No se encontró ningún cliente');
      return;
    }
    console.log('✅ Cliente encontrado:', customer.name);

    // 3. Obtener algunos productos
    const products = await prisma.product.findMany({
      take: 3,
      where: {
        isActive: true,
        stock: {
          gt: 0,
        },
      },
    });

    if (products.length === 0) {
      console.error('❌ No se encontraron productos disponibles');
      return;
    }
    console.log(`✅ ${products.length} productos encontrados\n`);

    // 4. Calcular total
    const orderItems = products.map((product, index) => ({
      productId: product.id,
      quantity: index + 1, // 1, 2, 3 unidades
      unitPrice: product.price,
    }));

    const total = orderItems.reduce((sum, item) => {
      return sum + Number(item.unitPrice) * item.quantity;
    }, 0);

    // 5. Crear el pedido
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        delivererId: deliverer.id, // Asignar al domiciliario
        status: 'DISPATCHED', // Estado listo para entrega
        total: total,
        address: 'Calle 123 #45-67, Apartamento 801, Bogotá',
        dispatchedAt: new Date(),
        items: {
          create: orderItems,
        },
      },
      include: {
        customer: true,
        deliverer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log('✅ Pedido creado exitosamente!\n');
    console.log('📦 Detalles del pedido:');
    console.log('   ID:', order.id);
    console.log('   Estado:', order.status);
    console.log('   Total:', `$${Number(order.total).toLocaleString('es-CO')}`);
    console.log('   Cliente:', order.customer.name);
    console.log('   Domiciliario:', order.deliverer?.name || 'Sin asignar');
    console.log('   Dirección:', order.address);
    console.log('   Productos:');
    order.items.forEach((item) => {
      console.log(
        `     - ${item.quantity}x ${item.product.name} = $${(
          Number(item.unitPrice) * item.quantity
        ).toLocaleString('es-CO')}`
      );
    });
    console.log('\n✅ Ahora puedes ver este pedido en el dashboard del domiciliario!');
    console.log('   URL: http://localhost:3000/deliverer/dashboard');
  } catch (error) {
    console.error('❌ Error al crear pedido:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestOrder();

/**
 * Script para crear un cliente y pedido de prueba asignado al domiciliario
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestData() {
  try {
    console.log('🚀 Iniciando creación de datos de prueba...\n');

    // 1. Buscar el admin para usar como "cliente" temporal
    let customer = await prisma.user.findFirst({
      where: { 
        email: 'admin@newera.com' 
      },
    });

    if (!customer) {
      console.error('❌ No se encontró el usuario admin');
      return;
    }
    console.log('✅ Usuario encontrado (usaremos admin como cliente):', customer.name);

    // 2. Buscar el domiciliario
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

    // 3. Obtener algunos productos
    const products = await prisma.product.findMany({
      take: 3,
      where: {
        isActive: true,
        stock: { gt: 0 },
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
      quantity: index + 2, // 2, 3, 4 unidades
      unitPrice: product.price,
    }));

    const total = orderItems.reduce((sum, item) => {
      return sum + Number(item.unitPrice) * item.quantity;
    }, 0);

    // 5. Crear el pedido
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        delivererId: deliverer.id,
        status: 'DISPATCHED',
        total: total,
        address: 'Carrera 15 #85-23, Apartamento 502, Bogotá, Colombia',
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
    console.log('═══════════════════════════════════════════════════');
    console.log('📦 DETALLES DEL PEDIDO');
    console.log('═══════════════════════════════════════════════════');
    console.log(`ID: ${order.id}`);
    console.log(`Estado: ${order.status} ✈️`);
    console.log(`Total: $${Number(order.total).toLocaleString('es-CO', { minimumFractionDigits: 0 })}`);
    console.log(`Cliente: ${order.customer.name}`);
    console.log(`Teléfono: ${order.customer.phone || 'N/A'}`);
    console.log(`Domiciliario: ${order.deliverer?.name || 'Sin asignar'}`);
    console.log(`Dirección: ${order.address}`);
    console.log('\nProductos:');
    order.items.forEach((item, idx) => {
      const subtotal = Number(item.unitPrice) * item.quantity;
      console.log(
        `  ${idx + 1}. ${item.quantity}x ${item.product.name} = $${subtotal.toLocaleString('es-CO', { minimumFractionDigits: 0 })}`
      );
    });
    console.log('═══════════════════════════════════════════════════');
    console.log('\n✅ ¡Todo listo! Ahora puedes:');
    console.log('   1. Iniciar sesión como domiciliario:');
    console.log('      Email: domiciliario@newera.com');
    console.log('      Password: domicilio123');
    console.log('   2. Ver el pedido en: http://localhost:3000/deliverer/dashboard');
    console.log('   3. Marcar el pedido como ENTREGADO desde el dashboard\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestData();

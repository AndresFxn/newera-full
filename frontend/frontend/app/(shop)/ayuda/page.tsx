import LegalPage from '@/components/LegalPage';

const sections = [
  {
    id: 'faq',
    title: 'Preguntas Frecuentes',
    content: `
## ¿Cómo puedo realizar un pedido?

Simplemente navega por nuestro catálogo, agrega los productos a tu carrito y procede al checkout. Te guiaremos en cada paso del proceso.

## ¿Cuál es el monto mínimo de compra?

No tenemos monto mínimo de compra. Puedes pedir desde un solo producto.

## ¿Puedo modificar mi pedido después de realizarlo?

Sí, puedes modificar tu pedido contactándonos inmediatamente después de realizarlo, siempre que aún no haya sido procesado.

## ¿Qué métodos de pago aceptan?

Aceptamos tarjetas de crédito, débito, PSE y pago contra entrega.
    `,
  },
  {
    id: 'envio',
    title: 'Política de Envío',
    content: `
## Tiempos de Entrega

Realizamos entregas en menos de 30 minutos dentro de nuestra zona de cobertura.

## Costo de Envío

- **Envío gratis** en compras superiores a $50.000
- $5.000 para compras menores

## Zona de Cobertura

Actualmente cubrimos las principales ciudades de Colombia. Verifica la disponibilidad en tu zona al momento de ingresar tu dirección.

## Seguimiento

Recibirás notificaciones en tiempo real sobre el estado de tu pedido desde que lo preparamos hasta que llega a tu puerta.
    `,
  },
  {
    id: 'devoluciones',
    title: 'Política de Devoluciones',
    content: `
## ¿Cuándo puedo devolver un producto?

Puedes solicitar una devolución si:
- El producto llegó en mal estado
- Recibiste un producto equivocado
- El producto está próximo a vencer sin haberte sido notificado

## Proceso de Devolución

1. Contacta a nuestro equipo de soporte dentro de las 24 horas siguientes a la entrega
2. Envíanos fotos del producto si aplica
3. Procesaremos tu devolución o cambio de inmediato

## Reembolsos

Los reembolsos se procesan en un plazo de 3-5 días hábiles y se acreditan al método de pago original.
    `,
  },
  {
    id: 'contacto',
    title: 'Contáctanos',
    content: `
## Atención al Cliente

Estamos disponibles para ayudarte de lunes a domingo de 7:00 AM a 10:00 PM.

## Canales de Contacto

- **WhatsApp:** +57 300 123 4567
- **Email:** soporte@newerasupermercado.com
- **Teléfono:** (601) 123 4567

## Redes Sociales

También puedes contactarnos a través de nuestras redes sociales:
- Facebook: @NewEraSuperCol
- Instagram: @newerasuper
- Twitter: @NewEraSuper

## Oficina Principal

Calle 123 #45-67, Bogotá, Colombia

Responderemos tu consulta en el menor tiempo posible.
    `,
  },
];

export default function AyudaPage() {
  return <LegalPage title="Centro de Ayuda" sections={sections} />;
}

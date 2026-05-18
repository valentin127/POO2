Order.prototype.calculateSubtotal = function() {
  var subtotal = 0;
  for (var i = 0; i < this.items.length; i++) {
    subtotal += this.items[i].price * this.items[i].qty;
  }
  return subtotal;
};

Order.prototype.total = function () {
  var subtotal = this.calculateSubtotal();
  
  var discount = 0;
  if (this.customer && this.customer.isVip) {
    if (subtotal > 100) {
      discount = subtotal * 0.15;
    } else {
      discount = subtotal * 0.05;
    }
  } else {
    if (subtotal > 200) {
      discount = subtotal * 0.10;
    }
  }
  
  var totalFinal = subtotal - discount;
  return totalFinal;
};

/*
Problemas detectados:

Lógica compleja de descuentos mezclada en un solo método

Variables con nombres poco descriptivos (t, d, s)   

Lógica de negocio difícil de mantener y extender

Propongo:
Paso 1: Eliminar el for usando reduce

Paso 2: Aplicar Polimorfismo para los Descuentos
En lugar de preguntar if (isVip), creamos estrategias de descuento separadas: (puedo aplicar un patron estratergy para eliminar los ifs)


*/
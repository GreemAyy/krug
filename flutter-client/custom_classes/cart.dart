import 'package:delivery_app/custom_classes/product.dart';

import 'extra.dart';

class CartItem {
  int quantity;
  List<Extra> extras;
  Product product;
  String size;

  CartItem({
    required this.quantity,
    required this.extras,
    required this.product,
    required this.size,
  });

  factory CartItem.fromJson(Map<String, dynamic> json) => CartItem(
    quantity: json["quantity"],
    extras: (json["extras"] as List<dynamic>).map((i) => Extra.fromJson(i)).toList(),
    product: Product.fromJson(json["product"]),
    size: json["size"],
  );

  Map<String, dynamic> toJson() => {
    "quantity": quantity,
    "extras": List<dynamic>.from(extras.map((x) => x)),
    "product": product,
    "size": size,
  };
}
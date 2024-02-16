import 'package:delivery_app/custom_classes/cart.dart';

class Order {
  int id;
  int userId;
  int placeId;
  List<CartItem> products;
  double totalPrice;
  int status;
  String dateOfCreate;

  Order({
    required this.id,
    required this.userId,
    required this.placeId,
    required this.products,
    required this.totalPrice,
    required this.status,
    required this.dateOfCreate,
  });

  factory Order.fromJson(Map<String, dynamic> json) => Order(
    id: json["id"],
    userId: json["user_id"],
    placeId: json["place_id"],
    products: List<CartItem>.from(json["products"].map((x) => CartItem.fromJson(x))),
    totalPrice: json["total_price"],
    status: json["status"],
    dateOfCreate: json["date_of_create"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "user_id": userId,
    "place_id": placeId,
    "products": List<dynamic>.from(products.map((x) => x.toJson())),
    "total_price": totalPrice,
    "status": status,
    "date_of_create": dateOfCreate,
  };
}

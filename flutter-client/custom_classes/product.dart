import 'package:delivery_app/custom_classes/extra.dart';

class Product {
    int id;
    String name;
    String description;
    List<int> imagesId;
    List<Info> info;
    String category;
    int salePercent;

    Product({
        required this.id,
        required this.name,
        required this.description,
        required this.imagesId,
        required this.info,
        required this.category,
        required this.salePercent,
    });

    factory Product.fromJson(Map<String, dynamic> json) => Product(
        id: json["id"],
        name: json["name"],
        description: json["description"],
        imagesId: List<int>.from(json["images_id"].map((x) => x)),
        info: List<Info>.from(json["info"].map((x) => Info.fromJson(x))),
        category: json["category"],
        salePercent: json["sale_percent"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "description": description,
        "images_id": List<dynamic>.from(imagesId.map((x) => x)),
        "info": List<dynamic>.from(info.map((x) => x.toJson())),
        "category": category,
        "sale_percent": salePercent,
    };
}

class Info {
    String size;
    int price;
    double weight;
    String measure;
    int quantity;

    Info({
        required this.size,
        required this.price,
        required this.weight,
        required this.measure,
        required this.quantity,
    });

    factory Info.fromJson(Map<String, dynamic> json) => Info(
        size: json["size"]!,
        price: json["price"],
        weight: json["weight"]?.toDouble(),
        measure: json["measure"]!,
        quantity: json["quantity"],
    );

    Map<String, dynamic> toJson() => {
        "size": size,
        "price": price,
        "weight": weight,
        "measure": measure,
        "quantity": quantity,
    };
}

class EnumValues<T> {
    Map<String, T> map;
    late Map<T, String> reverseMap;

    EnumValues(this.map);

    Map<T, String> get reverse {
        reverseMap = map.map((k, v) => MapEntry(v, k));
        return reverseMap;
    }
}



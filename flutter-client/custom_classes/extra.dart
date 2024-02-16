import 'dart:convert';

Extra extraFromJson(String str) => Extra.fromJson(json.decode(str));

String extraToJson(Extra data) => json.encode(data.toJson());

class Extra {
    int id;
    String name;
    String image;
    int price;

    Extra({
        required this.id,
        required this.name,
        required this.image,
        required this.price,
    });

    factory Extra.fromJson(Map<String, dynamic> json) => Extra(
        id: json["id"],
        name: json["name"],
        image: json["image"],
        price: json["price"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "image": image,
        "price": price,
    };
}

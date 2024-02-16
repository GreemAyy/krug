class City {
  int id;
  String region;
  String name;

  City({
    required this.id,
    required this.region,
    required this.name,
  });

  factory City.fromJson(Map<String, dynamic> json) => City(
    id: json["id"],
    region: json["region"],
    name: json["name"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "region": region,
    "name": name,
  };
}

class Place {
  int id;
  String cityId;
  String street;
  int building;

  Place({
    required this.id,
    required this.cityId,
    required this.street,
    required this.building,
  });

  factory Place.fromJson(Map<String, dynamic> json) => Place(
    id: json["id"],
    cityId: json["city_id"],
    street: json["street"],
    building: json["building"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "city_id": cityId,
    "street": street,
    "building": building,
  };
}

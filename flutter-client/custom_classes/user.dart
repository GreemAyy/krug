class User {
  int id;
  String name;
  String phone;
  String dob;

  User({
    required this.id,
    required this.name,
    required this.phone,
    required this.dob,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json["id"],
    name: json["name"],
    phone: json["phone"],
    dob: json["dob"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "name": name,
    "phone": phone,
    "dob": dob,
  };
}
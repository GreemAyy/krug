import 'dart:convert';

import 'package:delivery_app/tools/conts.dart';
import 'package:http/http.dart' as http;

import '../custom_classes/user.dart';

Future<String> createUserCodeHttp(String phone) async {
  var url = Uri.parse('$URL_MAIN/api/users/create-code');
  var req = await http.post(url, body:{'phone':phone});
  var decoded = jsonDecode(req.body);
  print(decoded);
  return (decoded as int).toString();
}

Future<Map<String, dynamic>> createUserHttp(String phone, String code) async {
  var url = Uri.parse('$URL_MAIN/api/users/create');
  print(code);
  var req = await http.post(url, body:{'phone':phone, 'code':code});
  var decoded = jsonDecode(req.body) as Map<dynamic, dynamic>;
  return decoded as Map<String, dynamic>;
}

Future<User> getUser(int id) async{
  var url = Uri.parse('$URL_MAIN/api/users/get');
  var req = await http.post(url, body:{'id': id.toString()});
  var decoded = jsonDecode(req.body) as Map<String, dynamic>;
  print(decoded);
  return User.fromJson(decoded);
}
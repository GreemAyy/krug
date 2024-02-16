import 'dart:convert';

import 'package:delivery_app/tools/conts.dart';
import '../custom_classes/order.dart';
import 'package:http/http.dart' as http;

Future<Order> getSingleOrderHttp(int id) async {
  var url = Uri.parse('$URL_MAIN/api/orders/single/$id');
  var req = await http.get(url);
  var decoded = jsonDecode(req.body) as Map<String, dynamic>;
  return Order.fromJson(decoded);
}

Future<List<Order>> getUserOrdersHttp(int userId) async {
  var url = Uri.parse('$URL_MAIN/api/orders/get-user/$userId');
  var req = await http.get(url);
  var decoded = jsonDecode(req.body) as List<dynamic>;
  return decoded.map((order) => Order.fromJson(order)).toList();
}

Future<int?> createOrderHttp(Order order) async {
  var url = Uri.parse('$URL_MAIN/api/orders/create');
  var req = await http.post(url, body: order.toJson());
  var decoded = jsonDecode(req.body) as Map<String, dynamic>;
  return decoded['id'];
}
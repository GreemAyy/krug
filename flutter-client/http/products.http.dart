import 'dart:convert';
import 'package:delivery_app/custom_classes/product.dart';
import 'package:delivery_app/tools/conts.dart';
import 'package:http/http.dart' as http;

Future<List<Product>> getProductsBySearchHttp(String search)async{
  var url = Uri.parse('$URL_MAIN/api/products/search/$search');
  var call = jsonDecode((await http.get(url)).body);
  var data = call as List<dynamic>;
  return (data).map((e) => Product.fromJson(Map<String,dynamic>.from(e))).toList();
}

Future<Product> getSingleProductHttp(int id) async{
  var url = Uri.parse('$URL_MAIN/api/products/single/$id');
  var call = jsonDecode(
    (await http.get(url)).body
  );
  var data = call as dynamic;
  return Product.fromJson(Map<String,dynamic>.from(data));
}

Future<List<Product>> getAllProductHttp() async{
  var url = Uri.parse('$URL_MAIN/api/products/all');
  var call = jsonDecode((await http.get(url)).body);
  var data = call as List<dynamic>;
  return (data).map((e) => Product.fromJson(Map<String,dynamic>.from(e))).toList();
}
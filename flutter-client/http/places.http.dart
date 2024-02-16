import 'dart:convert';
import 'package:delivery_app/custom_classes/place.dart';
import 'package:delivery_app/tools/conts.dart';
import 'package:http/http.dart' as http;

Future<List<City>> getCityLikeHttp(String like) async {
  var url = Uri.parse('$URL_MAIN/api/places-cities/get-cities-like/$like');
  var req = await http.get(url);
  var decoded = jsonDecode(req.body) as List<dynamic>;
  return decoded.map((city) => City.fromJson(city)).toList();
}

Future<City> getCityById(int id) async {
  var url = Uri.parse('$URL_MAIN/api/get-city-by-id/$id');
  var req = await http.get(url);
  var decode = jsonDecode(req.body) as Map<String, dynamic>;
  return City.fromJson(decode);
}

Future<List<Place>> getPlacesByCityId(int id) async {
  var url = Uri.parse('$URL_MAIN/api/places-cities/get-cities-like/$id');
  var req = await http.get(url);
  var decoded = jsonDecode(req.body) as List<dynamic>;
  return decoded.map((place) => Place.fromJson(place)).toList();
}

Future<Place> getPlaceById(int id) async {
  var url = Uri.parse('$URL_MAIN/api/places-cities/get-place/$id');
  var req = await http.get(url);
  var decoded = jsonDecode(req.body) as Map<String, dynamic>;
  return Place.fromJson(decoded);
}
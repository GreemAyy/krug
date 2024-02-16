import 'dart:convert';
import 'package:delivery_app/custom_classes/cart.dart';
import 'package:delivery_app/routes.dart';
import 'package:delivery_app/screens/Home.screen.dart';
import 'package:delivery_app/store/store.dart';
import 'package:delivery_app/tools/themes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart' as provider;
import 'package:shared_preferences/shared_preferences.dart';
import 'Navigation.dart';

Future<void> onInit() async{
  final SharedPreferences prefs = await SharedPreferences.getInstance();
  List<dynamic> listFromStorage = jsonDecode(prefs.getString('cart')??'[]');
  List<CartItem> list = listFromStorage.map((i)=>CartItem.fromJson(i)).toList();
  store.set('cart', list);
}

void main(){
  runApp(
      provider.ChangeNotifierProvider(
        create: (context) => RouteStack(),
        child: const MyApp()
      )
  );
  onInit();
}


class MyApp extends StatelessWidget {
  const MyApp({super.key});
  
  @override
  Widget build(BuildContext context) {
    
    return MaterialApp(
      theme: APP_THEME,
      initialRoute: customInitialRoute,
      routes: customRoutes
    );
  }
}

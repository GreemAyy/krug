import 'package:delivery_app/screens/CityPick.screen.dart';
import 'package:delivery_app/screens/Product.screen.dart';
import 'package:flutter/widgets.dart';

import 'Navigation.dart';

Map<String ,Widget Function(BuildContext context)> customRoutes = {
  '/':(context) => const HomeNavigation(),
  '/city':(context) => const CityPickerScreen(),
  '/product':(context){
    var data = ModalRoute.of(context)!.settings.arguments as Map<String,dynamic>;
    return ProductScreen(id: data['id']);
  }
};

String customInitialRoute = '/';
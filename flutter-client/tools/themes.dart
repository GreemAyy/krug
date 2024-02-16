import 'package:flutter/material.dart';

ThemeData APP_THEME = ThemeData(
    primaryColor:const Color.fromARGB(255, 255, 36, 28),
    textTheme:const TextTheme(
        bodyLarge: TextStyle(fontSize: 30,fontWeight: FontWeight.w600),
        bodyMedium: TextStyle(fontSize: 20,fontWeight: FontWeight.w400),
    ),
    scaffoldBackgroundColor:Colors.white,
    appBarTheme:const AppBarTheme(backgroundColor: Colors.white),
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        selectedItemColor: Colors.black,
        backgroundColor: Colors.white
    ),
    
);

class MyColors{
    static Color lessGray = Color.fromARGB(147, 233, 233, 233); 
    static Color moreGray = Color.fromARGB(146, 192, 192, 192);
}
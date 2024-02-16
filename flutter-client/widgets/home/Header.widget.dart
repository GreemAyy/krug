import 'package:delivery_app/widgets/home/header/CityPicker.widget.dart';
import 'package:flutter/material.dart';

class HeaderWidget extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
      final theme = Theme.of(context);
      return Container(
          padding: const EdgeInsets.only(top: 10, bottom: 10, left: 15, right: 15),
          child:Center(
              child: Column(
                  children: [
                      Text("Круг",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: theme.primaryColor,
                          fontSize: 60,
                          fontWeight: FontWeight.w700,
                      )),
                      // CityPickedWidget()
                  ]
              )
          ),
      ); 
  }
}
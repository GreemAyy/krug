import 'package:flutter/material.dart';
import '../../../custom_classes/place.dart';

class CityPicker extends StatefulWidget{
  @override
  State<StatefulWidget> createState() => _StateCityPicker();
}

class _StateCityPicker extends State<CityPicker>{
  late City city;
  bool isLoading = true;

  @override
  void initState() {

    try{

    }catch(e){}
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
   return Container(
     height: 30,
     padding: const EdgeInsets.only(left: 10),
     decoration: const BoxDecoration(
       color: Colors.transparent
     ),
     width: MediaQuery.of(context).size.width,
      child: InkWell(
        onTap: ()=> Navigator.pushNamed(context, '/city'),
        child: Row(
            children: [
              Text(
                isLoading? 'Выберете город': city.name,
                style: const TextStyle(
                    fontSize: 16
                ),
              ),
              const Icon(Icons.arrow_forward_ios, size: 16)
            ]
        ),
      )
   );
  }
}
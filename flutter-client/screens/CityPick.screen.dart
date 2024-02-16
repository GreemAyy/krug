import 'package:delivery_app/screens/Search.screen.dart';
import 'package:delivery_app/widgets/city/CitiesList.dart';
import 'package:flutter/material.dart';
import '../store/store.dart';

class CityPickerScreen extends StatelessWidget{
  const CityPickerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
       slivers: [
        SliverAppBar(
          pinned: true,
          elevation: 0,
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(15),
            child: Padding(
                padding: const EdgeInsets.only(bottom: 10, left: 10, right: 10),
                  child:Row(
                    children: [
                      InkWell(
                        onTap: ()=>Navigator.pop(context),
                        child: const Icon(Icons.arrow_back, size: 45)
                      ),
                      Expanded(
                          child: Padding(
                            padding: const EdgeInsets.only(left: 7.5),
                            child: SearchTextField(
                              inputCallback: (String text) {
                                store.updateWithData('city_search', text);
                              },
                              hintText: 'Введите город',
                            )
                          )
                      )
                  ]
                )
            )
          )
        ),
         const CitiesList()
       ]
      )
    );
  }
}
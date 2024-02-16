import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import '../../store/store.dart';

class CitiesList extends StatefulWidget{
  const CitiesList({super.key});

  @override
  State<StatefulWidget> createState() => _StateCitiesList();
}

class _StateCitiesList extends State<CitiesList>{
  @override
  void initState() {
    super.initState();
    store.watch('city_search', (String text){
      print(text);
    });
  }

  @override
  Widget build(BuildContext context) {
    return SliverList(
        delegate: SliverChildBuilderDelegate(
            childCount: 100,
            (context, index){
              return Text(index.toString());
            }
        )
    );
  }
}
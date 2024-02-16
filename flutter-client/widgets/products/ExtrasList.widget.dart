import 'package:delivery_app/tools/list.dart';
import 'package:delivery_app/tools/themes.dart';
import 'package:flutter/material.dart';
import '../../custom_classes/extra.dart';

class ExtrasList extends StatefulWidget{
  ExtrasList({
    required this.onExtraChange,
    this.scrollable = false,
    this.initPicked = const []
  });
  bool scrollable;
  List<int> initPicked;
  Function(List<Extra> extra) onExtraChange;

  @override
  State<StatefulWidget> createState()=> _ExtrasListState();
}

class _ExtrasListState extends State<ExtrasList>{
  List<int> pickedIndexes = [];

  @override
  void initState() {
    pickedIndexes = List<int>.from(widget.initPicked);
    super.initState();
  }

  void pickItem(int id){
    setState(() {
      if(pickedIndexes.contains(id)){
        pickedIndexes.remove(id);
      }else{
        pickedIndexes.add(id);
      }
      widget.onExtraChange(extra_list.where((extra)=>pickedIndexes.contains(extra.id)).toList());
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return GridView.count(
        physics: widget.scrollable?const BouncingScrollPhysics():const NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        childAspectRatio: .7,
        mainAxisSpacing: 5,
        crossAxisSpacing: 5,
        crossAxisCount: 3,
        children: extra_list
                  .map((e) =>
                    InkWell(
                      onTap: () => pickItem(e.id),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        padding: const EdgeInsets.symmetric(vertical: 6),
                        decoration: BoxDecoration(
                          color: MyColors.lessGray,
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: pickedIndexes.contains(e.id)?theme.primaryColor:Colors.white,
                            width: 2
                          )
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Image.network(
                              '${extra_img_prefix}${e.image}',
                              width: 70),
                            Text(
                              e.name,
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 13
                            )),
                            Text(
                              '${e.price}₽'
                            )
                          ]
                        ),
                    ))
                  )
                  .toList());
  }
}
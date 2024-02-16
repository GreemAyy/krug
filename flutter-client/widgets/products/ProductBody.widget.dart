import 'package:delivery_app/custom_classes/product.dart';
import 'package:delivery_app/tools/conts.dart';
import 'package:delivery_app/widgets/products/ExtrasList.widget.dart';
import 'package:flutter/material.dart';
import '../../custom_classes/extra.dart';

class ProductBody extends StatefulWidget{
  ProductBody({
    super.key,
    required this.product,
    required this.onSizeChange,
    required this.onExtraChange
  });
  Product product;
  Function(Info info) onSizeChange;
  Function(List<Extra> extra) onExtraChange;
  
  @override
  State<StatefulWidget> createState() => _ProductBodyState();
}

class _ProductBodyState extends State<ProductBody>{
  int pickedIndex = 0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final screenWidth = MediaQuery.of(context).size.width;
    return CustomScrollView(
            physics: const BouncingScrollPhysics(decelerationRate: ScrollDecelerationRate.fast),
            slivers: [
              SliverAppBar(
                pinned: true,
                elevation: 0,
                expandedHeight: 425,
                leading:IconButton(
                          icon: const Icon(Icons.arrow_back), 
                          color: Colors.black,
                          iconSize: 45,
                          onPressed:()=> Navigator.pop(context)
                        ),
                flexibleSpace: FlexibleSpaceBar(
                  centerTitle: true,
                    title: Text(
                        widget.product.name, 
                        style: const TextStyle(
                          color: Colors.black,
                          fontSize: 22.5,
                          fontWeight: FontWeight.w600,
                          backgroundColor: Color.fromARGB(100, 255, 255, 255)
                        )
                      ),
                  background: Image.network(
                  '$URL_MAIN/api/products/image/${widget.product.imagesId[0]}',
                    fit: BoxFit.contain,
                  )
                )
              ),
              SliverToBoxAdapter(
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
                  decoration:BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(25)
                  ),
                  child: Column(
                    children: [
                        Text(
                          '${widget.product.info[pickedIndex].price}₽',
                          style: const TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w600
                          ),
                        ),
                        Text(
                          '${widget.product.info[pickedIndex].weight.toInt()}'+
                          '${widget.product.info[pickedIndex].measure=='g'?'гр.':'л.'}'
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
                          child: Text(
                            widget.product.description,
                            style:const TextStyle(
                              color: Colors.black87,
                              fontSize: 20,
                              fontWeight: FontWeight.w300
                            )
                          )),
                          Padding(
                            padding: const EdgeInsets.only(bottom: 7.5),
                            child: SizePicker(
                              infos: widget.product.info,
                              pickedIndex: pickedIndex,
                              onPick: (index){
                                setState(()=>pickedIndex=index);
                                widget.onSizeChange(widget.product.info[index]);
                              }
                            )
                          ),
                          if(widget.product.category=='pizza')
                            ExtrasList(onExtraChange: widget.onExtraChange,)
                    ]
                  )
                )
              ),
            ]
          );
  }
}

class SizePicker extends StatelessWidget{
  SizePicker({
    super.key,
    required this.infos,
    required this.pickedIndex,
    required this.onPick
  });
  List<Info> infos; 
  void Function(int index) onPick;
  int pickedIndex;

  String infoConverter(Info info){
      var SIZES = {'s':'Маленькая','m':'Средняя','l':'Большая','o':'Один размер'};
      return SIZES[info.size] ?? 'Ошибка';
  }
  
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: infos.length>1?/*if*/
                          MainAxisAlignment.spaceBetween:/*else*/
                          MainAxisAlignment.center,
      children: infos.asMap().entries.map((entry){
        var info = infos[entry.key];
        return ElevatedButton(
          onPressed:()=> onPick(entry.key), 
          style: ButtonStyle(
              elevation: MaterialStateProperty.all(0),
              backgroundColor: MaterialStateProperty.all<Color>(entry.key==pickedIndex?theme.primaryColor:Colors.white),
              shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20)
                )
              )
          ),
          child: Text(
            infoConverter(info),
            style: TextStyle(
              color: entry.key==pickedIndex?Colors.white:Colors.black,
              fontSize: 15,
              fontWeight: FontWeight.w600
            )
          ));
      }).toList(),
    );
  }
}
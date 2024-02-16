import 'package:delivery_app/tools/conts.dart';
import 'package:delivery_app/tools/themes.dart';
import 'package:flutter/material.dart';
import 'package:delivery_app/custom_classes/product.dart';

class ProductItemWidget extends StatelessWidget{
  ProductItemWidget({
    super.key,
    required this.product
  });
  Product product;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: ()=>
          Navigator.pushNamed(context, '/product', arguments: {'id': product.id}),
      child: Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: MyColors.moreGray,
            blurRadius: 3,
            offset: const Offset(2, 2)
          )
        ]
      ),
      child: Row(
        children: [
          Image.network('$URL_MAIN/api/products/image/${product.imagesId[0]}', width: 120),
          Flexible(
            child: Center(
              child: Column(
              children: [
                  Text(
                      product.name, 
                      style: const TextStyle(fontWeight: FontWeight.w700)
                      ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical:10),
                    child: Text( product.description, 
                          textAlign: TextAlign.center,
                          style: const TextStyle(
                              fontSize: 15,
                              color: Colors.black54,
                              fontWeight: FontWeight.w300
                          ))),
                  Text(
                    '${product.info.length>1?'от':''} ${product.info[0].price}₽',
                    textAlign: TextAlign.start,
                    style: TextStyle(
                        color: theme.primaryColor,
                        fontWeight: FontWeight.w700,
                        fontSize: 22.5
                    ))
              ]
          )))
        ]
      ) 
    ),
    );
  }
}
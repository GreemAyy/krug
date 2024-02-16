import 'package:delivery_app/tools/themes.dart';
import 'package:flutter/material.dart';
import '../../custom_classes/product.dart';
import '../../tools/conts.dart';

class SmallProductItem extends StatelessWidget{
  SmallProductItem({
    super.key,
    required this.product
  });
  Product product;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return InkWell(
      onTap: () => Navigator.pushNamed(context, '/product', arguments: {"id":product.id}),
      child: Container(
          width: 200,
          margin: const EdgeInsets.symmetric(horizontal: 7.5, vertical: 2.5),
          padding: const EdgeInsets.symmetric(horizontal: 5),
          decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                    color: MyColors.moreGray,
                    blurRadius: 3,
                    offset: const Offset(1, 1)
                )
              ]
          ),
          child: Row(
              children: [
                Image.network('$URL_MAIN/api/products/image/${product.imagesId[0]}', width: 70),
                Expanded(
                    child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Text(
                            product.name,
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                                fontSize: 16
                            ),
                          ),
                          Text(
                              "${product.info.length>1?'от':''} ${product.info[0].price}₽",
                              style: TextStyle(
                                  color: theme.primaryColor,
                                  fontSize: 22.5,
                                  fontWeight: FontWeight.w600
                              )
                          )
                        ]
                    )
                )
              ]
          )
      )
    );
  }
}
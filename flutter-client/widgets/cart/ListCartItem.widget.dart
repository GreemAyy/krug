import 'package:delivery_app/tools/conts.dart';
import 'package:delivery_app/tools/themes.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../custom_classes/cart.dart';

class ListCartItem extends StatelessWidget{
  ListCartItem({
    super.key,
    required this.cartItem,
    required this.onCallModal,
    required this.onInc,
    required this.onDec
  });
  CartItem cartItem;
  var SIZES = {'s':'Маленькая','m':'Средняя','l':'Большая','o':'Один размер'};
  Function() onCallModal;
  Function() onInc;
  Function() onDec;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(7.5),
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            color: MyColors.moreGray,
            blurRadius: 5,
            offset: const Offset(2, 2)
          )
        ]
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
              padding: const EdgeInsets.only(right: 5),
              child: Image.network('$URL_MAIN/api/products/image/${cartItem.product.imagesId[0]}',width: 100)
          ),
          Flexible(
              child:Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Text(
                    cartItem.product.name,
                    style: const TextStyle(
                        fontSize: 25,
                        fontWeight: FontWeight.w600
                    ),
                  ),
                  Padding(
                      padding: EdgeInsets.only(top: cartItem.extras.isNotEmpty?5:0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: cartItem.extras.map((extra) =>
                            Text(
                              '- ${extra.name}',
                              style: const TextStyle(
                                  fontSize: 15
                              ),
                            )
                        ).toList(),
                      ),
                  ),
                  Padding(
                      padding: const EdgeInsets.only(top: 7.5),
                      child: Text(
                        SIZES[cartItem.size]??'Ошибка',
                        textAlign: TextAlign.start,
                      ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      if(cartItem.product.category=='pizza')
                        TextButton(
                            onPressed: onCallModal,
                            style: ButtonStyle(
                                overlayColor: MaterialStateProperty.all(MyColors.moreGray)
                            ),
                            child: Text(
                              'Изменить',
                              style: TextStyle(
                                  color: theme.primaryColor,
                                  fontSize: 20
                              ),
                            )
                        )
                      else
                        Text(''),
                      Row(
                        children: [
                          InkWell(
                            onTap: onDec,
                            child: const Icon(Icons.remove, size: 35),
                          ),
                          Text(
                              cartItem.quantity.toString(),
                              style: TextStyle(
                                fontSize: 30
                              ),
                          ),
                          InkWell(
                            onTap: onInc,
                            child: const Icon(Icons.add, size: 35),
                          )
                        ],
                      )
                    ],
                  )
                ],
              )
          )
        ],
      ),
    );
  }
}
import 'package:delivery_app/custom_classes/extra.dart';
import 'package:delivery_app/custom_classes/product.dart';
import 'package:delivery_app/http/products.http.dart';
import 'package:delivery_app/store/store.dart';
import 'package:delivery_app/tools/conts.dart';
import 'package:delivery_app/tools/themes.dart';
import 'package:delivery_app/widgets/products/ProductBody.widget.dart';
import 'package:flutter/material.dart';

import '../custom_classes/cart.dart';

class ProductScreen extends StatefulWidget{
  ProductScreen({
    super.key,
    required this.id
  });
  int id;

  @override
  State<StatefulWidget> createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen>{
    late Product product;
    late Info currentInfo;
    List<Extra> extraList = [];
    bool isLoading = true;

    @override
    void initState(){
      getSingleProductHttp(widget.id)
      .then((data) => 
          setState(() {
            product = data;
            currentInfo = product.info[0];
            isLoading = false;
          })
      );
      super.initState();
    }

    void addToCart(){
      store.updateWithData('add',
          CartItem(quantity: 1,extras: extraList, product: product, size: currentInfo.size)
      );
      Navigator.pop(context);
    }

    @override
    Widget build(BuildContext context) {
      final theme = Theme.of(context);
      return Scaffold(
        body: SafeArea(
          child:(
            isLoading?/*if*/
            Center(
              child: CircularProgressIndicator(
                color: theme.primaryColor
              )
            ):/*else*/
            ProductBody(
              product: product,
              onSizeChange: (info) => setState(() => currentInfo = info),
              onExtraChange: (extra) => setState(() => extraList = extra),
            )
          )),
          bottomNavigationBar: InkWell(
              onTap: (){
                if(!isLoading){
                  addToCart();
                }
              },
              child: Container(
              padding: const EdgeInsets.symmetric(vertical: 12.5),
              decoration: BoxDecoration(
                color: theme.primaryColor,
              ),
              child: Text(
                  'Добавить в корзину',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.white,
                    backgroundColor: theme.primaryColor,
                    fontSize: 20,
                    fontWeight: FontWeight.w700
                  ),
                ),
            )
          ),
      );
    }
}

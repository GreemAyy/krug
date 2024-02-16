import 'dart:convert';

import 'package:delivery_app/custom_classes/product.dart';
import 'package:delivery_app/tools/methods.dart';
import 'package:delivery_app/widgets/account/CallPhoneModal.dart';
import 'package:delivery_app/widgets/cart/ListCartItem.widget.dart';
import 'package:delivery_app/widgets/products/ExtrasList.widget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../custom_classes/cart.dart';
import '../custom_classes/extra.dart';
import '../store/store.dart';

class CartScreen extends StatefulWidget{
  const CartScreen({super.key});

  @override
  State<StatefulWidget> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen>{
  List<CartItem> cartList = [];
  @override
  void initState() {
    store.watch<List<CartItem>>('cart', (data) {
      print(data);
      setState(() => cartList = data);
    });
    store.watch<CartItem>('add', (data) async{
      var updatedList = addToList(cartList, data);
      print(updatedList);
      setState(()=>cartList=updatedList);
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('cart', jsonEncode(updatedList.map((i)=>i.toJson()).toList()));
    });
    super.initState();
  }

  void inc(int index){
    setState(() {
      cartList[index].quantity+=1;
      updateStorage();
    });
  }
  void dec(int index){
    setState(() {
      if(cartList[index].quantity==1){
        cartList.removeAt(index);
      }else{
        cartList[index].quantity-=1;
      }
      updateStorage();
    });
  }
  void updateStorage() async{
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('cart', jsonEncode(cartList.map((i)=>i.toJson()).toList()));
  }
  void updateExtra(int index, List<Extra> extras){
    setState((){
      cartList[index].extras = extras;
      updateStorage();
      Navigator.pop(context);
    });
  }
  void callModal(int index, double height){
    var pickedExtras = cartList[index].extras;
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
            topLeft: Radius.circular(20),
            topRight: Radius.circular(20)
        )
      ),
      builder: (BuildContext context) {
        return Container(
          height: height,
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
          child: CustomScrollView(
            physics: const BouncingScrollPhysics(),
            slivers: [
              const SliverToBoxAdapter(
                child: Padding(
                  padding: EdgeInsets.all(5),
                  child: Text(
                      'Дополнения',
                      style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.w600
                      )
                  ),
                )
              ),
              SliverToBoxAdapter(
                child: ExtrasList(
                    onExtraChange: (extra){
                      pickedExtras = extra;
                    },
                    initPicked: pickedExtras.map((e) => e.id).toList(),
                )
              ),
              SliverToBoxAdapter(
                child: InkWell(
                  onTap: () => updateExtra(index, pickedExtras),
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                    padding: const EdgeInsets.symmetric(vertical: 5),
                    decoration: BoxDecoration(
                      color: Theme.of(context).primaryColor,
                      borderRadius: BorderRadius.circular(10)
                    ),
                    child: const Text(
                        'Сохранить',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 25,
                          color: Colors.white,
                          fontWeight: FontWeight.w600
                        )
                    )
                  )
                )
              )
            ]
          )
        );
      }
    );
  }
  void openPhoneModal(BuildContext context) async {
    var id = store.get('id');
    if(id==null){
      showPhoneModal(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    double screenHeight = MediaQuery.of(context).size.height;

    return
      cartList.isEmpty ? /*if*/
      SafeArea(
          child:Center(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Transform.rotate(
                      angle: 0.55,
                      child: Icon(
                        Icons.local_pizza,
                        size: 150,
                        color: theme.primaryColor,
                      )
                  ),
                  const Text(
                      'Корзина пуста',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.w600
                      )
                  )
                ]
            )
          )
      ) : /*else*/
      Scaffold(//showPhoneModal
      bottomNavigationBar: InkWell(
        onTap: () => openPhoneModal(context),
        child: Container(
            padding: const EdgeInsets.symmetric(vertical: 10),
            decoration: BoxDecoration(
                color: theme.primaryColor,
                borderRadius: const BorderRadius.only(topLeft: Radius.circular(20), topRight: Radius.circular(20))
            ),
            child: const Text(
                'Оформить заказ',
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontSize: 25,
                    color: Colors.white,
                    fontWeight: FontWeight.w600
                )
            )
        ),
      ),
      body: SafeArea(
          child: CustomScrollView(
              physics: const BouncingScrollPhysics(),
              slivers: [
                const SliverAppBar(
                    title: Text(
                        'Корзина',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 27.5,
                          fontWeight: FontWeight.w600,
                        )
                    )
                ),
                SliverList(
                    delegate: SliverChildBuilderDelegate(
                        childCount: cartList.length,
                            (context, index) => ListCartItem(
                            onInc: () => inc(index),
                            onDec: () => dec(index),
                            cartItem: cartList[index],
                            onCallModal: ()=>callModal(index, screenHeight/2)
                        )
                    )
                )
              ]
          )
      )
    );
  }
}
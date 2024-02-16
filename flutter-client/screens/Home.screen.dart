import 'package:delivery_app/widgets/home/Header.widget.dart';
import 'package:delivery_app/widgets/home/header/CityPicker.widget.dart';
import 'package:delivery_app/widgets/products/SmallProductItem.widget.dart';
import 'package:flutter/material.dart';

import '../custom_classes/product.dart';
import '../http/products.http.dart';
import '../tools/conts.dart';
import '../widgets/products/ProductItem.widget.dart';

class HomeScreen extends StatefulWidget{
  const HomeScreen({super.key});

  @override
  State<StatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen>{
  bool isLoading = true;
  late Map<String, List<Product>> productList = {};

  @override
  void initState() {
    getAllProductHttp()
        .then((value){
      Map<String, List<Product>> filteredValue = {};
      for(var cat in CATEGORIES.keys.toList()){
        filteredValue[cat] = value.where((product) => product.category==cat).toList();
      }
      setState(() {
        productList = filteredValue;
        isLoading=false;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return  SafeArea(
            child:
                isLoading? /*if*/
                Center(child:
                  CircularProgressIndicator(
                    color: theme.primaryColor
                  )
                ): /*else*/
                CustomScrollView(
                // scrollBehavior: ScrollConfiguration.of(context).copyWith(overscroll: false),
                physics: const BouncingScrollPhysics(decelerationRate: ScrollDecelerationRate.fast),
                slivers: [
                  SliverAppBar(
                    pinned: true,
                    elevation: 0,
                    bottom: PreferredSize(
                      preferredSize: const Size.fromHeight(-20),
                      child: CityPicker(),
                    ),
                  ),
                  SliverToBoxAdapter(
                    child: HeaderWidget()
                  ),
                  const SliverToBoxAdapter(
                    child: Padding(
                        padding: EdgeInsets.only(left: 10, bottom: 7.5),
                        child: Text(
                            'Советуем',
                            style: TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 30
                            ),
                        )
                    )
                  ),
                  SliverToBoxAdapter(
                    child: Container(
                      height: 100,
                      padding: const EdgeInsets.symmetric(horizontal: 5),
                      child: ListView.builder(
                          physics: const BouncingScrollPhysics(decelerationRate: ScrollDecelerationRate.fast),
                          scrollDirection: Axis.horizontal,
                          itemCount: productList.length,
                          itemBuilder: (context, index){
                            final key = productList.keys.toList()[index];
                            return SmallProductItem(product: productList[key]![0]);
                          }
                      )
                    )
                  ),
                  const SliverToBoxAdapter(child: SizedBox(height: 15)),
                  ...productList.keys
                      .map((key){
                        return SliverList(
                            delegate: SliverChildBuilderDelegate(
                                childCount: productList[key]!.length+1,
                                (context, index) =>
                                    index==0?
                                    Padding(
                                        padding:const EdgeInsets.symmetric(horizontal: 10,vertical: 5),
                                        child: Text(
                                          CATEGORIES[key]??"Ошибка",
                                          style: const TextStyle(
                                            fontSize: 30,
                                            fontWeight: FontWeight.w600
                                          ),
                                        )
                                    ):
                                    ProductItemWidget(product: productList[key]![index-1])
                            ));
                      }).toList()
                ]
            )
        );
  }
}


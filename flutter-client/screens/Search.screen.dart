import 'package:delivery_app/custom_classes/product.dart';
import 'package:delivery_app/http/products.http.dart';
import 'package:delivery_app/tools/themes.dart';
import 'package:delivery_app/widgets/products/ProductItem.widget.dart';
import 'package:flutter/material.dart';

class SearchScreen extends StatefulWidget{
  const SearchScreen({super.key});
  
  @override
  State<StatefulWidget> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen>{
  List<Product> productList = [];
  bool isLoading = false;
  void searchProduct(String text) async{
    if(text.isNotEmpty){
      setState(() => isLoading = true);
      var value = await getProductsBySearchHttp(text);
      setState((){
        productList = value;
        isLoading = false;
      });
    }else {
      setState(() => productList = []);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return SafeArea(child:
        CustomScrollView(
        physics: const BouncingScrollPhysics(decelerationRate: ScrollDecelerationRate.fast),
        slivers: [
            SliverAppBar(
              pinned: true,
              elevation: 0,
              backgroundColor: Colors.transparent,
              bottom: PreferredSize(
                preferredSize: const Size.fromHeight(20), 
                child: Container(
                padding: const EdgeInsets.all(10),
                child: SearchTextField(inputCallback: searchProduct)
              ))
            ),
            isLoading? /*if*/
              SliverToBoxAdapter(child:
                Center(
                  child: CircularProgressIndicator(
                      color: theme.primaryColor
                  )
                )) : /*else*/
            (
              productList.isNotEmpty? /*if*/
              SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) => ProductItemWidget(product: productList[index]),
                childCount: productList.length
                )
              ) : /*else*/
              const SliverToBoxAdapter(
                child: Text(
                  "Пусто", 
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 35,
                    fontWeight: FontWeight.w600
                  )),
              )
            )
        ]))
      ;
  }
}

class SearchTextField extends StatefulWidget{
  SearchTextField({
      super.key,
      required this.inputCallback,
      this.hintText = 'Поиск',
      this.borderWidth = 3,
      this.borderColor
  });
  String hintText;
  double borderWidth;
  Color? borderColor;
  void Function(String text) inputCallback;
  
  @override
  State<StatefulWidget> createState() => _SearchTextFieldState();
}

class _SearchTextFieldState extends State<SearchTextField>{
  FocusNode focusNode = FocusNode();
  @override
  void initState() {
    super.initState();
    // _requestFocus();
  }
  void _requestFocus() {
    Future.delayed(Duration.zero, () {
      FocusScope.of(context).requestFocus(focusNode);
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final borderTheme = OutlineInputBorder(
                    borderSide: BorderSide(
                        color: widget.borderColor ?? theme.primaryColor,
                        width: widget.borderWidth
                    ),
                    borderRadius: BorderRadius.circular(35),
                    gapPadding: 0
                );

    return  TextField(
              style:const TextStyle(
                fontSize: 22.5
              ),
              focusNode: focusNode,
              decoration: InputDecoration(
                filled: true,
                fillColor: Colors.white.withOpacity(.9),
                hintText: widget.hintText,
                contentPadding:const EdgeInsets.symmetric(vertical: 7.5),
                prefixIcon:const Icon(Icons.search, color: Colors.black),
                enabledBorder: borderTheme,
                focusedBorder: borderTheme 
              ),
              onChanged: widget.inputCallback,
          );
    } 
}
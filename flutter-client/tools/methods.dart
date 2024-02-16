import 'package:delivery_app/custom_classes/cart.dart';

List<CartItem> addToList(List<CartItem> cart, CartItem newItem){
  var itemIndex = cart.indexWhere(
          (item)=>item.product.id == newItem.product.id &&
                  newItem.extras.isEmpty &&
                  newItem.size==item.size);
  if(itemIndex != -1){
    cart[itemIndex].quantity+=1;
  }else{
    cart.add(newItem);
  }
  return cart;
}

List<CartItem> removeFromList(List<CartItem> cart, int indexInList){
  var currentItem = cart[indexInList];
  if(currentItem.quantity>1){
    cart[indexInList].quantity-=1;
  }else{
    cart.removeAt(indexInList);
  }
  return cart;
}
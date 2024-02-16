import 'package:delivery_app/screens/Account.screen.dart';
import 'package:delivery_app/screens/Cart.screen.dart';
import 'package:delivery_app/screens/Home.screen.dart';
import 'package:delivery_app/screens/Search.screen.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class RouteStack extends ChangeNotifier{
  int _currentIndex = 0;
  int get currentIndex => _currentIndex;

  void setIndex(int index){
    _currentIndex = index;
    notifyListeners();
  }
}

class HomeNavigation extends StatelessWidget{
  const HomeNavigation({super.key});
  final screens = const [HomeScreen(), AccountScreen(), SearchScreen(), CartScreen()];

  @override
  Widget build(BuildContext context) {
    final routeState = Provider.of<RouteStack>(context);
    final theme = Theme.of(context);
    return Scaffold(
        body:IndexedStack(
          index:routeState.currentIndex,
          children: screens,
        ),
        bottomNavigationBar: BottomNavigationBar(
            showSelectedLabels: true,
            showUnselectedLabels: false,
            unselectedItemColor: Colors.black54,
            items: [
          BottomNavigationBarItem(icon:const Icon(Icons.home),label: 'Меню', activeIcon: Icon(Icons.home,color: theme.primaryColor)),
          BottomNavigationBarItem(icon:const Icon(Icons.account_circle),label: 'Профиль',activeIcon: Icon(Icons.account_circle,color: theme.primaryColor)),
          BottomNavigationBarItem(icon:const Icon(Icons.search),label: 'Поиск',activeIcon: Icon(Icons.search,color: theme.primaryColor)),
          BottomNavigationBarItem(icon: const Icon(Icons.shopping_cart),label: 'Корзина',activeIcon: Icon(Icons.shopping_cart,color: theme.primaryColor))
        ],onTap:(i)=>routeState.setIndex(i), currentIndex: routeState.currentIndex)
    );
  }
}




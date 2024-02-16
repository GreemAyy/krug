import 'dart:async';
import 'package:delivery_app/tools/themes.dart';
import 'package:delivery_app/widgets/account/UserInfo.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../custom_classes/user.dart';
import '../store/store.dart';
import '../widgets/account/CallPhoneModal.dart';

class AccountScreen extends StatefulWidget{
  const AccountScreen({super.key});

  @override
  State<StatefulWidget> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen>{
  bool isLoading = true;
  bool haveAccess = false;
  bool next = false;
  int _id = 0;
  String _hash = '';

  @override
  void initState() {
    init();
    store.watch('user', (_) async {
      init();
    });
    super.initState();
  }
  void init() async{
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var id = prefs.getInt('id');
    var hash = prefs.getString('hash');
    setState((){
      _id = id??0;
      _hash = hash??'';
    });
    setState(() {
      if(id != null){
        haveAccess = true;
        isLoading = false;
        store.multiSet(['id', 'hash'], [id, hash]);
      }else{
        haveAccess = false;
        isLoading = false;
        store.multiSet(['id', 'hash'], [null, null]);
      }
    });
  }
  
  void logout() async{
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('id');
    prefs.remove('hash');
    store.update('user');
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    if(isLoading){
      return SafeArea(
          child: Center(
              child: CircularProgressIndicator(
                  color: theme.primaryColor
              )
          )
      );
    }
    if(!haveAccess){
      return SafeArea(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.account_circle, size: 150, color: theme.primaryColor),
                const Padding(
                    padding: EdgeInsets.only(bottom: 15),
                    child: Text(
                        'Войдите или зарегестрируйтесь',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w600
                        )
                    )
                ),
                OutlinedButton(
                    onPressed: () => showPhoneModal(context),
                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(theme.primaryColor),
                      padding: MaterialStateProperty.all(const EdgeInsets.symmetric(vertical: 5, horizontal: 15))
                    ),
                    child: const Text(
                        'Войти',
                        style: TextStyle(
                          fontSize: 30,
                          color: Colors.white
                        )
                    )
                )
              ]
            )
          )
      );
    }
    return SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            SliverAppBar(
              title: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                      'Профиль',
                      style: TextStyle(
                          color: Colors.black,
                          fontSize: 27.5,
                          fontWeight: FontWeight.w600
                      )
                  ),
                  InkWell(
                    child: Container(
                      padding: const EdgeInsets.all(5),
                      decoration: BoxDecoration(
                        color: MyColors.lessGray,
                        borderRadius: BorderRadius.circular(35)
                      ),
                      child: const Icon(Icons.settings, size: 35, color: Colors.black),
                    )
                  )
                ],
              )
            ),
            SliverToBoxAdapter(
              child: UserInfo(id: _id, hash: _hash),
            )
          ]
        )
    );
  }
}

/*
* SliverToBoxAdapter(
              child: InkWell(
                onTap: logout,
                child: Text('Выйти'),
              )
            )
* */
import 'package:delivery_app/http/user.http.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../custom_classes/user.dart';

class UserInfo extends StatefulWidget{
  UserInfo({
    super.key,
    required this.id,
    required this.hash
  });
  int id;
  String hash;

  @override
  State<StatefulWidget> createState() => _StateUserInfo();
}

class _StateUserInfo extends State<UserInfo>{
  bool isLoading = true;
  late User user;

  @override
  void initState() {
    getUser(widget.id)
    .then((value){
      setState(() {
        user = value;
        isLoading = false;
      });
    });
    super.initState();
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
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
              user.name.isEmpty ? 'Здравствуйте' : 'Здравствуйте, ${user.name}',
              style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.w600,
                  color: theme.primaryColor,
                  decoration: TextDecoration.underline
              )
          )
        ]
      ),
    );
  }
}
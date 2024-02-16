import 'package:delivery_app/http/user.http.dart';
import 'package:flutter_multi_formatter/flutter_multi_formatter.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../store/store.dart';

void showPhoneModal(BuildContext context){
  double screenHeight = MediaQuery.of(context).size.height;
  double screenWidth = MediaQuery.of(context).size.width;

  showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(20),
              topRight: Radius.circular(20)
          )
      ),
      builder: (BuildContext context){
        return  Padding(
            padding:EdgeInsets.only(
                bottom: MediaQuery.of(context).viewInsets.bottom),
            child: Container(
                padding: const EdgeInsets.all(10),
                height: screenHeight/3,
                width: screenWidth,
                child: const AuthUser()
            ),
        );
      }
  );
}

class AuthUser extends StatefulWidget{
  const AuthUser({super.key});

  @override
  State<StatefulWidget> createState() => _StateAuthUser();
}

class _StateAuthUser extends State<AuthUser>{
  bool next = false;
  int dur = 200;
  String inputValue = '';
  String codeValue = '';
  String code = '';
  String? errorText;
  String? codeErrorText;

  void sendSMS(){
    var toFormat = inputValue.replaceAll(RegExp(r'[^0-9]'), '');
    setState((){
      if(toFormat.length==11){
        errorText = null;
        try{
          createUserCodeHttp('+$toFormat')
              .then((value){
            setState(() {
              code = value;
              next = true;
            });
          });
        }catch(e){
          setState(() => errorText = 'Ошибка');
        }
      }else{
        errorText = 'Недостаточная длина';
      }
    });
  }

  void auth() async {
    if(code.length==4){
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      var toFormat = inputValue.replaceAll(RegExp(r'[^0-9]'), '');
      try{
        var createUser = await createUserHttp('+$toFormat', codeValue);
        if (createUser != null) {
          prefs.setInt('id', createUser['id']);
          prefs.setString('hash', createUser['hash']);
          store.update('user');
          Navigator.pop(context);
        } else {
          codeErrorText = 'Неверный код';
        }
      }catch(e){
        setState(() {
          codeErrorText = 'Неверный код';
        });
      }

    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    final borderTheme = OutlineInputBorder(
        borderSide: BorderSide(color: theme.primaryColor, width: 3),
        borderRadius: BorderRadius.circular(10),
        gapPadding: 0
    );

    return Stack(
      children: [
        AnimatedPositioned(
            top: screenHeight/15,
            left: next?-screenWidth:0,
            width: screenWidth-20,
            height: screenHeight,
            duration: Duration(milliseconds: dur),
            child: Column(
              children: [
                const Padding(
                    padding: EdgeInsets.only(bottom: 7.5),
                    child: Text(
                      'Введите номер телефона',
                      style: TextStyle(
                          fontSize: 25,
                          fontWeight: FontWeight.w600
                      )
                    )
                ),
                TextFormField(
                    keyboardType: TextInputType.phone,
                    style: const TextStyle(fontSize: 20),
                    onChanged: (t) => setState(() => inputValue = t),
                    decoration: InputDecoration(
                      hintText: '+7 (900) 800-70-60',
                        enabledBorder: borderTheme,
                        focusedBorder: borderTheme,
                        errorText: errorText
                    ),
                    inputFormatters: [ MaskedInputFormatter('+7 (###) ###-##-##') ],
                ),
                OutlinedButton(
                    onPressed: sendSMS,
                    style: ButtonStyle(
                      padding: MaterialStateProperty.all(const EdgeInsets.symmetric(vertical: 5, horizontal: 15)),
                      backgroundColor: MaterialStateProperty.all(theme.primaryColor)
                    ),
                    child: const Text(
                      'Отправить',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 25
                      )
                    )
                )
              ]
            )
        ),
        AnimatedPositioned(
            top: screenHeight/20,
            left: next?0:screenWidth,
            width: screenWidth-20,
            height: screenHeight,
            duration: Duration(milliseconds: dur),
            child: Column(
              children: [
                const Padding(
                    padding: EdgeInsets.only(bottom: 7.5),
                    child: Text(
                        'Код из сообщения',
                        style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.w600
                        )
                    )
                ),
                SizedBox(
                  width: screenWidth/2,
                  child: TextFormField(
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.number,
                      style: const TextStyle(fontSize: 50),
                      maxLength: 4,
                      onChanged: (t) => setState(() => codeValue = t),
                      decoration: InputDecoration(
                        enabledBorder: borderTheme,
                        focusedBorder: borderTheme,
                        contentPadding:const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
                        errorText: codeErrorText
                      )
                  )
                ),
                OutlinedButton(
                    onPressed: auth,
                    style: ButtonStyle(
                        padding: MaterialStateProperty.all(const EdgeInsets.symmetric(vertical: 5, horizontal: 15)),
                        backgroundColor: MaterialStateProperty.all(theme.primaryColor)
                    ),
                    child: const Text(
                        'Отправить',
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 25
                        )
                    )
                )
              ]
            )
        )
      ]
    );
  }
}
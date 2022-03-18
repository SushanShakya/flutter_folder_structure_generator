export let time_extension = `import 'package:flutter/material.dart';

extension TimeUtil on TimeOfDay {
  String get stringify {
    var time = this;
    if (time.hour > 12 || (time.hour == 12 && time.minute > 0)) {
      // PM
      var hr = time.hour == 12 ? 12 : time.hour - 12;
      return "$hr:\${time.minute.toString().padLeft(2, '0')} PM";
    } else {
      //AM
      var hr = time.hour == 0 ? 12 : time.hour;
      return "$hr:\${time.minute.toString().padLeft(2, '0')} AM";
    }
  }
}
`
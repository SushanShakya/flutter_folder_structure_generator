export let date_extension = `import 'package:flutter/material.dart';
import 'time_extension.dart';

extension DateUtils on DateTime {
  static final Map<int, String> _months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  // static final Map<int, String> _fullmonths = {
  //   1: "January",
  //   2: "February",
  //   3: "March",
  //   4: "April",
  //   5: "May",
  //   6: "June",
  //   7: "July",
  //   8: "August",
  //   9: "September",
  //   10: "October",
  //   11: "November",
  //   12: "December",
  // };

  String get stringify => "$year-$month-$day";

  String get excludeYear => "$month/$day";

  String get dayFormat {
    var m = _months[month];
    return '$m $day';
  }

  String get namedFormat {
    var m = _months[month];
    return "$m $day, $year";
  }

  static final Map<int, String> _weekDay = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun'
  };
  static final Map<int, String> _weekDayFull = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday'
  };

  String get weekFormat => _weekDayFull[weekday] ?? '';
  String get weekFormatCut => _weekDay[weekday] ?? '';

  String get formatted {
    var date = this;
    return "\${_weekDay[date.weekday]}, \${_months[date.month]} \${date.day}";
  }

  String get msgFormat {
    TimeOfDay cur = TimeOfDay.fromDateTime(this);
    if (DateTime.now().difference(this).inDays == 0) {
      return cur.stringify;
    }
    return '\${_weekDay[weekday]} @ \${cur.stringify}';
  }
}
`
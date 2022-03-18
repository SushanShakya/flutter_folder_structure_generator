export let int_extension = `extension IntFormat on int {
  String get nepaliFormat {
    String str = toString();
    int len = str.length;
    List<String> formatted = str.split("").reversed.toList();
    if (len > 3) {
      formatted = [];
      for (int i = 0; i < len; i++) {
        if (i == 3 || (i % 2 != 0 && i > 3)) formatted.add(",");
        formatted.add(str[len - i - 1]);
      }
    }
    return formatted.reversed.join();
  }

  static Map<String, String> nepaliNumbers = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
    ",": ",",
  };

  String get toNepali {
    return nepaliFormat.split('').map((e) => nepaliNumbers[e]).join();
  }

  String get cartFormat {
    return (this > 9) ? '9+' : toString();
  }
}
`
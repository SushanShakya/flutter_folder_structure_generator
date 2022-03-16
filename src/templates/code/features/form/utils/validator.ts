export let validator = `class Validator {
  static String? validateEmail(String? value) {
    if (value == null) return 'Email cannot be empty';
    if (value.isEmpty) return "Email cannot be empty";
    if (!RegExp(
            r"^[a-zA-Z0-9.!#$%&'*+/=?^\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$")
        .hasMatch(value)) return "Email field is not valid";
    return null;
  }

  static String? validatePassword(String? value) {
    if (value == null) return 'Password cannot be empty';
    if (value.isEmpty) {
      return "Password cannot be empty";
    }
    if (value.length < 8) {
      return "Password should have 8 characters.";
    }

    // if (!value.split("").contains("0123456789")) {
    //   return "Password should have 1 digit";
    // }

    return null;
  }

  static String? validateNoSpecial(String? value) {
    if (value == null) return 'Cannot be empty';
    var val = validateEmpty(value);
    if (val != null) return val;
    final re = RegExp(r'\\W');
    if (re.hasMatch(value)) {
      return "Cannot contain special characters";
    }
    return null;
  }

  static String? validatePhoneNumber(String? value) {
    if (value == null) return 'Enter valid phone number';
    String? status = validateEmpty(value);
    if (status != null) return status;
    int? number = int.tryParse(value);
    if (number == null) return "Enter valid phone number";
    return value.length == 10 ? null : "Mobile number must be 10 digit";
  }

  static String? validateConfirmPassword(String? value, String password) {
    if (value == null) return 'Passwords do not match';
    return value == password ? null : "This does not match with password";
  }

  static String? validateEmpty(String? value) {
    if (value == null) return 'The field cannot be empty';
    return value.isNotEmpty ? null : 'The field cannot be empty';
  }
}
`
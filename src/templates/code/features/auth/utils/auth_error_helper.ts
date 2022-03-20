export let auth_error_helper = `import 'package:dio/dio.dart';
import '../models/auth_error.dart';

class AuthErrorHelper {
  static AuthError extractLoginError(DioError error) {
    AuthError err = const AuthError(text: 'Something went wrong !');

    if (error.type == DioErrorType.connectTimeout) {
      err = const AuthError(
        title: 'No Internet',
        text: 'Please Check if your Connection.',
      );
    }

    if (error.response != null) {
      switch (error.response!.statusCode) {
        case 400:
          try {
            err = AuthError(
              title: 'Error',
              text: error.response!.data['message'],
            );
          } catch (e) {
            err = const AuthError(text: 'Error While Login !');
          }

          break;
        case 401:
          err = const AuthError(
            title: 'User not recognized',
            text: 'Please check your inputs !!',
          );
          break;
        case 500:
          err = const AuthError(text: 'Service Unavailable !!');
      }
    }

    return err;
  }

  static AuthError extractRegisterError(DioError error) {
    AuthError err = const AuthError(text: 'Something went wrong !');

    if (error.response != null) {
      if (error.response!.statusCode == 400) {
        try {
          err = AuthError(
            text: error.response!.data['message'][0],
            title: 'Invalid Inputs',
          );
        } catch (e) {}
      }
    }
    return err;
  }
}
`
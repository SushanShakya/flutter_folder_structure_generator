export let login_cubit = `import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';
import '../../../../../locator.dart';
import '../../../../services/storage/prefs.dart';
import '../../utils/auth_error_helper.dart';
import '../../repo/auth_repo.dart';
import '../../models/login_request.dart';
import '../../models/auth_error.dart';

part 'login_state.dart';

class LoginCubit extends Cubit<LoginState> {
  LoginCubit() : super(LoginInitial());

  final _r = g<AuthRepo>();

  login(LoginRequest request) async {
    emit(LoginLoading());
    try {
      var token = await _r.login(request);
      await Prefs.saveString(TOKENKEY, token);
      emit(LoginSuccess());
    } on DioError catch (e) {
      var err = AuthErrorHelper.extractLoginError(e);
      emit(LoginFailed(err));
    }
  }
}
`
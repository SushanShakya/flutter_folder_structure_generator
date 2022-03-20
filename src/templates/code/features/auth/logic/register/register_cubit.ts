export let register_cubit = ` import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:equatable/equatable.dart';
import '../../utils/auth_error_helper.dart';
import '../../repo/auth_repo.dart';

part 'register_state.dart';

class RegisterCubit extends Cubit<RegisterState> {
  RegisterCubit(): super(RegisterInitial());

  final AuthRepo _r = g<AuthRepo>();

register(RegisterRequest req) async {
  emit(RegisterLoading());
  try {
    await _r.register(req);
    emit(RegisterSuccess());
  } on DioError catch (e) {
    var authError = AuthErrorHelper.extractRegisterError(e);
    emit(RegisterFailed(authError));
  }
}
}
`
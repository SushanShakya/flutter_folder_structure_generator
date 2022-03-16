export let navigation_cubit = `import 'package:bloc/bloc.dart';

class NavigationCubit<T> extends Cubit<T> {
  NavigationCubit(T initial) : super(initial);

  changeView(T newView) {
    emit(newView);
  }
}
`

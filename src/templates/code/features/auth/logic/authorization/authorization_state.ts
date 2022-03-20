export let authorization_state = `part of 'authorization_bloc.dart';

abstract class AuthorizationState extends Equatable {
  const AuthorizationState();

  @override
  List<Object> get props => [];
}

class AuthorizedAsGuest extends AuthorizationState {}

class AuthorizationFailed extends AuthorizationState {}

class AuthorizedAsUser extends AuthorizationState {}

class RequiresVerification extends AuthorizationState {}
`
export let authorization_event = `part of 'authorization_bloc.dart';

abstract class AuthorizationEvent extends Equatable {
  const AuthorizationEvent();

  @override
  List<Object> get props => [];
}

class CheckAuthorization extends AuthorizationEvent {}

class RemoveAuthorization extends AuthorizationEvent {}
`
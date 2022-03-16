export let dio_inst = `import 'dart:convert';
import 'package:dio/dio.dart';

Dio dio = Dio(
  BaseOptions(
    baseUrl: '',
    connectTimeout: 5000,
    receiveTimeout: 3000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ),
);
`
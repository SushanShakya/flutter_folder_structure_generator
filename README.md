
<p align="center">
<img src="https://raw.githubusercontent.com/SushanShakya/flutter_folder_structure_generator/main/assets/logo.png" height="100" alt="Architecture Generator" />
</p>

## Overview
[VSCode](https://code.visualstudio.com/) support for generating [Flutter](https://flutter.dev/) project Architecture

## Commands

| Command            | Description          |
| ------------------ | -------------------- |
| `Folder : Horizontal`   | Generate Horizonal Architecture  |
| `Folder : Vertical` | Generate Vertical Architecture |
| `Folder : Feature (Vertical)` | Generate sub-folders for a feature in verticle architecture  |
| `Clean : main.dart` | Clean the defaul code for main.dart  |

Use the commands by right clicking a folder in explorer.<br>
Command cannot be used directly from command palette

## Usage

![demo](https://raw.githubusercontent.com/SushanShakya/flutter_folder_structure_generator/main/assets/usage.gif)


Clean : main.dart<br>
-> Right click on lib folder and click on Clean : main.dart

## Hidden Features

Command :<br>
    Folder : Feature (Vertical)

Using `form` or `forms` as feature name will generate code associated with forms.<br>
    -> Provides `FormBuilder` Widget which can generate forms easily

Using `bottom_nav` as feature name will generate code associated with Bottom Navigation.<br>
    -> Provides `BottomNavView` widget which can be used as a screen

Using `onboarding` as feature name will generate code associated with Onboarding Screens.<br>
    -> Provides `OnboardingView` widget which can be used as a screen

Using `auth` as feature name will generate code associated with Authorization, Login and Register.<br>
    -> Provides `AuthorizationBloc`, `RegisterCubit`, `LoginCubit`  widgets
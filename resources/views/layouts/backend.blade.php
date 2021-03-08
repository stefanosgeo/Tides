<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <!--  <link href="/css/mediaelementplayer.css" rel="stylesheet"> -->
</head>
<body class="bg-gray-100 h-screen antialiased leading-none font-sans">
<div id="app">
    <header class="bg-gray-800 p-2 mt-0 fixed w-full z-10 top-0 py-4">
        <nav class="container mx-auto flex justify-between items-center px-6">
            <div>
                <a href="{{ url('/') }}" class="text-lg font-semibold text-gray-100 no-underline">
                    {{ config('app.name', 'Laravel') }}
                </a>
            </div>
            <nav class="space-x-4 text-gray-300 text-sm sm:text-base">

                @guest
                    <a class="no-underline hover:underline" href="{{ route('login') }}">{{ __('Login') }}</a>
                    @if (Route::has('register'))
                        <a class="no-underline hover:underline" href="{{ route('register') }}">{{ __('Register') }}</a>
                    @endif
                @else

                    @if(!str_contains(url()->current(), 'admin'))
                        <a href="/admin/dashboard" class="no-underline hover:underline"> Dashboard </a>
                    @endif

                    <span>{{ Auth::user()->name }}</span>

                    <a href="{{ route('logout') }}"
                       class="no-underline hover:underline"
                       onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">{{ __('Logout') }}</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
                        {{ csrf_field() }}
                    </form>
                @endguest
            </nav>
        </nav>
    </header>
    <main class="mx-auto lg:flex pt-12">
        <div class="flex-none justify-center bg-gray-800 content-center h-screen w-1/7 ">
            @include('dashboard._sidebar-navigation')
        </div>
        @yield('content')
    </main>
</div>
</body>
</html>
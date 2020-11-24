# Project-Cinema
Projekt stworzony na Zajęcia Zespołowe UG 2018

Zespół:
- Dawid Weltrowski-Knopik
- Filip Czyż
- Alicja Wolak
- Jagoda Ossowska


<h3>Opis:</h3> 
Kino Studyjne jest aplikacją internetową imitującą działanie strony kina jak i implementującej mechanizmy forum (komentarze, opinie, głosowanie) oraz użytkowników wraz z rolami. Dzięki technologii React aplikacja łączy w sobie płynność jak i szybkość co powinno umilić czas użytkowników podczas przeglądania strony.
Aplikacja oferuje również możliwość przeglądania wydarzeń, które odbędą się na terenie kina.
Oczywiście nie zapominamy o podstawowych funkcjach kin, czyli rezerwacji biletów. Może to być wykonane przez użytkownika zalogowanego jak i niezalogowanego dzięki systemowi, który tworzy konta tymczasowe dla każdego, kto próbuje zarezerwować bilet.

Dla pracowników stworzyliśmy Admin Panel używając Reacta z Electronem, który jest aplikacją desktopową i dzięki której pracownicy będą mogli z tej aplikacji zarządzać aplikacją webową naszego Kina Studyjnego. Wyszukiwanie, edytowanie i usuwanie, wszystkie te opcje zobaczymy w Admin Panelu.

<h3>Podział obowiązków:</h3>

Dawid Weltrowski-Knopik:
- szkielet i mechanizm strony głównej
- implemenacja JWT Token oraz JWT Refresh Token do logowania jak i rejestracji
- panel administratora
- szczegóły filmów, rating i komentarze
- system komentarzy z możliwością upvote / downvote przez użytkowników
- role użytkowników
- profil użytkownika
- repertuar

Filip Czyż:
- rezerwacja biletów
- system tworzenia tymczasowych użytkowników
- szczegóły filmu, rating i komentarze
- repertuar
- profil użytkownika

Alicja Wolak:
- repertuar
- stylizacja repertuaru
- struktura bazy danych
- profil użytkownika

Jagoda Ossowska:
- profil użytkownika
- wydarzenia
- stylizacja profilu użytkownika
- stylizacja panelu administratora
- stylizacja repertuaru
- stylizowanie

TODO:
- Poprawić stylizację
- Dodać responsywność
- Usprawnić WebApi
- Dokończyć Profil Użytkownika

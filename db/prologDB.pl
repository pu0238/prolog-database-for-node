% Pracownicy

pracownik(id_pracownika('42adde3b-8025-4d3c-866f-5f3d51c7f8d4'),stanowisko(magazynier),imie_pracownika(jan),nazwisko_pracownika(kowalski),wiek_pracownika(35)).
pracownik(id_pracownika('d6e597c9-6eb9-474b-9af2-75c4f12733b8'),stanowisko(magazynier),imie_pracownika(anna),nazwisko_pracownika(nowak),wiek_pracownika(29)).
pracownik(id_pracownika('7edb8be0-14c7-416f-83dd-c3f15b929040'),stanowisko(magazynier),imie_pracownika(piotr),nazwisko_pracownika(wojcik),wiek_pracownika(42)).
pracownik(id_pracownika('010b5b73-56a6-4dc3-9e14-04d2f58562cc'),stanowisko(magazynier),imie_pracownika(ewa),nazwisko_pracownika(krawczyk),wiek_pracownika(40)).
pracownik(id_pracownika('ded5c330-4699-4b97-b18b-89b2120a393f'),stanowisko(magazynier),imie_pracownika(tomasz),nazwisko_pracownika(zajac),wiek_pracownika(25)).

pracownik(id_pracownika('123e4567-e89b-12d3-a456-426614174000'),stanowisko(sprzedawca),imie_pracownika(maria),nazwisko_pracownika(nowakowski),wiek_pracownika(30)).
pracownik(id_pracownika('2cccc6d8-30d5-4216-b6e8-c147e061758e'),stanowisko(sprzedawca),imie_pracownika(maciej),nazwisko_pracownika(dabrowski),wiek_pracownika(28)).
pracownik(id_pracownika('25d3c05f-456d-4ce2-8ec4-2bc83eec92a1'),stanowisko(sprzedawca),imie_pracownika(krzysztof),nazwisko_pracownika(zielinski),wiek_pracownika(32)).
pracownik(id_pracownika('dc933e94-4923-4792-a7f0-66b516cea0b9'),stanowisko(sprzedawca),imie_pracownika(michal),nazwisko_pracownika(kaminski),wiek_pracownika(34)).
pracownik(id_pracownika('8552d9ed-95cb-4826-a4c8-5f4a2418d49d'),stanowisko(sprzedawca),imie_pracownika(krzysztof),nazwisko_pracownika(dudek),wiek_pracownika(36)).

% Ubrania

ubranie(id_ubrania('9e7c6dcd-65f1-473c-95d2-5daeeb4b2105'),nazwa_ubrania(koszula),rozmiar_ubrania(M),kolor_ubrania(bialy),stan_magazynowy(20),cena(60)).
ubranie(id_ubrania('485b09a1-c0ba-4613-babd-65110dbc877d'),nazwa_ubrania(spodnie),rozmiar_ubrania(L),kolor_ubrania(czarny),stan_magazynowy(13),cena(120)).
ubranie(id_ubrania('0ba05e10-d85a-4fc5-a08d-6647dcca339a'),nazwa_ubrania(sukienka),rozmiar_ubrania(S),kolor_ubrania(czerwony),stan_magazynowy(17),cena(250)).
ubranie(id_ubrania('f3f7dbb5-cb1e-4ca2-a377-7a7a788d1c13'),nazwa_ubrania(kurtka),rozmiar_ubrania(XL),kolor_ubrania(niebieski),stan_magazynowy(9),cena(180)).
ubranie(id_ubrania('1e3c03f8-7ebf-452e-9693-dbfb9da487ea'),nazwa_ubrania(bluza),rozmiar_ubrania(L),kolor_ubrania(bialy),stan_magazynowy(4),cena(90)).

% Zamowienia

zamowienie(id_zamowienia('621fa508-5601-4a72-9e33-c613e7d13e53'),id_ubrania(ubranie(id_ubrania('9e7c6dcd-65f1-473c-95d2-5daeeb4b2105'),_,_,_,_,_)),ilosc(2),id_magazyniera(pracownik(id_pracownika('42adde3b-8025-4d3c-866f-5f3d51c7f8d4'),_,_,_,_)),id_sprzedawcy(pracownik(id_pracownika('123e4567-e89b-12d3-a456-426614174000'),_,_,_,_))).
zamowienie(id_zamowienia('043c9e31-bdd0-4fc3-b5e9-8a52a8863a67'),id_ubrania(ubranie(id_ubrania('485b09a1-c0ba-4613-babd-65110dbc877d'),_,_,_,_,_)),ilosc(4),id_magazyniera(pracownik(id_pracownika('d6e597c9-6eb9-474b-9af2-75c4f12733b8'),_,_,_,_)),id_sprzedawcy(pracownik(id_pracownika('2cccc6d8-30d5-4216-b6e8-c147e061758e'),_,_,_,_))).
zamowienie(id_zamowienia('fac23e09-ac3c-4214-8d12-90f70ceeebc5'),id_ubrania(ubranie(id_ubrania('0ba05e10-d85a-4fc5-a08d-6647dcca339a'),_,_,_,_,_)),ilosc(1),id_magazyniera(pracownik(id_pracownika('7edb8be0-14c7-416f-83dd-c3f15b929040'),_,_,_,_)),id_sprzedawcy(pracownik(id_pracownika('25d3c05f-456d-4ce2-8ec4-2bc83eec92a1'),_,_,_,_))).
zamowienie(id_zamowienia('8ab4e13b-7c37-4b3c-97a3-28fb2b8deff7'),id_ubrania(ubranie(id_ubrania('f3f7dbb5-cb1e-4ca2-a377-7a7a788d1c13'),_,_,_,_,_)),ilosc(2),id_magazyniera(pracownik(id_pracownika('010b5b73-56a6-4dc3-9e14-04d2f58562cc'),_,_,_,_)),id_sprzedawcy(pracownik(id_pracownika('dc933e94-4923-4792-a7f0-66b516cea0b9'),_,_,_,_))).
zamowienie(id_zamowienia('54299b5b-7f2b-4a5a-8db1-26375d7ff4ec'),id_ubrania(ubranie(id_ubrania('1e3c03f8-7ebf-452e-9693-dbfb9da487ea'),_,_,_,_,_)),ilosc(1),id_magazyniera(pracownik(id_pracownika('ded5c330-4699-4b97-b18b-89b2120a393f'),_,_,_,_)),id_sprzedawcy(pracownik(id_pracownika('8552d9ed-95cb-4826-a4c8-5f4a2418d49d'),_,_,_,_))).

% Dodanedane przez serwis

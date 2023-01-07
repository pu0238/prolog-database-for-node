% Pracownicy

magazynier(id_pracownika(5), imie_pracownika(jan), nazwisko_pracownika(kowalski), wiek_pracownika(35)).
magazynier(id_pracownika(2), imie_pracownika(anna), nazwisko_pracownika(nowak), wiek_pracownika(29)).
magazynier(id_pracownika(8), imie_pracownika(piotr), nazwisko_pracownika(wojcik), wiek_pracownika(42)).
magazynier(id_pracownika(12), imie_pracownika(ewa), nazwisko_pracownika(krawczyk), wiek_pracownika(40)).
magazynier(id_pracownika(1), imie_pracownika(tomasz), nazwisko_pracownika(zajac), wiek_pracownika(25)).

% Ubrania

ubranie(id_ubrania(1), nazwa_ubrania(koszula), rozmiar_ubrania(M), kolor_ubrania(bialy), stan_magazynowy(20), cena(60)).
ubranie(id_ubrania(2), nazwa_ubrania(spodnie), rozmiar_ubrania(L), kolor_ubrania(czarny), stan_magazynowy(13), cena(120)).
ubranie(id_ubrania(3), nazwa_ubrania(sukienka), rozmiar_ubrania(S), kolor_ubrania(czerwony), stan_magazynowy(17), cena(250)).
ubranie(id_ubrania(4), nazwa_ubrania(kurtka), rozmiar_ubrania(XL), kolor_ubrania(niebieski), stan_magazynowy(9), cena(180)).
ubranie(id_ubrania(5), nazwa_ubrania(bluza), rozmiar_ubrania(L), kolor_ubrania(bialy), stan_magazynowy(4), cena(90)).

% Zamowienia

zamowienie(id_zamowienia(1), id_ubrania(ubranie(1, _, _, _, _, _)), ilosc(2), id_pracownika(2)).
zamowienie(id_zamowienia(2), id_ubrania(ubranie(2, _, _, _, _, _)), ilosc(4), id_pracownika(5)).
zamowienie(id_zamowienia(3), id_ubrania(ubranie(3, _, _, _, _, _)), ilosc(1), id_pracownika(12)).
zamowienie(id_zamowienia(4), id_ubrania(ubranie(4, _, _, _, _, _)), ilosc(2), id_pracownika(8)).
zamowienie(id_zamowienia(5), id_ubrania(ubranie(5, _, _, _, _, _)), ilosc(1), id_pracownika(2)).

% Zapytanie o wyśwetlenie wszystkich pracowników magazynu

?- magazynier(id_pracownika(X), imie_pracownika(Y), nazwisko_pracownika(Z), wiek_pracownika(W)).

% Zapytanie o wyśwetlenie wszystkich ubrań

?- ubranie(id_ubrania(X), nazwa_ubrania(Y), rozmiar_ubrania(Z), kolor_ubrania(W), stan_magazynowy(V), cena(C)).

% Zapytanie o wyśwetlenie wszystkich zamówień

?- zamowienie(id_zamowienia(X), id_ubrania(ubranie(Y, _, _, _, _, _)), ilosc(Z), id_pracownika(W)).

% Zapytanie o wyśwetlenie wszystkich ubrań o kolorze 'XXX'

?- ubranie(id_ubrania(X), nazwa_ubrania(Y), rozmiar_ubrania(Z), kolor_ubrania(XXX), stan_magazynowy(W), cena(V)).

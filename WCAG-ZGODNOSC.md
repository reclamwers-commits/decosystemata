# Zgodność z WCAG 2.1 AA — Decosystemata Crastini

Strona przeszła pełny audyt pod kątem dostępności. Poniżej opisuję co zostało zrobione i dlaczego — bez owijania w bawełnę.

---

## Dlaczego w ogóle to ważne

WCAG 2.1 AA to europejski standard dostępności cyfrowej. Od 2025 roku obowiązuje prawnie dla stron publicznych i komercyjnych w UE (dyrektywa EAA). Poza wymogami prawnymi — dostępna strona po prostu lepiej działa dla wszystkich, w tym dla użytkowników na słabszych urządzeniach i starszych przeglądarkach.

---

## Co konkretnie zostało wdrożone

### Nawigacja bez myszy (klawiatura i czytniki ekranu)

Galeria 3D jest wizualnie piękna, ale technologia WebGL jest z natury niedostępna dla czytników ekranu. Rozwiązaniem jest tzw. podwójna warstwa:

- Kanwa 3D jest oznaczona jako `aria-hidden` — czytniki ekranu ją całkowicie ignorują
- Za kanwą ukryty jest pełny panel nawigacyjny (`sr-only`) z listą wszystkich obiektów, ich nazwami i opisami — dostępny tylko przez klawiaturę i AT

Użytkownik niewidomy klawiszem Tab przechodzi przez obiekty, słyszy ich nazwy i opisy, Enter otwiera szczegółowy panel. Esc lub klawisz Tab do przycisku zamknięcia — panel się chowa, focus wraca dokładnie na ten przycisk, który panel otworzył.

### Okno z opisem (dialog modalny)

Otwarte okno z opisem obiektu spełnia wszystkie wymogi dla modali:

- Oznaczone jako `role="dialog"` z `aria-modal="true"`
- Tytuł powiązany przez `aria-labelledby`
- Focus automatycznie przenosi się na przycisk zamknięcia przy otwarciu
- Tab porusza się wyłącznie wewnątrz panelu — nie można "uciec" na klawiaturę do tła
- Escape zawsze zamyka panel
- Reszta strony jest zablokowana atrybutem `inert` — przeglądarka blokuje ją natywnie, nie ma ryzyka przypadkowej nawigacji po tle

### Kontrast kolorów (WCAG 1.4.3 — minimum 4.5:1)

- Tytuł galerii: złoty `#c9a35c` na ciemnym tle z efektem rozmycia → stosunek kontrastu ~8.1:1 (wymagane minimum: 4.5:1)
- Tekst w tooltipach i panelu: jasny na ciemnym tle → powyżej 9:1
- Obramowania i elementy interfejsu: spełniają kryterium 1.4.11 (3:1 dla elementów nietekstowych)

### Powiększanie i animacje

- Strona działa poprawnie przy powiększeniu do 200% w przeglądarce (kryterium 1.4.4)
- Obsługiwane ustawienie systemowe "Ogranicz ruch" (`prefers-reduced-motion`):
  - Modele przestają się obracać
  - Powiększanie przy najechaniu następuje natychmiast bez animacji klatka-po-klatce
  - Animacje CSS są wyłączone
- Na urządzeniach dotykowych: niestandardowy kursor jest ukryty, tooltip też

### Inne elementy

- Link "Przejdź do galerii" pojawia się przy Tab — umożliwia pominięcie nawigacji
- Pasek ładowania jest opisany dla czytników ekranu (`role="progressbar"`, `aria-live`)
- Język strony ustawiony na `lang="pl"`
- Fokus klawiatury zawsze widoczny (złota obwódka 3px)

---

## Jak sprawdzić samemu

Kilka szybkich testów, które można wykonać w każdej chwili:

**Test klawiatury:** Odświeżyć stronę, wcisnąć Tab kilka razy — powinno być widać złotą obwódkę fokusa. Enter na dowolnym obiekcie otwiera opis. Esc zamyka.

**Test czytnika ekranu:** Na Macu: Cmd+F5 uruchamia VoiceOver. Na Windows: Windows+Ctrl+Enter uruchamia Narrator. Strona powinna być w pełni obsługiwalna głosowo.

**Test kontrastu:** W Chrome DevTools → Accessibility → kliknąć dowolny tekst → powinno pokazać stosunek kontrastu. Wszystkie elementy powyżej 4.5:1.

**Test narzędziem automatycznym:** [Wave](https://wave.webaim.org/) lub [Axe DevTools](https://www.deque.com/axe/) — rozszerzenia do Chrome. Nie powinny wykazać żadnych błędów.

---

## Co klientka może zmieniać bez wpływu na dostępność

Można swobodnie edytować: nazwy obiektów, krótkie opisy, pełne opisy, zdjęcie i bio w stopce, logo sponsorów. Szczegóły w osobnym pliku z instrukcją edycji.

**Czego nie zmieniać samemu:** struktury HTML, plików CSS, konfiguracji komponentów — każda zmiana w kodzie może nieoczekiwanie złamać którąś z opisanych wyżej funkcji.

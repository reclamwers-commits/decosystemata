# Instrukcja edycji — Decosystemata Crastini

Wszystko co można zmienić samodzielnie jest opisane poniżej. Nie trzeba znać się na programowaniu. Po każdej zmianie strona musi być przebudowana i wgrana na serwer (opisane na końcu).

---

## ✅ Co można zmieniać bezpiecznie

### 1. Opisy obiektów 3D

**Plik:** `src/data/objects.js`

Każdy obiekt wygląda tak:

```js
{
  id: 'grzyby',                           // nie zmieniaj
  file: '/models/grzyby-opt.glb',         // nie zmieniaj
  name: 'Grzyby Leśne',                   // ← MOŻNA zmieniać
  shortDesc: 'Kompozycja grzybów leśnych', // ← MOŻNA zmieniać
  description: 'Piękna kompozycja...',    // ← MOŻNA zmieniać
  position: [2.31, 0.46, -0.4],           // nie zmieniaj
  scale: 1.5,                             // nie zmieniaj
  rotation: [0, 0.2, 0],                  // nie zmieniaj
  rotationSpeed: 0.22,                    // nie zmieniaj
},
```

Zmieniaj tylko: `name`, `shortDesc`, `description`. Reszta to ustawienia techniczne.

**Zasady:**
- Tekst w cudzysłowach: `'Twój opis'`
- Jeśli w tekście jest apostrof (np. d'Alemberta) — użyj podwójnych cudzysłowów: `"d'Alemberta"`
- Nie usuwaj przecinków po `}` na końcu każdego obiektu
- `description` może mieć wiele akapitów — oddziel je pustą linią w środku tekstu

---

### 2. Stopka — bio i zdjęcie

**Plik:** `src/components/Footer.jsx`

Zmień tylko te linijki (szukaj po klasach CSS):

| Co zmienić | Klasa CSS | Co wpisać |
|---|---|---|
| Imię/nazwisko | `footer-name` | Twoje imię i nazwisko |
| Bio | `footer-bio` | Opis siebie, kilka zdań |
| Zdjęcie | zastąp plik | wgraj `portrait.jpg` do `public/images/` |

Zdjęcie: proporcje ~3:4 (portret), min. 400×500 px.

---

### 3. Napis o finansowaniu

**Plik:** `src/components/Footer.jsx`

Znajdź linijkę:
```html
<p className="footer-funding-text">Projekt sfinansowany ze środków programu Krajowy Plan Odbudowy</p>
```
Zmień tekst między tagami `<p ...>` a `</p>` na właściwy. Nie zmieniaj `className`.

---

### 4. Loga finansowania

Zastąp plik `public/images/photo.jpg` swoim plikiem z logami. Plik **musi się nazywać dokładnie tak samo** (`photo.jpg`). Format: JPG lub PNG, tło najlepiej przezroczyste (PNG).

---

### 5. Tytuł w zakładce przeglądarki

**Plik:** `index.html`

```html
<title>Decosystemata Crastini</title>
```
Zmień tekst między tagami.

---

## ⚠️ Zasady WCAG — czego nie psuć

Strona ma certyfikat dostępności WCAG 2.1 AA (32/32 kryteriów). Żeby go zachować:

### Obrazy muszą mieć alt

Każdy tag `<img>` musi mieć atrybut `alt` z opisem:
```html
<!-- DOBRZE: -->
<img src="/images/portrait.jpg" alt="Portret Agaty Konarskiej" />

<!-- ŹLE — brak alt: -->
<img src="/images/portrait.jpg" />

<!-- ŹLE — pusty alt dla dekoracyjnego obrazka jest OK, ale nie dla treści: -->
<img src="/images/portrait.jpg" alt="" />
```

### Nie usuwaj atrybutów aria-*

W kodzie są atrybuty `aria-label`, `aria-hidden`, `aria-modal`, `role` itp. Są wymagane dla czytników ekranu. **Nie usuwaj ich i nie zmieniaj ich wartości.**

### Nie zmieniaj kolorów CSS

Kolory w pliku `global.css` są dobrane tak, żeby spełniać kontrast 4.5:1 wymagany przez WCAG. Zmiana kolorów może złamać dostępność.

### Tekst musi być widoczny

Nie ustawiaj `display: none`, `visibility: hidden` ani `opacity: 0` na elementach zawierających treść.

---

## 🚫 Czego nie ruszać nigdy

- `src/components/Gallery/` — cała logika 3D
- `vite.config.js` — konfiguracja budowania
- `public/draco/` — dekoder modeli 3D (bez niego nic się nie załaduje)
- `vercel.json` — routing domeny
- Atrybuty `aria-*`, `role=`, `inert` w kodzie JSX

---

## Podmiana modeli 3D

1. Model musi być w formacie **GLB** (nie OBJ, nie FBX)
2. Skompresowany przez Draco — inaczej będzie za wolno
3. Wgraj do `public/models/`
4. W `objects.js` zmień `file: '/models/nowy-plik.glb'`

Jeśli model ładuje się wolno (>3 sekundy) — zgłoś, skompresujemy.

---

## Po każdej zmianie — jak wgrać na serwer

Strona jest hostowana na Vercel pod adresem `konarskaagata.pl/decosystemata`.

W terminalu w folderze projektu:
```
npm run build
npx vercel --prod --yes
```

Strona aktualizuje się w ciągu ~30 sekund.

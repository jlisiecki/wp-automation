# Automatyzacja WP

Przykładowa autmatyzacja pozwala na zmianę "slugów" adresów URL oraz title i description w Yoascie. Oczywiście nic nie stoi na przeszkodzie żeby rozszerzać ją o następne funkcjonalności, bardzo prosto można namierzyć kolejne inputy, które odpowiadają za dane rzeczy w panelu. Generalnie ta automatzacja powinna zadziałać niezależnie od rodzaju obiektu wp_post czyli na stronach, postach itp. oraz na wszystkich taksonomiach typu kategorie itp.

1. Sugeruję zainstalować yarn komendą `npm i -g yarn`
2. Zainstalować zależności wpisując komendę `yarn` będąc w głównym katalogu projektu
3. Należy utworzyć plik .env zawierający dane logowania do WordPressa na podstawie przykładowego pliku example.env
4. W pliku src/data.ts należy umieścić tablicę zawierającą obiekty zgodnie z interfaces/WPPostData.ts
5. Uruchomić rozwiązanie z użyciem komendy `yarn dev` będąc w głównym katalogu projektu
